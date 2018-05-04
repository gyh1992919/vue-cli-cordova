<template>
  <div id="notice">
    <mt-header title="站内通知">
      <mt-button icon="back" slot="left"></mt-button>
      <mt-button slot="right"></mt-button>
    </mt-header>
    <div class="notice-content">
      <h1>元宵节猜灯谜活动</h1>
      <h2>站内通知</h2>
      <h3>2018-01-20 15:30:20</h3>
      <p>猜灯谜又称打灯谜，是中国独有的富有民族风格的一种传统民俗文娱活动形式，是从古代就开始流传的元宵节特色活动。每逢农历正月十五，中国民间都要挂起彩灯，燃放焰火，后来有好事者把谜语写在纸条上，贴在五光十色的彩灯上供人猜。因为谜语能启迪智慧又迎合节日气氛，所以响应的人众多，而后猜灯谜逐渐成为元宵节不可缺少的节目。灯谜增添节日气氛，展现了古代中国劳动人民的聪明才智和对美好生活的向往</p>
      <p>猜灯谜又称打灯谜，是中国独有的富有民族风格的一种传统民俗文娱活动形式，是从古代就开始流传的元宵节特色活动。每逢农历正月十五，中国民间都要挂起彩灯，燃放焰火，后来有好事者把谜语写在纸条上，贴在五光十色的彩灯上供人猜。因为谜语能启迪智慧又迎合节日气氛，所以响应的人众多，而后猜灯谜逐渐成为元宵节不可缺少的节目。灯谜增添节日气氛，展现了古代中国劳动人民的聪明才智和对美好生活的向往</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notice',
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
  #notice
    background #f7faff
    padding-bottom 2rem
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
    .notice-content{
      margin:.3rem .3rem 0 .3rem
      padding .6rem .34rem .98rem
      background #fff
      h1{
        text-align center
        font-size .3rem
        color: #000
        margin-bottom  .28rem
      }
      h2{
        text-align center
        font-size .24rem
        color: #a0a3b2
        margin-bottom .2rem
        font-weight: normal
      }
      h3{
        font-size .2rem
        color: #a0a3b2
        text-align center
        font-weight: normal
        margin-bottom .45rem
      }
      p{
        color: #a0a3b2
        font-size .24rem
        line-height .42rem
      }
    }
</style>
