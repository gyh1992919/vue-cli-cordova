<template>
  <div id="cgpn">
    <mt-header title="修改手机号">
      <mt-button icon="back" slot="left" @click="$router.back()"></mt-button>
      <mt-button slot="right"></mt-button>
    </mt-header>
    <div class="popup-content" >
      <div class="third">
        <div class="third-child">
          <p @click="as(1)">短信验证码修改<i class="mint-cell-allow-right"></i></p>
          <p @click="cs()">联系客服<i class="mint-cell-allow-right"></i></p>
        </div>
      </div>
    </div>

    <mt-popup
      v-model="popbottom"
      position="bottom">
      <div class="popup-menu" @click="">联系客服:400-9999-8888</div>
      <div class="popup-menu"><a href="tel:18555501932">拨打</a></div>
      <div class="popup-menu" @click="popbottom = false">取消</div>
    </mt-popup>
  </div>
</template>

<script>
  export default {
    name: 'cgpn',
    data () {
      return {
        popup: false,
        popbottom: false
      }
    },
    created () {
    },
    methods: {
      popupreset () {
        this.popup = false
        this.popbottom = false
      },
      cs () {
        this.popbottom = true
      },
      as () {
        this.$router.push({name: 'odpn'})
      }
    },
    beforeRouteLeave (to, from, next) {
      let self = this
      if (self.popup || self.popbottom) {
        next(false)
        self.popupreset()
      } else {
        next()
      }
    }
  }
</script>

<style lang="stylus">
  #cgpn{
    background: #f7faff
    min-height 100vh
    .mint-header{
      height: .88rem
      .mint-header-title{
        font-size .32rem
      }
      .mint-button-text{
        font-size .24rem
      }
    }
    .popup-content{
      padding-top .3rem
      .third{
        p{
          padding: .3rem 0
          font-size:.26rem
          position: relative
          border-bottom 1px solid #eff1f7
          padding-right: .3rem
        }
        .third-child{
          p:last-child{
            border-bottom:none
          }
          background: #ffffff
          padding-left: .3rem
        }
        .mint-cell-allow-right::after{
          right: .3rem
        }
      }
    }
    .mint-popup-bottom{
      width: 100%
      height auto
      background transparent
      .popup-menu{
        line-height 1rem
        text-align center
        background #ffffff
        border-bottom 1px solid #e2e4e9
        a{
          display: block
          width: 100%
          height: 100%
          color: #000
        }
      }
      .popup-menu:first-child{
        border-top-left-radius:.15rem;
        border-top-right-radius:.15rem;
      }
      .popup-menu:last-child{
        border:none
      }
    }


  }

</style>
