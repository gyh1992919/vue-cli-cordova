<template>
  <div id="query">
      <mt-header title="结果查询">
        <mt-button icon="back" slot="left" @click="$router.push({name: 'extract'})"></mt-button>
        <mt-button slot="right" @click="$router.push({name: 'balance'})">完成</mt-button>
      </mt-header>
      <div class="process">
        <div class="process-icon">
          <i class="iconfont icon-selected" :style="[{color:true ? '#33a1ff' : '#a0a3b2'}]"></i>
          <div class="line" :style="[{borderColor:true ? '#33a1ff' : '#a0a3b2'}]"></div>
          <div class="line" :style="[{borderColor:false ? '#33a1ff' : '#a0a3b2'}]"></div>
          <i class="iconfont icon-selected" :style="[{color:false ? '#33a1ff' : '#a0a3b2'}]"></i>
        </div>
        <div class="process-info">
          <div class="process-info-item" v-if="item.bankCode">
            <div style="margin-bottom: .2rem" :style="[{color:true ? '#33a1ff' : '#a0a3b2'}]">提现申请已提交，平台已受理</div>
            <div style="margin-bottom: .1rem;color: #a0a3b2;">{{item.bankType}}（{{item.bankCode.slice(-4)}}）</div>
            <div style="color: #a0a3b2;">{{item.amount}}元</div>
          </div>
          <div class="process-info-item">
            <div style="margin-bottom: .2rem">预计7天内到账，等待银行处理</div>
            <div style="color: #a0a3b2;">{{item.expectAt}} 之前到账</div>
          </div>
        </div>
        <div class="border" style="width:6.94rem;height: 1px;border-bottom: 1px solid #eff1f7"></div>
      </div>
    <div class="check" @click="$router.push({name: 'extractdetail', params: {item: item}})">
      <p>查看账单</p>
    </div>
  </div>

</template>

<script>
  import '../../../assets/icon/iconfont.css'
  export default {
    name: 'query',
    data () {
      return {
        popupHold: true,
        username: '',
        password: '',
        email: '',
        phone: 1,
        cpt: true,
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
  #query{
    background: #f7faff
    height: 100vh
    .mint-header{
      height:.88rem
    }
    .process{
        padding .66rem .3rem
        margin-top .3rem
        background: #fff
        height:4.16rem
        display: flex
        align-items center
        justify-content flex-start
        position: relative
        .process-icon{
          height 100%
          margin-right .25rem
        }
        .process-info{
          display flex
          flex-direction: column
          justify-content:space-between;
          height:97.8%
          .process-info-item{
            align-items center
            div:first-child{
              font-size .26rem
              color: #161829
            }
            div:last-child{
              font-size .22rem
              color: #a0a3b2
            }
          }
        }
        .iconfont{
          font-size .3rem
        }
        .line{
          width:1px;
          height:.98rem
          border-left 1px solid
          color: #a0a3b2
          margin-left auto
          margin-right auto
        }
        .border{
          position: absolute
          bottom:0
        }
      }
    .check{
        text-align center
        line-height 1.04rem
        color: #33a1ff
        font-size .24rem
        background: #ffffff
      }
  }

</style>
