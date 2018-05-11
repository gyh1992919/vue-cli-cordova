// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './api/api'
import router from './router'
import store from './store'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueAMap from 'vue-amap'

Vue.config.productionTip = false
import 'lib-flexible/flexible.js'
/* eslint-disable no-new */
Vue.use(VueAMap)
Vue.use(Mint)
// Vue.use(VueAwesomeSwiper)
// Vue.use(IScrollView, IScroll)
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'd8fc9d51b96c16a102a74fd6bc6856bb',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geocoder'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
})


// 设备准备完成后渲染
const init = () => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
}

document.addEventListener('deviceready', init, false)
