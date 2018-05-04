<template>
  <div id="setting">
    <mt-header title="设置">
      <mt-button icon="back" slot="left" @click="$router.back()"></mt-button>
      <mt-button slot="right"></mt-button>
    </mt-header>
    <div class="popup-content" >
      <div class="third">
        <div class="third-child">
          <p @click="cgpn(1)">修改手机号<i class="mint-cell-allow-right"></i></p>
          <p @click="cgpw()">修改支付密码<i class="mint-cell-allow-right"></i></p>
        </div>
        <div class="third-child">
          <p @click="as(1)">店铺收款码<i class="mint-cell-allow-right"></i></p>
          <p @click="as(2)">常见问题<i class="mint-cell-allow-right"></i></p>
        </div>
        <div class="third-child">
          <p @click="about">关于我们<i class="mint-cell-allow-right"></i></p>
          <p @click="as(2)">评价我们<i class="mint-cell-allow-right"></i></p>
          <p @click="as(2)">检查更新<i class="mint-cell-allow-right"></i></p>
        </div>
        <div class="third-child">
          <p @click="popbottom = true">退出账号</p>
        </div>
      </div>
    </div>
    <mt-popup v-model="popup">
      <mt-header title="关于我们">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <mt-button slot="right"></mt-button>
      </mt-header>
      <div class="popup-content">
        <div class="about">
          <div class="logo">
            <img src="../../../assets/icon/logo-014@3x.png" alt="">
          </div>
          <div class="about-info">
            <h2>福袋介绍</h2>
            <p>是从古代就开始流传的元宵节特色活动。展现了古代中国劳动人民的聪明才智和对美好生活的向往</p>
            <p>是从古代就开始流传的元宵节特色活动。展现了古代中国劳动人民的聪明才智和对美好生活的向往</p>
            <p>是从古代就开始流传的元宵节特色活动。展现了古代中国劳动人民的聪明才智和对美好生活的向往</p>

          </div>
        </div>
      </div>
    </mt-popup>
    <mt-popup
      v-model="popbottom"
      position="bottom">
      <div class="popup-menu" @click="">退出不会删除任何历史数据</div>
      <div class="popup-menu" @click="logout">退出登录</div>
      <div class="popup-menu" @click="popbottom= false">取消</div>
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: 'setting',
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
    about () {
      this.popup = true
    },
    cgpn () {
      this.$router.push({name: 'cgpn'})
    },
    cgpw () {
      this.$router.push({name: 'cgpwd'})
    },
    logout () {
      this.$store.dispatch('logout')
      this.popbottom = false
      this.$router.push({name: 'login'})
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
  #setting{
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
          .third-child:nth-child(2){
            margin: .3rem auto
          }
          .third-child:last-child{
            margin-top: 2rem
            text-align: center
          }

          .mint-cell-allow-right::after{
            right: .3rem
          }
        }
      }

    .mint-popup{
      width:100%;
      height:100%;
      background: #f7faff
      .popup-content{
        padding-top .3rem
        .logo{
          img{
            display: block
            width:1.75rem
            margin-left auto
            margin-right:auto
            margin-top: 1.8rem
            margin-bottom:1.3rem
          }

        }
        .about-info{
          padding-left .3rem
          padding-bottom:.3rem
          background: #ffffff
        h2{
            font-size: .28rem
            font-weight 550
            color: #000000
            line-height .86rem
            margin-bottom: .15rem
            border-bottom:1px solid #eff1f7
          }
          p{
            color: #a0a3b2
            font-size: .26rem
            line-height: .6rem
            padding-right .3rem
          }
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
