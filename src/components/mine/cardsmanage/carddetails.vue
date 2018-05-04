<template>
  <div id="carddetails" :class='["bankItem-"+item.bankTypeId]'>
      <mt-header title="银行卡管理">
        <mt-button icon="back" slot="left" @click="$router.back()"></mt-button>
        <mt-button icon="add" slot="right" @click.native="popupVisible = !popupVisible">●●●</mt-button>
      </mt-header>

    <div class="card-item">
            <div class="top">
              <img :src= item.bankType.ico alt=""><p>{{item.bankType.name}}储蓄卡</p>
            </div>
            <div class="cardnum">
              <p><span>● ● ● ●</span><span>● ● ● ●</span><span>● ● ● ●</span> <span>{{item.bankCode.slice(-4)}}</span></p>
            </div>
          </div>
    <div class="limit">
      <p class="limit-title">银行支付限额</p>
      <div class="limit-detail">
        <p><span>单笔限额</span><span>￥10000</span></p>
        <p><span>每日限额</span><span>￥100000</span></p>
      </div>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="bottom">
      <div class="popup-menu" @click="relieve">解除绑定</div>
      <div class="popup-menu" @click="cancel">取消</div>
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: 'carddetails',
  data () {
    return {
      popupVisible: false,
      item: {}
    }
  },
  created () {
  },
  mounted () {
    console.log(this.item = this.$route.params.item)
  },
  methods: {
    cancel () {
      this.popupVisible = false
    },
    relieve () {
      this.$router.push({name: 'relieve', params: {id: this.item.id}})
    }
  }
}
</script>

<style lang="stylus">
  #carddetails{
      min-height 100vh
    .mint-header{
      height: .88rem
      background transparent
      .mint-header-title{
        font-size .32rem
      }
      .mint-button-text{
        font-size .24rem
      }
    }

    .card-item{
      padding:.8rem
      .top{
        text-align center
        img{
          display block
          width .6rem
          height: .6rem
          border-radius 50%
          margin-left auto
          margin-right auto
          margin-bottom .3rem
        }
        p{
          color: #fff
          font-size .28rem
        }
      }
      .cardnum{
        padding-top .25rem
        p{
          font-size .36rem
          color: #fff
          text-align left
          display: flex
          align-items center
          justify-content space-between
          width 4.5rem
          margin-right auto
          margin-left auto
          span{
            display block
          }
          span:last-child{
            font-size .3rem
            color: #edb4b9
          }

        }
      }
    }
    .limit{
      border-radius: 5px;
      box-shadow: 0px 3px 3px 3px rgba(0, 0, 0, 0.3);
      width 6.94rem
      margin-left auto
      margin-right auto
      background #fff
      .limit-title{
        color: #a0a3b2
        font-size .24rem
        background: #eff1f7
        line-height .6rem
        text-align center
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      }
      .limit-detail{
        padding .5rem .3rem
        p{
          display flex
          justify-content space-between
          margin-bottom .3rem
          span{
            display block
            font-size .26rem
            color: #000
          }
          span:last-child{
            color: #5b5d65
          }
        }
        p:last-child{
          margin-bottom 0
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
  }

  .bankItem-1{
    background-image: linear-gradient( 330deg, rgb(199,59,73) 0%, rgb(235,90,108) 100%);
    box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.3);
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
</style>
