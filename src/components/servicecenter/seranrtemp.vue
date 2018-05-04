<template>
  <div id="seranrtemp">
    <mt-header title="系统问题">
    <router-link to="/" slot="left">
      <mt-button icon="back"></mt-button>
    </router-link>
    <mt-button slot="right"></mt-button>
  </mt-header>
    <div class="seranrtemp-content">
      <h1>系统问题</h1>
      <h2>解决一</h2>
      <p>猜灯谜又称打灯谜，是中国独有的富有民族风格的一种传统民俗文娱活动形式，是从古代就开始流传的元宵节活动</p>
      <p>因为谜语能启迪智慧又迎合节日气氛，所以响应的人众多，而后猜灯谜逐渐成为元宵节不可缺少的节目。灯谜增添节日气氛，展现了古代中国劳动人民的聪明才智和对美好生活的向往。</p>
      <img alt="">
      <h2>解决二</h2>
      <p>因为谜语能启迪智慧又迎合节日气氛，所以响应的人众多，而后猜灯谜逐渐成为元宵节不可缺少的节目。灯谜增添节日气氛，展现了古代中国劳动人民的聪明才智和对美好生活的向往。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'seranrtemp',
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
  #seranrtemp{
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
    .seranrtemp-content{
      background: #ffffff
      padding: .55rem .3rem
      margin-top: .3rem

      h1{
        font-size: .3rem
        margin-bottom .4rem
      }
      h2{
        font-size:.24rem
        margin-bottom: .18rem
      }
      p{
        color: #a0a3b2
        font-size:.24rem
        line-height:.42rem
        margin-bottom:.18rem
      }
      img{
        width: 100%
        display: block
        height:auto
        margin-bottom .4rem
      }
    }
  }

</style>
