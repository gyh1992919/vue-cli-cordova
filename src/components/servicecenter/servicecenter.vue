<template>
  <div id="servicecenter">
    <mt-header title="服务中心">
      <mt-button icon="back"  slot="left" @click="$router.back()"></mt-button>
      <mt-button slot="right"></mt-button>
    </mt-header>
    <div class="service-content">
      <div class="first">
        <p>亲爱的 <span>杨树</span> </p>
        <p>已经准备好为您服务...</p>
        <p @click="popbottom = true"><span>客服电话</span><span>400-0000-000 <img src="../../assets/icon/bluephone@3x.png" alt=""></span></p>
      </div>
      <div class="service-swiper">
          <swiper :options="swiperOption" ref="mySwiper" class="swiper-box">
            <!-- slides -->
            <swiper-slide><img src="../../assets/images/swiper.png" alt="" class="img-responsive"></swiper-slide>
            <swiper-slide><img src="../../assets/images/swiper.png" alt="" class="img-responsive"></swiper-slide>
            <swiper-slide><img src="../../assets/images/swiper.png" alt="" class="img-responsive"></swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
        </div>
      <div class="third">
        <p @click="intro()">福袋介绍<i class="mint-cell-allow-right"></i></p>
        <p @click="qa()">常见问题<i class="mint-cell-allow-right"></i></p>
      </div>
    </div>
    <mt-popup v-model="popup">
      <mt-header title="店铺管理">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
        <mt-button slot="right"></mt-button>
      </mt-header>
      <div class="popup-content" v-if="qaflag">
        <div class="third">
          <p @click="as(1)">福袋介绍<i class="mint-cell-allow-right"></i></p>
          <p @click="as(2)">常见问题<i class="mint-cell-allow-right"></i></p>
        </div>
      </div>
      <div class="popup-content" v-if="introflag">
        <div class="intro">
          <h2>福袋介绍</h2>
          <h3>咻一咻科技</h3>
          <p>猜灯谜又称打灯谜，是中国独有的富有民族风格的一种传统民俗文娱活动形式，是从古代就开始流传的元宵节特色活动。每逢农历正月十五，中国民间都要挂起彩灯，燃放焰火，后来有好事者把谜语写在纸条上，贴在五光十色的彩灯上供人猜。因为谜语能启迪智慧又迎合节日气氛，所以响应的人众多，而后猜灯谜逐渐成为元宵节不可缺少的节目。灯谜增添节日气氛，展现了古代中国劳动人民的聪明才智和对美好生活的向往</p>
          <p>猜灯谜又称打灯谜，是中国独有的富有民族风格的一种传统民俗文娱活动形式，是从古代就开始流传的元宵节特色活动。每逢农历正月十五，中国民间都要挂起彩灯，燃放焰火，后来有好事者把谜语写在纸条上，贴在五光十色的彩灯上供人猜。因为谜语能启迪智慧又迎合节日气氛，所以响应的人众多，而后猜灯谜逐渐成为元宵节不可缺少的节目。灯谜增添节日气氛，展现了古代中国劳动人民的聪明才智和对美好生活的向往</p>

        </div>
      </div>
    </mt-popup>
    <mt-popup
      v-model="popbottom"
      position="bottom">
      <div class="popup-menu">联系客服:400-9999-8888</div>
      <div class="popup-menu"><a href="tel:18555501932">拨打</a></div>
      <div class="popup-menu" @click="popbottom = false">取消</div>
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: 'servicecenter',
  data () {
    return {
      qaflag: false,
      introflag: false,
      introtext: '一二三',
      popup: false,
      popbottom: false,
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  created () {
  },
  methods: {
    popupreset () {
      this.popup = false
      this.popbottom = false
      this.qaflag = false
      this.introflag = false
    },
    intro () {
      this.popup = true
      this.introflag = true
    },
    qa () {
      this.popup = true
      this.qaflag = true
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
  #servicecenter{
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
    .service-content{
      padding-top .3rem
      .first{
        padding: .35rem .3rem 0
        margin-bottom .3rem
        background #ffffff
        p{
          color: #a0a3b2
          font-size .26rem
          margin-bottom .2rem
        }
        p:first-child span{
          padding-left .15rem
          color: #33a1ff
        }
        p:nth-child(2){
          margin-bottom .4rem
        }
        p:nth-child(3){
          padding .32rem 0
          border-top 1px solid #eff1f7
          display flex
          justify-content space-between
          span{
            display flex
            align-items: center
            img{
              width: .3rem
              height: .3rem
              display: block
              margin-left:.1rem
            }
          }
        }
      }
      .service-swiper{
        margin-bottom .3rem
        .swiper-box{
          width: 100%;
          height: 100%;
          margin: 0 auto;
          .swiper-pagination-bullet{
            width:.15rem
            height .06rem
            border-radius .2rem
            background #dce0fa
            opacity 1
          }
          .swiper-pagination-bullet-active{
            width .24rem
            background: #dd415e
            border-radius .3rem
          }
        }
      }
      .third{
        padding: 0 .3rem
        background: #ffffff

        p{
          padding: .3rem 0
          color: #a0a3b2
          font-size:.26rem
          position: relative
        }
        p:first-child{
          border-bottom:1px solid #eff1f7
        }
      }
    }
    .mint-popup{
      width:100%;
      height:100%;
      background: #f7faff
      .popup-content{
        padding-top .3rem
        .intro{
          padding: .5rem .3rem 1.7rem
          background: #ffffff
          h2{
            font-size: .3rem
            color: #000000
            text-align: center
            margin-bottom: .3rem
          }
          h3{
            color: #a0a3b2
            font-size:.24rem
            text-align: center
            margin-bottom: .4rem
            font-weight:normal
          }
          p{
            color: #a0a3b2
            font-size:.24rem
            line-height:.35rem
            margin-bottom:.5rem
          }
        }
        .mint-cell-wrapper{
          line-height 1.05rem
          padding-left .3rem
          padding-right .3rem
          input[type="text" i]:disabled{
            background: #fff
          }
          .mint-cell-title{
            width:auto
            margin-right .6rem
          }
          .mint-cell-text{
            font-size .26rem
            vertical-align baseline
          }
        }
        .third{
          padding: 0 .3rem
          background: #ffffff
          p{
            padding: .3rem 0
            color: #a0a3b2
            font-size:.26rem
            position: relative
          }
          p:first-child{
            border-bottom:1px solid #eff1f7
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
