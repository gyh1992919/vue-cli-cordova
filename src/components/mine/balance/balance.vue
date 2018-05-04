<template>
  <div id="balance">
    <div class="balance-top">
      <mt-header title="余额">
        <mt-button icon="back" @click.native="$router.push({name: 'mine'})" slot="left"></mt-button>
        <router-link to="/mine/balancedetails" slot="right">
          <mt-button >明细</mt-button>
        </router-link>
      </mt-header>
      <div class="balance-top-num">
        <p>账户余额/元</p>
        <p>{{balance.liquidated}}</p>
      </div>
    </div>
    <div class="balance-bottom">
      <mt-cell title="提现" to="/mine/extract" is-link>
        <i slot="icon" class="icon iconfont icon-jinbitixian" style="color: #f76165;"></i>
        <span class="text"></span>
      </mt-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: 'balance',
  data () {
    return {
      balance: {}
    }
  },
  created () {
  },
  mounted () {
    this.$http.get('/store/v1/finances').then(
      res => { this.balance = res.data }
    )
  },
  methods: {
  }
}
</script>

<style lang="stylus">
  #balance{
    background: #f7faff
    min-height 100vh
    .balance-top{
        background-image: linear-gradient( -160deg, rgb(129,103,243) 0%, rgb(103,108,238) 40%, rgb(64,86,208) 100%);
        box-shadow: 0px 4px 20px 0px rgba(10, 22, 108, 0.16);
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

        .balance-top-num{
          padding-top 1rem
          padding-bottom .75rem
          padding-left .3rem
          p:first-child{
            color: #bdbff7
            margin-bottom .58rem
            font-size .24rem
          }
          p:last-child{
            font-size 1.2rem
            color: #fff
          }
        }
    }

    .balance-bottom{
      background: #fff
      .mint-cell{
        height:.9rem
        background: #fff
      }
      i.icon{
        font-size .3rem
        margin-right .2rem
      }
      .mint-cell-wrapper{
        padding-left .3rem
        padding-right .3rem
        line-height .9rem
        .mint-cell-text{
          vertical-align 	baseline
          font-size .26rem
          color: #333333
        }
      }
    }
  }

</style>
