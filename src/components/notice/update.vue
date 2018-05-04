<template>
  <div id="update">
    <mt-header title="更新">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right"></mt-button>
    </mt-header>
    <div class="update-button">
      <mt-button>更新 V2.0版本</mt-button>
    </div>
    <div class="update-info">
      <p>更新内容：</p>
      <p>1.猜灯谜又称打灯谜，是中国独有的富有民族风格的一种传统民俗文娱活动形式</p>
      <p>2.是从古代就开始流传的元宵节特色活动。每逢农历正月十五，中国民间都要挂起彩灯</p>
      <p>3.燃放焰火，后来有好事者把谜语写在纸条上，贴在五光十色的彩</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'update',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style lang="stylus">
  #update{
    min-height 100vh
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
    .update-button{
      padding:.8rem .3rem
      background: #f7faff
      .mint-button--normal{
        width: 100%
        line-height .8rem
        height: .8rem
        background: #00b4fe
        box-shadow none
        color: #fff
        font-size .3rem
      }
    }
    .update-info{
      padding:.4rem .3rem 0
      p{
        font-size .24rem
        color: #a0a3b2
        line-height .42rem
      }
      p:first-child{
        color: #000000
        padding-bottom .15rem
      }
    }
  }

</style>
