<template>
  <div id="adress">
    <mt-header title="地址">
      <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
      <mt-button slot="right">{{tips}}</mt-button>
    </mt-header>
    <div class="adressInfo">
      <p><img src="../../assets/icon/hsgth@3x.png" alt="">请按照格式填写地址，以免影响门店搜索和活动报名</p>
      <p>例1：道路+门牌号，“人民东路18号”</p>
      <p>例2：道路+门牌号+所在建筑+楼层，“四川北路1552号欢乐广场1楼”</p>
    </div>
    <div class="amap-wrapper">
      <div class="amap-page-container">
        <el-amap vid="amapDemo" :zoom="zoom" :center="center" class="amap-demo" :plugin="plugin">
          <el-amap-info-window v-if="regeo.province"  :position="mywindow.position" :content="regeo.province + '&nbsp;'+ regeo.city + ' &nbsp;'+regeo.district" :visible="mywindow.visible" :events="mywindow.events"></el-amap-info-window>
          <el-amap-marker :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable"></el-amap-marker>
          <el-amap-circle :center="circle.center" :radius="circle.radius" :fillOpacity="circle.fillOpacity" :events="circle.events" :strokeColor="circle.strokeColor" :strokeStyle="circle.strokeStyle" :fillColor="circle.fillColor"></el-amap-circle>
        </el-amap>
      </div>
    </div>

    <div class="adress-picker">
      <mt-popup
        v-model = "popupBottom"
        position= "bottom" class="popup-bottom">
        <mt-picker :slots="slots" @change="onValuesChange" :valueKey="'name'" ></mt-picker>
      </mt-popup>
    </div>

    <div class="adress-form">
      <mt-cell title="省/市/区" is-link @click.native="popupBottom = !popupBottom">
        <div class="adress-form-reg" ><p v-if="regeoID.province">{{regeoID.province.name}}</p><p v-if="regeoID.city">{{regeoID.city.name}}</p><p v-if="regeoID.district">{{regeoID.district.name}}</p></div>
      </mt-cell>
      <div>
        <div class="input">
          <mt-field label="详细地址" placeholder="请输入详细街道地址" type="textarea" rows="4" v-model="adressDetails"></mt-field>
        </div>
      </div>
    </div>
    <p style="padding-left: .3rem;color: #ea9506;line-height: .68rem">*请根据店铺实际位置进行填写</p>
    <mt-button class="confirm" @click = commitInfo()>确定</mt-button>
  </div>
</template>

<script>
export default {
  name: 'adress',
  data () {
    let self = this
    return {
      // 地图定位
      tips: '',
      adressDetails: '',
      popupBottom: false,
      AMap: {},
      regeo: '123',
      zoom: 15,
      center: [121.5273285, 31.21515044],
      circle: {
        clickable: true,
        center: [121.5273285, 31.21515044],
        radius: 200,
        fillOpacity: 0.3,
        strokeStyle: 'dashed',
        fillColor: '#FFFF00',
        strokeColor: '#00BFFF'
      },
      marker: {
        position: [121.5273285, 31.21515044],
        events: {
          click: () => {
            if (this.mywindow.visible === true) {
              this.mywindow.visible = false
            } else {
              this.mywindow.visible = true
            }
          },
          dragend: (e) => {
            this.markers[0].position = [e.lnglat.lng, e.lnglat.lat]
          }
        },
        visible: true,
        draggable: false
      },
      mywindow: {
        position: [121.5273285, 31.21515044],
        visible: true,
        events: {
          close () {
            this.mywindow.visible = false
          }
        }
      },
      plugin: [{
        pName: 'Scale',
        events: {
          init (instance) {
            console.log(instance)
          }
        }
      },
      {
        pName: 'ToolBar',
        events: {
          init (instance) {
            console.log(instance)
          }
        }
      },
      {
        pName: 'Geocoder',
        events: {
          init (o) {
            // o 是高德地图插件实例
            console.log(o)
            self.AMap = o
          }
        }
      }
      ],
      // 三级联动
      slots: [
        {
          flex: 1,
          values: [],
          className: 'slot1',
          textAlign: 'center'
        },
        {
          divider: true,
          content: '-',
          className: 'slot2'
        },
        {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center'
        },
        {
          divider: true,
          content: '-',
          className: 'slot4'
        },
        {
          flex: 1,
          values: [],
          className: 'slot5',
          textAlign: 'center'
        }
      ],
      valuesP: {},
      values0: {},
      values1: {},
      values2: {},
      // 手动选择
      regeoID: {
        province: '请选择省市区',
        city: '',
        district: ''
      },
      storeInfo: {}
    }
  },
  watch: {
    values0 (newValue, oldValue) {
      if (newValue) {
        this.getRegionsProvince(newValue.id, 2)
        this.regeoID.province = newValue
      }
    },
    values1 (newValue, oldValue) {
      if (newValue) {
        this.getRegionsProvince(newValue.id, 4)
        this.regeoID.city = newValue
      } else {
        this.slots[2].values = ['无']
        this.slots[4].values = ['无']
        this.regeoID.city = null
      }
    },
    values2 (newValue, oldValue) {
      if (newValue.id) {
        this.regeoID.district = newValue
      } else {
        this.regeoID.district = null
      }
    },
    center (newValue, oldValue) {
      setTimeout(() => {
        this.addressRender(newValue)
      }, 100)
    }
  },
  created () {
    // 获取省市区
    this.getRegions()
    this.getPosition()
  },
  mounted () {
    // 获取状态管理中的店铺信息
    this.storeInfo = this.$store.state.Store
    // 获取经纬度
  },
  methods: {
    onValuesChange (picker, values) {
      this.values0 = picker.getSlotValue(0)
      this.values1 = picker.getSlotValue(1)
      this.values2 = picker.getSlotValue(2)
    },
    getRegions () {
      this.$http.get('/common/v1/regions').then(
        res => {
          this.slots[0].values = res.data.children
          console.log(res.data.children)
        }
      )
    },
    getRegionsProvince (id, num) {
      if (num === 2 && id) {
        this.$http.get(`/common/v1/regions/${id}`).then(
          res => { this.slots[2].values = res.data.children }
        )
      } else if (num === 4 && id) {
        this.$http.get(`/common/v1/regions/${id}`).then(
          res => {
            if (res.data.children.length > 0) { this.slots[4].values = res.data.children } else { this.slots[4].values = ['无'] }
          })
      }
    },
    getPosition () {
      // IP定位
      this.$http.get('/common/v1/locations/ip-location').then(
        res => {
          this.center = res.data.location
          // TODO
          this.storeInfo.lat = res.data.location[1]
          this.storeInfo.lon = res.data.location[0]
          this.circle.center = res.data.location
          this.marker.position = res.data.location
          this.mywindow.position = res.data.location
        }).catch(() => this.$toast('定位失败，请检查是否开启定位，并重新注册'))
    },
    addressRender (newValue) {
      let self2 = this
      this.AMap.getAddress(newValue, function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          // 获得了有效的地址信息:
          // 即，result.regeocode.formattedAddress
          console.log(result.regeocode)
          self2.regeo = result.regeocode.addressComponent
        } else {
          // 获取地址失败
        }
      })
    },
    commitInfo () {
      // 经纬度定位
      if (!this.storeInfo.lat || !this.storeInfo.lon) {
        return false
      }
      // 地址选择器
      if (this.regeoID.district && this.regeoID.city && this.regeoID.province) {
        this.storeInfo.regionId = this.regeoID.district.id
        this.storeInfo.cityId = this.regeoID.city.id
        this.storeInfo.provinceId = this.regeoID.province.id
      } else {
        this.$toast('您选择的区域尚未开通')
        return false
      }
      // 详细地址
      if (this.adressDetails.length > 0) {
        this.storeInfo.address = this.adressDetails
      } else {
        this.$toast('请输入你店铺的详细地址')
        return false
      }
      // 提交信息
      this.$store.dispatch('storeinfochange', this.storeInfo)
      if (this.$route.params.page === 'storechange') {
        this.$router.push({name: 'storechange'})
      } else {
        this.$router.push('register')
      }
    }
  }
}
</script>

<style lang="stylus">
  #adress{
    position relative
    background #f7faff
    .popup-bottom{
      width:100%;
      height:auto
    }
    .adress-picker{
      .picker{
      }
      .picker-slot-wrapper{

      }
    }
    .adress-form{
      background #ffffff
      .input{
        .mint-cell-title{
          line-height normal
          padding-top 8px
          align-self stretch
        }
      }
      .mint-cell-wrapper{
        padding: 0 .3rem;
        line-height 1rem
        .mint-cell-value.is-link{
          flex 2.2
        }
      }
      .adress-form-reg{
        color: #161829
        display: flex
        p{
          width: 1rem
          text-overflow:ellipsis
          white-space:nowrap
          overflow: hidden
          margin-right .1rem
        }
      }
    }
    .adressInfo{
      position: absolute
      padding: .4rem .58rem .4rem .83rem
      background: rgba(255,255,255,0.9)
      z-index 1000
      line-height .36rem
      font-size .22rem
      color: #a0a3b2
      p:first-child{
        color: #161829
        font-size .24rem
        line-height .5rem
        position: relative
        img{
          width:.34rem
          height:.34rem
          position absolute
          left -0.53rem
          top 0.08rem
        }
      }
    }
    .amap-page-container  {
      width: 100%;
      height: 7.2rem;
    }
    .confirm{
      width: 94%
      background: #00b4fe
      display: block
      margin-left auto
      margin-right auto
      color: #ffffff
      border-radius 0
      font-size .32rem
      height:.8rem
      line-height .8rem
      margin-top .1rem
      margin-bottom .18rem
    }
  }

</style>
