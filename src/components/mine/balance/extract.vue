<template>
  <div id="extract" v-if="display">
    <mt-header title="提现">
      <mt-button icon="back" @click.native="$router.push({name: 'balance'})" slot="left"></mt-button>
      <router-link to="" slot="right">
        <mt-button ></mt-button>
      </router-link>
    </mt-header>
    <div class="extract-content">
      <div class="card" @click="goCardDetail">
        <img alt="" :src="bankcard.bankType.ico">
        <div class="card-info">
          <p>{{bankcard.bankType.name}}</p>
          <p>尾号{{bankcard.bankCode.slice(-4)}}储蓄卡</p>
        </div>
        <i class="mint-cell-allow-right"></i>

      </div>
      <div class="input">
        <p class="input-title">提现金额</p>
        <div class="inputarea">
          <span>￥</span><mt-field type="text" v-model="amount"></mt-field>
        </div>
      </div>
      <div class="extract-tip">
        <p>可用余额{{finance.liquidated}}元</p>
        <span style="color: #33a1ff;" @click="amount = finance.liquidated">全部提现</span>
      </div>
      <mt-button @click="nextStep">下一步</mt-button>
    </div>
    <mt-popup position="bottom" class="popup" v-model="vis">
      <p class="popup-title"><a @click="closetc()">x</a>输入密码</p>
      <p>支付金额{{amount}}元</p>
      <p>单笔收取2元通道费</p>
      <p class="write-input">
        <input type="password"  maxlength="6" class="realInput" v-model="realInput" autofocus>
      </p>
      <p class="forget"><span @click="$router.push({name: 'fgpwd'})">忘记密码</span></p>
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: 'extract',
  data () {
    return {
      display: false,
      vis: false,
      realInput: '',
      bankcard: {},
      finance: {}, // 财务信息
      amount: ''
    }
  },
  watch: {
    realInput (n, o) {
      if (n.length === 6) {
        this.goPass()
      }
    }
  },
  created () {
    // 获取银行卡
    this.$http.get('/store/v1/bank-cards').then(
      res => {
        if (res.data.length === 0) {
          this.$toast('您还未绑定银行卡，稍后跳转至绑定银行卡页面')
          setTimeout(
            () => {
              this.$router.push({name: 'cardsmanage'})
            }, 1000
          )
        } else {
          this.display = true
          this.bankcard = res.data[0]
        }
      }
    )
    // 获取账户余额
    this.$http.get('/store/v1/finances').then(
      res => {
        this.finance = res.data
      }
    )
  },
  methods: {
    closetc () {
      this.vis = false
    },
    goCardDetail () {
      this.$router.push({name: 'carddetails', params: {item: this.bankcard}})
    },
    nextStep () {
      if (!(this.amount > 0 && this.amount <= this.finance.liquidated)) {
        this.vis = true
      } else {
        this.$toast('请输入正确金额')
      }
    },
    goPass () {
      this.$http.post('/store/v1/extracts', {
        bankCardId: this.bankcard.id,
        amount: this.amount,
        extPassword: this.realInput
      }).then(
        res => {
          console.log(res)
          this.$router.push({name: 'extractquery', params: {item: res.data}})
        }
      ).catch(
        erro => console.log(erro.response.data.message)
      )
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.vis) {
      if (to.name === 'extractquery') {
        next()
      } else {
        this.vis = false
        next(false)
      }
    } else {
      next()
    }
  }
}
</script>

<style lang="stylus">
  .mint-toast{
    z-index:9999
  }
  #extract{
    background: #f7faff
    .mint-header{
      height: .88rem
      .mint-header-title{
        font-size .32rem
      }
      .mint-button-text{
        font-size .24rem
      }
    }

    .extract-content{
      padding .3rem 0 0
      .card{
        display flex
        align-items center
        position: relative
        padding .3rem
        background: #fff
        margin-bottom .3rem
        img{
          width: .65rem
          height: .65rem
          display: block
        }
        .card-info{
          margin-left .3rem
          p:first-child{
            color: #333333
            font-size .3rem
            margin-bottom .18rem
          }
          p:last-child{
            color: #a0a3b2
            font-size .28rem
          }
        }
      }
      .input{
        padding: .3rem
        background: #ffffff
        .input-title{
          color: #a0a3b2
          font-size .26rem
        }
        .inputarea{
          padding: .3rem 0
          color: #000
          display: flex
          align-items center
          border-bottom 1px solid #eff1f7
          span{
            display block
            font-size .6rem
          }
          .mint-field{
            background-image none
            .mint-cell-wrapper{
              background-image none
            }
          }
          input{
            display: block
            font-size .72rem
            font-weight 600
          }
        }
      }
      .extract-tip{
        background: #ffffff
        padding: 0 .3rem .3rem
        margin-bottom 1.85rem
        display flex
        justify-content space-between
        p{
          color: #c1c4d5
          font-size .24rem
        }
        a{
          display block
          color: #33a1ff
          font-size .24rem
        }
      }
      .mint-button--normal{
        width: 6.94rem
        background: #33a1ff
        color: #ffffff
        display: block
        margin-left auto
        margin-right auto
      }
    }
    .popup{
      width: 100%
      height:5.3rem
      background #f8f8f8
      .popup-title{
        height 1.1rem
        line-height 1.1rem
        font-size .36rem
        position: relative
        text-align center
        border-bottom 1px solid #e5e5e5
        color: #000
        a{
          display block
          font-size .5rem
          color: #787878
          position: absolute
          left .4rem
          top -.1rem
        }
      }
      p:nth-child(2){
        font-size .26rem
        text-align center
        margin:.3rem 0
      }
      p:nth-child(3){
        font-size .24rem
        color: #ea9506
        text-align center
        margin-bottom .55rem
      }
      .realInput{
        -webkit-appearance: none;
        resize: none;
        outline: none;
        border: 0;
        width: 5.51rem;
        height: .9rem;
        line-height .9rem
        background: none;
        display: block;
        margin-left auto
        margin-right auto
        text-align: center;
        border-bottom: 1px solid #33a1ff;
        font-size .6rem
      }
    }
    .forget{
      display: flex
      justify-content flex-end
      span{
        display: block
        color: #33a1ff
        font-size:.22rem
        margin-right:1rem
        margin-top:.5rem
      }
    }
  }

</style>
