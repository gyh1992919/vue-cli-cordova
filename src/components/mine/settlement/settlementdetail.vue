<template>
  <div id="settlementdetail">
    <mt-header :title='item.tradingTypeText + "详情"'>
      <mt-button icon="back" slot="left" @click="$router.back()"></mt-button>
      <mt-button slot="right"></mt-button>
    </mt-header>
    <div class="settlementdetail-content">
      <h1>{{item.amount}}</h1>
      <h2 v-if="item.tradingType === 1">提现成功</h2>
      <h2 v-if="item.tradingType === 2"></h2>
    </div>
    <div class="settlementdetail-wrapper">
      <div class="settlementdetail-list">
        <div class="left">
          结算单号
        </div>
        <div class="right">
          {{item.sn}}
        </div>
      </div>
      <div class="settlementdetail-list">
        <div class="left">
          {{item.tradingTypeText}}时间
        </div>
        <div class="right">
          {{item.completedAt}}
        </div>
      </div>
      <div class="settlementdetail-list">
        <div class="left">
          交易类型
        </div>
        <div class="right">
          {{item.tradingTypeText}}
        </div>
      </div>
      <div class="settlementdetail-list">
        <div class="left">
          结算账户
        </div>
        <div class="right">
          余额
        </div>
      </div>
      <div class="settlementdetail-list">
        <div class="left">
          创建时间
        </div>
        <div class="right">
          2018-09-20
        </div>
      </div>
      <div class="settlementdetail-list">
        <div class="left">
          到账状态
        </div>
        <div class="right">
          已提交
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'settlementdetail',
    data () {
      return {
        item: {}
      }
    },
    created () {
    },
    mounted () {
      console.log(this.item = this.$route.params.item)
    },
    methods: {
    }
  }
</script>

<style lang="stylus">
  #settlementdetail{
    background #f7faff
    min-height 100vh
    .mint-header{
      height: .88rem
      .mint-header-title{
        font-size .32rem
      }
    }
    .settlementdetail-content{
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
    .settlementdetail-wrapper{
      padding-top .3rem
      margin-bottom .2rem
      background: #fff
      .settlementdetail-list{
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
      .settlementdetail-list:last-child{
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
