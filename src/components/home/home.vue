<template>
  <div id="home" @click="clearpop">
    <div class="container">
      <div class="seller">
        <mt-header fixed :title="store.name">
            <mt-button slot="right" @click.native.stop = more()>✛
            </mt-button>
        </mt-header>
        <div class="tip" v-if="moreflag">
          <div class="inner"></div>
          <div>
            <ul>
              <li @click="$router.push({name: 'side'})"><img src="../../assets/icon/homedetail@3x.png" alt="">明细</li>
              <li @click="$router.push({name: 'qrcode'})"><img src="../../assets/icon/homeewm@3x.png" alt="">收款码</li>
            </ul>
          </div>
        </div>
        <h3 class="category">{{store.categoryText}}</h3>
        <div class="seller-top">
          <p>今日成交额（元）</p>
          <p>{{finances.todayAmount}}</p>
          <p>(<span>{{finances.todayCount}}</span>笔)</p>
        </div>
        <div class="frame">
          <div class="wave-wrapp">
            <svg class="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
              <defs>
                <path id="gentle-wave" d="m -160,44.4 c 30,0 58,-18 87.7,-18 30.3,0 58.3,18 87.3,18 30,0 58,-18 88,-18 30,0 58,18 88,18 l 0,34.5 -351,0 z" />
              </defs>
              <g class="parallax">
                <use xlink:href="#gentle-wave" x="50" y="0" fill="rgba(255, 255, 255, 0.15)"/>
                <use xlink:href="#gentle-wave" x="50" y="3" fill="rgba(255, 255, 255, 0.78)"/>
                <use xlink:href="#gentle-wave" x="50" y="6" fill="rgba(255, 255, 255, 0.8)"/>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div class="seller-main">

        <div class="tabs">
            <div class="tabs-items">
              <div class="tabs-item" @click="fudai">
                <img src="../../assets/icon/fudaiicon.png" alt="">
                <p>我的福袋</p>
              </div>
              <div class="tabs-item" @click="$router.push({name: 'balance'})">
                <img src="../../assets/icon/qianbaoicon.png" alt="">
                <p>我的钱包</p>
              </div>
              <div class="tabs-item">
                <img src="../../assets/icon/skm.png" alt="" @click="$router.push({name: 'qrcode'})">
                <p>店铺二维码</p>
              </div>
              <div class="tabs-item" @click="$router.push({name: 'adress'})">
                <img src="../../assets/icon/gdgn.png" alt="">
                <p>更多功能</p>
              </div>
            </div>
          <div class="tabs-bottom"></div>
        </div>
        <div class="seller-swiper">
          <swiper :options="swiperOption" ref="mySwiper" class="swiper-box">
            <!-- slides -->
            <swiper-slide><img src="../../assets/images/swiper.png" alt="" class="img-responsive"></swiper-slide>
            <swiper-slide><img src="../../assets/images/swiper.png" alt="" class="img-responsive"></swiper-slide>
            <swiper-slide><img src="../../assets/images/swiper.png" alt="" class="img-responsive"></swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
        </div>
        <div class="message-title"  @click="txym()">
          <p>新消息通知</p>
          <p>更多<i class="mint-cell-allow-right"></i></p>
        </div>
        <div class="messagelist">
          <div v-for="(item, index) in notice" v-if="index < 5" @click="goDetail(item)">
            <mt-cell :title="item.title">
              <span>{{item.sendAt}}</span>
              <img slot="icon" src="../../assets/icon/messagelisticon.png">
            </mt-cell>
          </div>

        </div>
      </div>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
  import tabbar from '../tabbar/tabbar'
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'home',
    components: {
      tabbar: tabbar,
      swiper,
      swiperSlide
    },
    data () {
      return {
        store: {},
        finances: {},
        notice: {},
        swiperOption: {
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        },
        moreflag: false
      }
    },
    computed: {
    },
    created () {
    },
    mounted () {
      this.$http.get('/store/v1/stores').then(res => {
        console.log(res.data)
        this.store = res.data
      }).catch(error => console.log(error.response))
      // 获取财务信息
      this.$http.get('/store/v1/finances').then(
        res => { this.finances = res.data; console.log(this.finances) }
      )
      this.$http.get('/store/v1/messages?per-page=10&page=1').then(
        res => {
          this.notice = res.data
        }
      )
      this.scoket()
    },
    methods: {
      fudai () {
        this.$router.push({name: 'fudailist'})
      },
      txym () {
        this.$router.push({name: 'noticelist'})
      },
      more () {
        this.moreflag = !this.moreflag
      },
      clearpop () {
        if (this.moreflag === true) {
          this.moreflag = false
        }
      },
      scoket () {
        let scoketUrl
        this.$http.get('/common/v1/websockets').then(res => {
          scoketUrl = res.data
          let exampleSocket = new WebSocket(`ws://${scoketUrl}`)
          exampleSocket.onopen = function (event) {
            let login = {
              action: 'login',
              type: 'store',
              receiverId: 20
            }
            login = JSON.stringify(login)
            exampleSocket.send(login)
          }
          exampleSocket.onmessage = function (event) {
            let data = event.data
            data = JSON.parse(data).data
            if (data.type === 'notice') {
              this.notice.unshift(data)
            }
            console.log(data)
          }
        })
      },
      goDetail (item) {
        switch (item.itemType) {
          case 1:
            this.$router.push({name: 'notice'})
            break
          case 2:
            this.$router.push({name: 'extractdetail', params: {item: item}})
            break
          case 3:
            this.$router.push({name: 'settlementdetail', params: {id: item.id}})
            break
          case 4:
            this.$router.push({name: 'paymentdetail', params: {id: item.id}})
            break
          case 5:
            this.$router.push({name: 'wallet'})
            break
          case 6:
            this.$router.push({name: 'storeInfo'})
            break
          case 7:
            this.$router.push({name: 'userWallet'})
            break
          case 8:
            this.$router.push({name: 'bankCard'})
            break
        }
      },
      // transarr (arr, len) {
      //   let j = 0
      //   let s = 0
      //   let m = Math.ceil(arr.length / len)
      //   let newarray = []
      //   for (let i = 0; i < m; i++) {
      //     newarray[i] = []
      //   }
      //   arr.forEach(function (item, index) {
      //     console.log(item)
      //     newarray[j][s] = item
      //     s++
      //     if (s % len === 0) {
      //       j++
      //       s = 0
      //     }
      //   })
      //   return newarray
      // }
      thousandBitSeparator (num) {
        return num && (num.toString().indexOf('.') !== -1 ? num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
          return $1 + ','
        }) : num.toString().replace(/(\d)(?=(\d{3}))/g, function ($0, $1) {
          return $1 + ','
        }))
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #home {
    padding: 0 0 1.2rem 0;
    background #f7faff
    .mint-header{
      height: .88rem
      .mint-header-title{
        font-size .32rem
      }
      .mint-button-text{
        font-size .35rem
      }
    }
    .container {
      .mint-header{
        position: absolute
        z-index 999
        background inherit;
        height:.88rem;
        .mint-header-title{
          font-size .3rem
          font-weight: bold
          line-height .8rem
        }
      }
      .seller {
        position: relative
        padding-top 1.7rem
        padding-bottom 1.2rem
        .tip{
          width:2.3rem;
          height:1.72rem;
          position: absolute
          z-index: 9999
          background: rgba(108, 112, 132, 0.9)
          right .15rem
          top: 1.05rem
          border-radius .05rem
          padding: 0 .25rem
          li{
            display: flex
            padding .3rem 0
            border-bottom 1px solid #79839b
            color: #ffffff
            img{
              width:.25rem
              height: .25rem
              display block
              margin-right:.3rem
            }
          }
          /* 提示框小角的小方块 */
          .inner{
            /* 旋转小方块并调整位置形成尖角 */
            position:absolute;
            left:1.85rem;
            top:-.2rem;
            width: 0;
            height: 0;
            border-left: .15rem solid transparent;
            border-right: .15rem solid transparent;
            border-bottom: .2rem solid rgba(108, 112, 132, 0.9);
          }
        }
        .category {
          position: absolute
          z-index 999
          left 50%
          top .77rem;
          margin-left -.5rem;
          text-align center
          color: #c7e6ff
          font-size .2rem
          line-height: .3rem
          width:1rem;
          background rgba(86,96,233,1)
          border-radius .05rem
        }
        .seller-top{
          position relative
          z-index 999

          p:first-child {
            font-size .22rem
            color: #afd0ff
            text-align center
            margin-bottom .39rem
          }
          p:nth-child(2) {
            text-align center
            font-size .8rem
            color: #ffffff
            font-weight bold
            margin-bottom .1rem
          }
          p:nth-child(3) {
            text-align center
            font-size .22rem
            color: #ffffff
            margin-bottom .1rem
            span{
              font-size .3rem
              margin-right .1rem
            }
          }
        }

        .frame {
          height: 100%;
          background-image: linear-gradient( -180deg, rgb(26,195,254) 0%, rgb(83,164,255) 41%, rgb(139,133,255) 100%);
          margin: auto;
          position: absolute;
          top:0;
          bottom:0;
          width:100%;
        }

        .wave-wrapp {
          width: 100%;
          height: 100px;
          position: absolute;
          bottom: 0px;
        }
        .wave-wrapp .wave {
          display: block;
          width: 100%;
          margin: 0;
          height: 100px;
        }
        .wave-wrapp .wave .parallax > use {
          -webkit-animation: move-forever 12s linear infinite;
          -moz-animation: move-forever 12s linear infinite;
          -o-animation: move-forever 12s linear infinite;
          animation: move-forever 12s linear infinite;
        }
        .wave-wrapp .wave .parallax > use:nth-child(1) {
          animation-delay: -2s;
          transform: translate(-110px, 0%);
          fill: rgba(255, 255, 255, 0.1);
        }
        .wave-wrapp .wave .parallax > use:nth-child(2) {
          animation-delay: -2s;
          animation-duration: 7s;
          fill: rgba(255, 255, 255, 0.05);
        }
        .wave-wrapp .wave .parallax > use:nth-child(3) {
          animation-delay: -4s;
          animation-duration: 4s;
          transform: translate(-65px, 0%);
          fill: rgba(255, 255, 255, 0.1);
        }

        @-webkit-keyframes move-forever {
          0% {
            -webkit-transform: translate(-90px, 0%);
            -moz-transform: translate(-90px, 0%);
            -o-transform: translate(-90px, 0%);
            transform: translate(-90px, 0%);
          }
          100% {
            -webkit-transform: translate(85px, 0%);
            -moz-transform: translate(85px, 0%);
            -o-transform: translate(85px, 0%);
            transform: translate(85px, 0%);
          }
        }
        @-moz-keyframes move-forever {
          0% {
            -webkit-transform: translate(-90px, 0%);
            -moz-transform: translate(-90px, 0%);
            -o-transform: translate(-90px, 0%);
            transform: translate(-90px, 0%);
          }
          100% {
            -webkit-transform: translate(85px, 0%);
            -moz-transform: translate(85px, 0%);
            -o-transform: translate(85px, 0%);
            transform: translate(85px, 0%);
          }
        }
        @-ms-keyframes move-forever {
          0% {
            -webkit-transform: translate(-90px, 0%);
            -moz-transform: translate(-90px, 0%);
            -o-transform: translate(-90px, 0%);
            transform: translate(-90px, 0%);
          }
          100% {
            -webkit-transform: translate(85px, 0%);
            -moz-transform: translate(85px, 0%);
            -o-transform: translate(85px, 0%);
            transform: translate(85px, 0%);
          }
        }
        @-o-keyframes move-forever {
          0% {
            -webkit-transform: translate(-90px, 0%);
            -moz-transform: translate(-90px, 0%);
            -o-transform: translate(-90px, 0%);
            transform: translate(-90px, 0%);
          }
          100% {
            -webkit-transform: translate(85px, 0%);
            -moz-transform: translate(85px, 0%);
            -o-transform: translate(85px, 0%);
            transform: translate(85px, 0%);
          }
        }
        @keyframes move-forever {
          0% {
            -webkit-transform: translate(-90px, 0%);
            -moz-transform: translate(-90px, 0%);
            -o-transform: translate(-90px, 0%);
            transform: translate(-90px, 0%);
          }
          100% {
            -webkit-transform: translate(85px, 0%);
            -moz-transform: translate(85px, 0%);
            -o-transform: translate(85px, 0%);
            transform: translate(85px, 0%);
          }
        }

    }
      .seller-main {
        .tabs{
          background #fff
          .tabs-items{
            padding: .4rem 0rem;
            display: flex
            justify-content space-around
            .tabs-item{
              img {
                display: block
                width: .5rem
                height .72rem
                margin-left auto
                margin-right auto
              }
              p{
                font-size .24rem
                color: #000
                width 1.2rem
                text-align center
              }
            }
            .tabs-item:last-child p {
              color: #a0a3b2
            }
          }
          .tabs-bottom{
            background #f5f8fe
            height:.32rem
          }
        }
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
        .message-title{
          display: flex
          justify-content space-between
          height:.83rem
          padding-left .3rem
          padding-right .5rem
          padding-top: .4rem
          color: #a0a3b2
          position: relative
          .mint-cell-allow-right::after{
            right:.3rem
            top:.5rem
          }
        }
        .messagelist {
          min-height 2.65rem
          .mint-cell-text{
            font-size .24rem
            color #000
          }

          .mint-cell:first-child .mint-cell-wrapper{
          }
        }
        .mint-cell {
          height:.84rem ;
          .mint-cell-wrapper{
            padding-left .3rem
            line-height .84rem
          }
        }
        .seller-main-promotion{
          margin-top .2rem
          margin-bottom .2rem
          .seller-main-promotion-title{
            line-height .9rem
            background: #ffffff
            margin-bottom 1px
            padding:0 .3rem
          }
          .seller-main-promotion-items {
            a{
              display: block;
              width:50%;
            }
            a:firsit-child{
              border-right 1px solid #666666
            }
            background #ffffff;
            display: flex;
            text-align center
            .seller-main-promotion-item {
              width:100%;
            }
          }
        }
        .seller-main-finances{
          .seller-main-finances-items{
            display: flex;
            flex-wrap wrap
            background: #fff
          }
          .seller-main-finances-item{
            width:33.33%
            text-align center
            padding .2rem .2rem
            line-height .5rem
            border-top: 1px solid #f4f4f4
            border-right 1px solid #f4f4f4
            .seller-main-finances-item-num{
              span{
                font-size .3rem
              }
            }
            .seller-main-finances-item-title{
              color: #666666
            }
          }
        }
      }

    }
  }

</style>
