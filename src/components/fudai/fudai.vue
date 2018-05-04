<template>
  <div id="fudai">
    <mt-header title="添加福袋">
      <mt-button icon="back" slot="left" @click.native = $back></mt-button>
      <mt-button slot="right"></mt-button>
    </mt-header>
    <div class="wallet-preview">
      <div class="empty"></div>
      <div class="wallet_preview_box">
        <div class="wallet_preview_header">
          <div class="item">
            <div class="label">活动描述</div>
            <div class="value">{{wallet.title}}</div>
          </div>
          <div class="item">
            <div class="label">消费须知</div>
            <div class="value">{{wallet.describe}}</div>
          </div>
          <div class="item">
            <div class="label">活动滚动图</div>
            <div class="value"><img style="width: 1.05rem;height: .8rem;" :src= "wallet.modelSrc" alt=""></div>
          </div>
        </div>
        <div class="driver"></div>
        <div class="wallet_preview_body">
          <div class="wallet_body_item">
            <div class="wallet_item_name">
              <p>红包区间</p>
            </div>
            <div class="wallet_item_value">
              <p>¥{{parseInt(wallet.minValue).toFixed(2)}}-¥{{parseInt(wallet.maxValue).toFixed(2)}}</p>
            </div>
          </div>
          <div class="wallet_body_item">
            <div class="wallet_item_name">
              <p>红包数量</p>
            </div>
            <div class="wallet_item_value">
              <p>{{wallet.number}}个</p>
            </div>
          </div>
          <div class="wallet_body_item">
            <div class="wallet_item_name">
              <p>活动截止</p>
            </div>
            <div class="wallet_item_value">
              <p>至{{wallet.activityEndAt}}</p>
            </div>
          </div>
          <div class="wallet_body_item">
            <div class="wallet_item_name">
              <p>有效时间</p>
            </div>
            <div class="wallet_item_value">
              <p>至{{wallet.effectiveEndAt}}</p>
            </div>
          </div>
          <div class="wallet_body_item">
            <div class="wallet_item_name">
              <p>使用门槛</p>
            </div>
            <div class="wallet_item_value">
              <p>满{{wallet.attainAmount}}可用</p>
            </div>
          </div>
          <div class="wallet_body_item">
            <div class="wallet_item_name">
              <p>每人限领</p>
            </div>
            <div class="wallet_item_value">
              <p>{{wallet.limitNum}}张</p>
            </div>
          </div>
        </div>
      </div>
      <div class="confirm_btn">
        <button class="btn" @click="comfirm">发布</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'fudai',
  data () {
    return {
      wallet: {}
    }
  },
  mounted () {
    this.wallet = this.$store.state.Wallet
    console.log(typeof (this.wallet.minValue))
  },
  created () {
  },
  methods: {
    comfirm () {
      if (this.wallet.status && this.wallet.status === 1) {
        this.$http.put(`/store/v1/wallets/${this.wallet.id}`, this.wallet).then(
          () => {
            this.$router.push({name: 'fudailist'})
            this.$store.dispatch('walletinfochange', {})
          }
        ).catch(
          erro => {
            this.$toast(erro.response.message)
            this.$store.dispatch('walletinfochange', {})
          }
        )
      } else {
        this.$http.post('/store/v1/wallets', this.wallet).then(
          res => {
            console.log(res)
            this.$router.push({name: 'fudailist'})
            this.$store.dispatch('walletinfochange', {})
          }
        ).catch(error => {
          this.$toast(error.response.data.message)
          this.$store.dispatch('walletinfochange', {})
        })
      }
    }
  }
}
</script>

<style lang="stylus">
  #fudai
    .mint-header{
      height:.88rem
      .mint-header-title{
        font-size .32rem
      }
    }
    .wallet-preview
      width: 100%
      background-image:  linear-gradient( to bottom, rgb(51,161,255) 0%, rgb(16,114,214) 100%)
      min-height: 100vh

    .empty
      height: .4rem
    .wallet_preview_box
      margin: 0 .15rem
      background-color: rgb(255, 255, 255);
      box-shadow: 0px 4px 30px 0px rgba(13, 20, 71, 0.16);
      border-radius: .15rem
      .wallet_preview_header
        border-radius: .15rem
        padding: .35rem .32rem
        .item
          display: flex
          justify-content: space-between
          margin: .25rem 0
          .label
            font-size: .24rem
            color: #a0a3b2
          .value
            max-width: 4.60rem
            font-size: .24rem
            color: #000
            text-align: right
            line-height .35rem
      .driver
        border-bottom: 1px dashed #33a1ff
        position: relative
        &:before
          content: ''
          position: absolute
          width: .30rem
          height: .30rem
          border-radius: 50%
          background-color: #248cec
          left: -.15rem
          top: -.15rem
        &:after
          content: ''
          position: absolute
          width: .30rem
          height: .30rem
          border-radius: 50%
          background-color: #248cec
          right: -.15rem
          top: -.15rem
      .wallet_preview_body
        border-radius: .15rem
        padding: 0 .30rem .70rem .30rem
        margin-top: .10rem
        .wallet_body_item
          display: flex
          justify-content: space-between
          margin: .50rem 0
          .wallet_item_name
            font-size: .24rem
            color: #a0a3b2
          .wallet_item_value
            max-width: 4.60rem
            font-size: .24rem
            color: #000
            text-align: right
    .confirm_btn
      margin: .80rem .20rem auto .20rem
      .btn
        background-image: linear-gradient( -15deg, rgb(250,125,134) 1%, rgb(251,111,121) 100%)
        color: #fff
        font-size: .32rem
        width: 100%
        height: 1rem
        border-radius .1rem



</style>
