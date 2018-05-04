<template>
  <div id="tabbar">
      <div @click="toggle" class="tabbar-item"><router-link to="/home"><p><i class="icon iconfont icon-dianpuqian"></i></p><p>门店</p></router-link></div>
      <div @click="toggle" class="tabbar-item"><router-link to="/side"><p><i class="icon iconfont icon-dingdanqian"></i></p><p>订单</p></router-link></div>
      <div @click="toggle" class="tabbar-item"><router-link to="/mine"><p><i class="icon iconfont icon-woqian"></i></p><p>我的</p></router-link></div>
  </div>
</template>

<script>
  import '../../assets/icon/iconfont.css'
  export default {
    name: 'tabbar',
    data () {
      return {
        isA: true
      }
    },
    created () {
    },
    methods: {
      toggle () {
        console.log(1)
        this.isA = !this.isA
      }
    }
  }
</script>

<style lang="stylus">
  #tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%
    height 1rem;
    display flex
    .router-link-active p{
      color: #33a1ff!important
    }
    .router-link-active p i.icon-dianpuqian:before { content: "\e610"; }
    .router-link-active p i.icon-woqian:before { content: "\e611"; }
    .router-link-active p i.icon-dingdanqian:before { content: "\e612"; }
    .tabbar-item {
      padding-top .18rem
      flex: 1 1 auto;
      text-align center;
      height 1rem
      line-height 1rem
      background: #ffffff
      p{
        text-align center
        color: #a0a3b2
        line-height .3rem
        i.iconfont{
          font-size .48rem
        }
      }
      p:last-child{
        font-size .22rem
        text-indent -.05rem
      }
    }
  }

</style>
