<template>
  <div id="paymentdetail">
    <mt-header title="支付详情">
      <mt-button icon="back"  slot="left" @click="$router.back()"></mt-button>
      <mt-button slot="right"></mt-button>
    </mt-header>
    <div class="paymentdetail-content" v-if="item">
      <p><img :src="item.data.avatarUrl"  alt="">{{item.data.userName}}</p>
      <h1>{{item.data.storeAmount}}</h1>
      <h2>支付成功</h2>
    </div>
    <div class="paymentdetail-wrapper">
      <div class="paymentdetail-list">
        <div class="left">
          订单金额
        </div>
        <div class="right">
          {{item.data.orderAmount}}
        </div>
      </div>
      <div class="paymentdetail-list">
        <div class="left">
          折扣
        </div>
        <div class="right">
          -{{item.data.storeDiscountAmount}}
        </div>
      </div>
      <div class="paymentdetail-list">
        <div class="left">
          付款方式
        </div>
        <div class="right">
          {{item.data.paymentText}}
        </div>
      </div>
      <div class="paymentdetail-list">
        <div class="left">
          支付说明
        </div>
        <div class="right">
          {{}}
        </div>
      </div>
      <div class="paymentdetail-list">
        <div class="left">
          创建时间
        </div>
        <div class="right">
          {{item.data.createdAt}}
        </div>
      </div>
      <div class="paymentdetail-list">
        <div class="left">
          交易订单号
        </div>
        <div class="right">
          {{item.data.sn}}
        </div>
      </div>
    </div>
    <div class="cell-wrapper">
      <mt-cell
        title="备注"
        to="/home"
        is-link>
      </mt-cell>
      <mt-cell
        title="查看往来记录"
        to="/home"
        is-link>
      </mt-cell>
      <mt-cell
        title="对此订单有疑问"
        to="/home"
        is-link>
      </mt-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: 'paymentdetail',
  data () {
    return {
      item: {}
    }
  },
  created () {
    this.$http.get(`/store/v1/messages/${this.$route.params.id}`).then(
      res => {
        this.item = res.data
      }
    )
  },
  methods: {
  }
}
</script>

<style lang="stylus">
  #paymentdetail{
    background #f7faff
    min-height 100vh
    .mint-header{
      height: .88rem
      .mint-header-title{
        font-size .32rem
      }
    }
    .paymentdetail-content{
      background: #fff
      padding-top .96rem
      margin-bottom .2rem
      p{
        display: flex
        justify-content center
        align-items center
        margin-bottom .55rem
        img{
          width: .5rem
          height: .5rem
          display: block
          margin-right .18rem
          border-radius 50%
        }
      }
      h1{
        font-size .56rem
        text-align center
        font-weight 520
      }
      h2{
        font-size .24rem
        color: #a0a3b2
        font-weight normal
        text-align center
        padding-bottom .95rem
        margin-top .25rem
      }
    }
    .paymentdetail-wrapper{
      padding-top .3rem
      margin-bottom .2rem
      background: #fff
      .paymentdetail-list{
        display: flex
        padding-left .3rem
        padding-right .3rem
        justify-content space-between
        background: #fff
        padding-bottom .45rem
        .left{
          font-size .24rem
          color: #a0a3b2
        }
        .right{
          font-size .26rem
          color: #333333
        }
      }
      .paymentdetail-list:last-child{
        padding-bottom .4rem
      }
    }
    .cell-wrapper{
      padding-bottom 1.4rem
      background #f7faff
      .mint-cell{
        background: #fff
        .mint-cell-wrapper{
          padding:0 .3rem
          line-height .85rem
          .mint-cell-text{
            font-size .24rem
            color: #333333
          }
        }
        .mint-cell:first-child .mint-cell-wrapper{
          background none
        }
        .mint-cell:last-child{
          background-size 0 0
        }
      }


    }
  }

</style>
