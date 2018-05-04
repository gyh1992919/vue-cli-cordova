<template>
  <div id="pending">
    <mt-header title="满50可用">
      <mt-button icon="back"  slot="left" @click="fixback"></mt-button>
      <mt-button v-if="!(wallet.status === 3)" slot="right" @click.native="popupVisible = !popupVisible">●●●</mt-button>
      <mt-button v-if="wallet.status === 3" slot="right" @click.native="deleteit">删除</mt-button>
    </mt-header>
    <div class="state">
      <p v-if="wallet.status === 2"> <span>到期时间{{wallet.activityEndAt}}</span> <span>剩余数量/{{wallet.remainingQty}}个</span> </p>
      <p v-if="wallet.status === 1"> <span>即将在{{wallet.activityEndAt}}自动发布</span> </p>
      <p v-if="wallet.status === 3" > <span style="color: #000000">{{wallet.activityEndAt}}(已结束)</span> <span style="color: #a0a3b2">剩余数量/{{wallet.remainingQty}}个</span> </p>
    </div>
    <div class="details">
      <div class="list">
        <div class="left">
          <p>红包区间</p>
        </div>
        <div class="right">
          <p>¥{{parseInt(wallet.minValue).toFixed(2)}}-¥{{parseInt(wallet.maxValue).toFixed(2)}}</p>
        </div>
      </div>
      <div class="list">
        <div class="left">
          <p>红包数量</p>
        </div>
        <div class="right">
          <p>{{wallet.number}}个</p>
        </div>
      </div>
      <div class="list">
        <div class="left">
          <p>活动截止</p>
        </div>
        <div class="right">
          <p>至{{wallet.activityEndAt}}</p>
        </div>
      </div>
      <div class="list">
        <div class="left">
          <p>有效时间</p>
        </div>
        <div class="right">
          <p>至{{wallet.effectiveEndAt}}</p>
        </div>
      </div>
      <div class="list avatar" v-if="userWallet.length" @click="goaway">
        <div class="left">
          <p>领取记录</p>
        </div>
        <div class="right">
          <p v-for="(item, index) in userWallet">
            <img :src="item.userAvatar" alt="" v-if="index < 6">
          </p>
        </div>
      </div>
      <div class="list">
        <div class="left">
          <p>每人限领</p>
        </div>
        <div class="right">
          <p>{{wallet.limitNum}}张</p>
        </div>
      </div>
      <div class="list">
        <div class="left">
          <p>活动滚动图</p>
        </div>
        <div class="right">
          <p><img :src="wallet.walletImg" style="width: 1.05rem;height:.8rem;" alt=""></p>
        </div>
      </div>
      <div class="list">
        <div class="left" style="display: block">
          <p>活动描述</p>
          <p style="color: #000;margin-top: .15rem">{{wallet.title}}</p>
        </div>
        <div class="right">
        </div>
      </div>
      <div class="list">
        <div class="left" style="display: block">
          <p>消费须知</p>
          <p style="color: #000;margin-top: .15rem">{{wallet.describe}}</p>
        </div>
        <div class="right">
        </div>
      </div>
    </div>
<div>    <mt-button class="next" v-if="wallet.status ===3" @click="again">再次发布</mt-button>
</div>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <div v-if="this.wallet.status ===1" class="popup-menu" @click="revise">修改福袋</div>
      <div v-if="this.wallet.status ===1" class="popup-menu" @click="deleteit">删除福袋</div>
      <div v-if="this.wallet.status ===2" class="popup-menu" @click="terminate">终止福袋</div>
      <div v-if="this.wallet.status ===2" class="popup-menu" @click="shared">分享福袋</div>
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: 'holdlist',
  data () {
    return {
      popupVisible: false,
      wallet: {},
      routerflag: true,
      userWallet: []
    }
  },
  created () {
  },
  mounted () {
    this.wallet = this.$store.state.Wallet
    console.log(this.wallet)
    this.$http.get(`/store/v1/wallets/${this.wallet.id}`).then(
      res => { this.userWallet = res.data.userWallet }
    )
  },
  methods: {
    revise () {
      this.popupVisible = false
      this.routerflag = false
      this.$router.push({name: 'addfd', params: {change: true}})
    },
    deleteit () {
      this.popupVisible = false
      this.routerflag = false
      this.$http.put(`/store/v1/wallets/${this.wallet.id}/delete`).then(
        res => {
          this.$router.push({name: 'fudailist'})
        }
      ).catch(
        erro => {
          this.$toast(erro.response.data.message)
        }
      )
    },
    terminate () {
      this.popupVisible = false
      this.routerflag = false
      this.$http.put(`/store/v1/wallets/${this.wallet.id}/stop`).then(
        res => {
          this.$router.push({name: 'fudailist'})
        }
      ).catch(
        erro => {
          this.$toast(erro.response.data.message)
        }
      )
    },
    again () {
      this.routerflag = false
      this.$router.push({name: 'fudaiagain', params: {id: this.wallet.id}})
    },
    shared () {},
    fixback () {
      this.routerflag = false
      this.$back()
    },
    goaway () {
      this.routerflag = false
      this.$router.push({name: 'drawrecord', params: {id: this.wallet.id}})
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.popupVisible && this.routerflag) {
      next(false)
      this.popupVisible = false
      console.log('导航被阻止了')
    } else if (this.routerflag) {
      next(false)
      console.log('导航被阻止了')
    } else {
      next()
    }
  }
}
</script>

<style lang="stylus">
  #pending{
    background #f7faff
    padding-bottom 2.15rem
    .mint-header{
      height: .88rem
      .mint-header-title{
        font-size .32rem
      }
      .mint-button-text{
        label{
          font-size 14px
        }
      }
    }
    .state{
      color: #33a1ff
      font-size .22rem
      line-height:.9rem
      padding-left .3rem
      padding-right: .3rem
      p{
        display: flex
        justify-content space-between
        span{
          display: block
        }
      }
    }
    .details{
      background: #fff
      padding 0 .3rem
      .list{
        display: flex
        padding: .3rem 0
        justify-content space-between
        border-bottom: 1px solid #eff1f7
        .left{
          font-size .26rem
          color: #a0a3b2
          display: flex
          p{
            align-self center
            line-height .36rem
          }
        }
        .right{
          font-size .26rem
          color: #000000
        }
      }
      .list:last-child{
        border-bottom none
        padding-bottom .65rem
      }
      .list.avatar{
        .right{
          display: flex
          img{
            width: .5rem
            height: .5rem
            margin-left .1rem
            display block
          }
        }
      }
    }
    .mint-popup-bottom{
      width: 100%
      background transparent
      .popup-menu{
        line-height 1rem
        text-align center
        background #ffffff
      }
      .popup-menu:first-child{
        border-top-left-radius:.15rem;
        border-top-right-radius:.15rem;
        border-bottom 1px solid #e2e4e9
      }
    }
    .next{
      width: 94%
      background: #33a1ff
      display: block
      margin-left auto
      margin-right auto
      color: #ffffff
      border-radius 0
      font-size .32rem
      height:.8rem
      line-height .8rem
    }
  }

</style>
