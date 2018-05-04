<template>
  <div id="cardsmanage">
    <mt-header title="结算卡">
      <mt-button icon="back" slot="left" @click.native="$router.push({name: 'mine'})"></mt-button>
      <mt-button icon="add" @click="addcard" slot="right" v-if="addcd">添加银行卡</mt-button>
    </mt-header>
    <div v-if="cards">
      <div @click="carddetail(item)" v-for="item in cards" :class='["bankItem-"+item.bankTypeId, "cardslist"]'>
        <div class="card">
          <img :src="item.bankType.ico" alt="">
          <p>{{item.bankType.name}}</p>
        </div>
        <p class="cardnum"><span><img src="../../../assets/icon/dotdotdot@3x.png" alt=""></span><span><img src="../../../assets/icon/dotdotdot@3x.png" alt=""></span><span><img src="../../../assets/icon/dotdotdot@3x.png" alt=""></span> <span>{{item.bankCode.slice(-4)}}</span></p>
      </div>
    </div>
    <div class="none" v-if="addcd">
      <img src="../../../assets/images/cards@3x.png" alt="" class="img-responsive card-logo">
      <p>您还没有添加银行卡</p>
      <mt-button @click="addcard">添加银行卡</mt-button>
    </div>
    <mt-popup
      v-if="false"
      class="mint-popup-1"
      v-model="bankListPopupVisible"
      position="right"
      :modal="false"
      popup-transition="popup-fade">
      <mt-header fixed title="提现">
        <mt-button icon="back" slot="left" @click.native="bankListPopupVisible = false"></mt-button>
        <router-link to="" slot="right">
          <mt-button icon="add">+</mt-button>
        </router-link>
      </mt-header>
      <div style="margin-top: .8rem">
        <mt-field label="持卡人姓名" placeholder="请输入开户人姓名" v-model="username"></mt-field>
        <mt-field label="银行卡卡号" placeholder="请输入开户人卡号" type="number" v-model="cardnum"></mt-field>
        <mt-checklist
          :max="1"
          v-model="checkedcard"
          :options="options">
        </mt-checklist>
      </div>
    </mt-popup>

  </div>
</template>

<script>
export default {
  name: 'cardsmanage',
  data () {
    return {
      cards: [],
      bankListPopupVisible: true,
      cardnum: '',
      username: '',
      addcd: false,
      options: [
        {
          label: '被禁用',
          value: '值F'
        },
        {
          label: '选中禁用',
          value: '选中禁用的值'
        },
        {
          label: '选项A',
          value: '值A'
        },
        {
          label: '选项B',
          value: '值B'
        }
      ],
      checkedcard: []
    }
  },
  mounted () {
    this.getCards()
  },
  created () {

  },
  methods: {
    getCards () {
      this.$http.get('/store/v1/bank-cards').then(res => {
        this.cards = res.data
        if (this.cards.length < 1) {
          this.addcd = true
        }
        console.log(res.data)
      }
    )
    },
    carddetail (item) {
      this.$router.push({name: 'carddetails', params: {item: item}})
    },
    addcard () {
      this.$http.get('/store/v1/ext-passwords').then(
        res => {
          console.log(res.data)
          if (res.data.code === 0) {
            this.$toast(res.data.message)
            setTimeout(res => {
              this.$router.push({name: 'verification'})
            }, 600)
          } else if (res.data.code === 1) {
            this.$router.push({name: 'auth'})
          }
        }
      )
    }
  }
}
</script>

<style lang="stylus">
  #cardsmanage{
    background: #f7faff
    min-height:100vh
    .mint-popup-1{
      width:100%;
      height:calc(100vh)
    }
    .none{
      text-align center
      .card-logo{
        width: 2.65rem
        margin-left auto
        margin-right auto
      }
      padding-top 2.2rem
      p{
        color: #a0a3b2
        text-align center
        margin-top .4rem
        margin-bottom 3.1rem
      }
      .mint-button--normal{
        width:6.94rem
        box-shadow none
        height:.8rem
        background: #33a1ff
        color: #fff
      }
    }
    .cardslist{
      width: 6.9rem;
      height: 2rem;
      margin-left auto
      margin-right auto
      padding-top .3rem
      padding-left .25rem
      font-size .28rem
      border 1px solid #cccccc
      margin-top: .3rem
      margin-bottom .2rem
      border-radius .1rem
      color: #ffffff
      .card{
        display flex
        align-items center
        margin-bottom .3rem
        img{
          display: block
          width: .65rem;
          height: .65rem;
          margin-right .2rem
        }
        p{
          width:80%;
        }
      }
      .cardnum{
        padding-right: .3rem
        display: flex
        justify-content space-between
        align-items center
        span{
          display block
          img{
            width 1rem
          }
        }
      }
    }

    .bankItem-1{
      background-color: #e35364
    }
    .bankItem-2 {
      background-color: #078f74
      box-shadow: 0px 3px 10px 0px rgba(22, 24, 41, 0.3);
    }
    .bankItem-3 {
      background-color: #ab2537
    }
    .bankItem-4 {
      background-color: #21428a
    }
    .bankItem-5 {
      background-color: #2d3080
    }
    .bankItem-6 {
      background-color: #c72c33
    }
    .bankItem-7 {
      background-color: #39868d
    }
    .bankItem-8 {
      background-color: #be242f
    }
    .bankItem-9 {
      background-color: #ecba07
    }
    .bankItem-10 {
      background-color: #004685
    }

    .bankItem-11 {
      background-color: #2d3080
    }

    .bankItem-12 {
      background-color: #bd0016
    }

    .bankItem-13 {
      background-color: #e76d10
    }

    .bankItem-14 {
      background-color: #293c8f
    }

    .bankItem-15 {
      background-color: #e3131b
    }

    .bankItem-16 {
      background-color: #e40012
    }

    .bankItem-17 {
      background-color: #2d3080
    }
  }
</style>
