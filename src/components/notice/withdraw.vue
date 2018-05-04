<template>
  <div id="withdraw">
    <mt-header title="提现详情">
      <mt-button icon="back" slot="left" @click="$router.push({name: 'extractquery', params: {item: item}})"></mt-button>
      <mt-button slot="right"></mt-button>
    </mt-header>
    <div class="withdraw-content">
      <h1>-{{item.amount}}</h1>
      <h2>提现成功</h2>
    </div>
    <div class="withdraw-list">
    <div class="left">
      流水号
    </div>
    <div class="right">
      {{item.sn}}
    </div>
  </div>
    <div class="withdraw-list">
      <div class="left">
        提现时间
      </div>
      <div class="right">
        {{item.createdAt}}
      </div>
    </div>
    <div class="withdraw-list">
      <div class="left">
        交易类型
      </div>
      <div class="right">
        提现
      </div>
    </div>
    <div class="withdraw-list">
      <div class="left">
        提现账户
      </div>
      <div class="right">
        {{item.storeName}}({{item.userPhone}})
      </div>
    </div>
    <div class="withdraw-list">
      <div class="left">
        收款账户
      </div>
      <div class="right" v-if="item.bankCode">
        {{item.bankCode.slice(0, 4)}}  ****  ****  {{item.bankCode.slice(-4)}}（招商银行）
      </div>
    </div>
    <div class="withdraw-list" v-if="item.toAccountedAt">
      <div class="left">
        到账时间
      </div>
      <div class="right">
        {{item.toAccountedAt}}
      </div>
    </div>
    <div class="withdraw-list">
      <div class="left">
        到账状态
      </div>
      <div class="right">
        {{item.statusText}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'withdraw',
  data () {
    return {
      item: {}
    }
  },
  mounted () {
    this.item = this.$route.params.item
  },
  methods: {
  }
}
</script>

<style lang="stylus">
  #withdraw{
    background #f7faff
    min-height:100vh
    .mint-header{
      height: .88rem
      .mint-header-title{
        font-size .32rem
      }
      .mint-button-text{
        label{
          font-size 14px
        }
      }
    }
    .withdraw-content{
      background: #fff
      padding-top .96rem
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
    .withdraw-list{
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
    .withdraw-list:last-child{
      padding-bottom .4rem
    }
  }

</style>
