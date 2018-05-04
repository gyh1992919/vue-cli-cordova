// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import router from './router'
import store from './store'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import VueAMap from 'vue-amap'
import IScrollView from 'vue-iscroll-view'
import IScroll from 'iscroll'

Vue.config.productionTip = false
Axios.defaults.baseURL = 'https://coupon.test.mihutime.com/'
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.prototype.$http = Axios
Vue.prototype.$back = function () {
  router.go(-1)
}

/* eslint-disable no-new */
Vue.use(VueAMap)
Vue.use(Mint)
Vue.use(VueAwesomeSwiper)
Vue.use(IScrollView, IScroll)
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'd8fc9d51b96c16a102a74fd6bc6856bb',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geocoder'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
})

// 添加cordovajs
if (window.location.protocol === 'file:' || window.location.port === '8080') {
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}
// 设备准备完成后渲染
if (document.deviceready) {
  document.addEventListener('deviceready', function () {
    new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
  }, false)
} else {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
}

// 全局导航钩子
router.beforeEach((to, from, next) => {
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    // 通过vuex state获取当前的token是否存在
    if (!isEmptyObject(store.state.Logined)) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})

function isEmptyObject (obj) {
  for (var key in obj) {
    return false
  }
  return true
}
