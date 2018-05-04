<template>
  <div id="mine">
    <mt-header title="我的">
      <router-link to="/" >
        <mt-button icon="back"></mt-button>
      </router-link>
      <router-link to="/mine/setting/setting" slot="right">
        <mt-button icon="add" >设置</mt-button>
      </router-link>
    </mt-header>
    <div class="mine-info">
      <img :src="mine.avatarUrl" alt="">
      <div class="mine-info-sec">
        <p>{{mine.name}}</p>
        <p v-if="mine.phone">{{mine.phone.slice(0,3)}}****{{mine.phone.slice(-4)}}</p>
      </div>
      <div class="mine-info-thr">
        <p>{{mine.categoryText}}</p>
      </div>
    </div>
    <div class="mine-list">
      <mt-cell title="账户余额" to="/mine/balance" is-link>
        <i slot="icon" class="icon iconfont icon-qian" style="color: #f76165;"></i>
          <span class="text">{{finance.liquidated}}</span>
      </mt-cell>
          <mt-cell title="待结算金额" to="/mine/waitingforsettlement" is-link>
            <i slot="icon" class="icon iconfont icon-qianbao" style="color: #59aaff;"></i>
              <span class="text">{{finance.unliquidated}}</span>
          </mt-cell>
          <mt-cell title="结算卡" to="/mine/cardsmanage" is-link>
            <i slot="icon" class="icon iconfont icon-yinhangqia" style="color: #59aaff;"></i>
            <span class="text"></span>
          </mt-cell>
          <mt-cell title="交易查询" to="/mine/traderecord" is-link>
            <i slot="icon" class="icon iconfont icon-jinbizhuanchu" style="color: #ffb540;"></i>
              <span class="text"></span>
          </mt-cell>
      <div style="height: .2rem;"></div>
      <mt-cell title="店铺" to="/mine/storemanage/storemanage" is-link>
        <i slot="icon" class="icon iconfont icon-dianpu1" style="color: #ffb540;"></i>
        <span class="text"></span>
      </mt-cell>
      <mt-cell title="服务中心" to="/servicecenter/servicecenter" is-link>
        <i slot="icon" class="icon iconfont icon-kefu" style="color: #f76165;"></i>
        <span class="text"></span>
      </mt-cell>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
import tabbar from '../tabbar/tabbar'
export default {
  name: 'mine',
  components: {
    tabbar
  },
  data () {
    return {
      mine: {},
      finance: {}
    }
  },
  mounted () {
    this.getmineList()
  },
  created () {
  },
  methods: {
    getmineList () {
      // 基础店铺信息
      this.$http.get('/store/v1/stores').then(
        res => { this.mine = res.data }
      ).catch(erro => this.$toast(erro.response.data.message))
      // 金融财务信息
      this.$http.get('/store/v1/finances').then(
        res => { this.finance = res.data }
      ).catch(erro => this.$toast(erro.response.data.message))
    }
  }
}
</script>

<style lang="stylus">
  #mine{
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

    .mine-info{
      padding: 0 .3rem .3rem
      background: #33a1ff
      display: flex
      align-items center
      img{
        width: 1.1rem
        height: 1.1rem
        border:1px solid #71bdff
      }
      .mine-info-sec{
        margin-left .25rem
        margin-right .15rem
        p:first-child{
          color: #fff
          font-size .32rem
          margin-bottom .22rem
        }
        p:last-child{
          color: #add3ff
        }
      }
      .mine-info-thr{
        height .75rem
        p{
          width:1.2rem
          height: .3rem
          line-height .3rem
          text-align center
          background rgba(255,255,255,14%)
          color: #c5e1ff
          font-size .2rem
          border-radius .15rem
        }
      }
    }
    .mine-list{
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
