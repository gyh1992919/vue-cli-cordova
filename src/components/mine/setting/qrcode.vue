<template>
  <div id="qrcode">
    <mt-header title="店铺码">
      <mt-button icon="back" slot="left" @click="$router.back()"></mt-button>
      <mt-button slot="right">保存本地</mt-button>
    </mt-header>

    <div class="qr-content">
      <p>扫码进店铺 立即买单</p>
      <p>lady茶餐厅收款码</p>
      <p><img src="../../../assets/icon/paysign@3x.png" alt=""></p>
      <p class="ewm"><img :src="qrcode" alt=""></p>
    </div>
    <p class="hsb"><router-link to="">历史订单</router-link></p>

  </div>
</template>

<script>
export default {
  name: 'qrcode',
  data () {
    return {
      qrcode: ''
    }
  },
  mounted () {
    this.$http.get('/store/v1/qrcodes').then(
      res => {
        this.qrcode = res.data.qrcode
      }
    )
  },
  methods: {
  }
}
</script>

<style lang="stylus">
  #qrcode{
    .mint-header{
      position: fixed
      width: 100%
      top: 0
      height: .88rem
      background: transparent
      .mint-header-title{
        font-size .32rem
      }
      .mint-button-text{
        font-size .24rem
      }
    }

    min-height: 100vh
    background-image: linear-gradient( -240deg, rgb(51,161,255) 0%, rgb(1,113,209) 100%);
    display: flex
    align-items center
    justify-content center
    .qr-content{
      width: 6.94rem
      background: #ffffff
      padding-top:.7rem
      padding-bottom:1.7rem
      border-radius .15rem
      text-align: center
      p:first-child{
        font-size:.4rem
        margin-bottom:.25rem
      }
      p:nth-child(2){
        font-size:.24rem
        color: #a0a3b2
      }
      p:nth-child(3){
        margin-top: .6rem
        margin-bottom: .75rem
        img{
            width: 3.7rem
            margin-bottom: .3rem
          }
      }
      .ewm{
        img{
          width:3.65rem
          height: 3.65rem
          display: block
          margin-left:auto
          margin-right:auto
        }
      }

    }
    .hsb {
      position: fixed
      width: 100%
      bottom:0
      text-align center
      line-height:.8rem
      a{
        color: #99bae7
      }
    }
  }

</style>
