<template>
  <div id="register">
    <mt-header title="基本信息">
        <mt-button icon="back" slot="left" @click = $router.push({name:'login'}) ></mt-button>
        <mt-button slot="right" @click="popbottom = true">联系客服</mt-button>
    </mt-header>
    <div v-if="blank" class="information">
      <mt-field label="店铺名称" placeholder="请输入店铺名称" type="text" v-model="storeInfo.name"></mt-field>
      <mt-field @click.native="sadress" label="店铺地址" placeholder="请选择" type="text" v-model="storeInfo.address" :disabled="true"></mt-field>
      <mt-field label="联系电话" placeholder="请输入座机/手机，座机需加区号" type="tel" v-model="storeInfo.phone"></mt-field>
      <mt-field @click.native="scategory" label="经营品类" placeholder="请选择" type="text" v-model="storeInfo.categoryText" :disabled="true"></mt-field>
      <div class="time weeks"  @click="weekpicker">
        <p>营业日</p>
        <p>
          <span v-for="item in storeInfo.weekstext">{{item.value}}</span>
        </p>
      </div>
      <div class="time">
        <p>营业时间</p>
        <p><span  @click="pickeropen(1)" ><span v-if="workflag1">开始时间</span>{{workAt}}</span></p>
        <p @click="pickeropen(1)"><img src="../../assets/icon/rili@3x.png" alt=""></p>
        <p style="margin-left: 1.3rem"><span @click="pickeropen(2)"><span v-if="workflag2">结束时间</span>{{workendAt}}</span></p>
        <p @click="pickeropen(2)"><img src="../../assets/icon/rili@3x.png" alt=""></p>
      </div>
      <div class="time" @click = selectservice>
        <p>提供服务</p>
        <p><span style="margin-right: .1rem" v-for="item in storeInfo.servicestext">{{item.name}}</span></p>
      </div>
      <mt-button @click = checkin() class="checkin">提交审核</mt-button>
    </div >
    <mt-popup
      v-model="popuphold"
      class="popup-hold"
      closeOnClickModal="false">
      <mt-header title="等待验证">
        <mt-button icon="back"  slot="left" @click="holdback()"></mt-button>
        <mt-button slot="right"  @click="popbottom = true">联系客服</mt-button>
      </mt-header>
      <div class="process">
        <div class="process-icon">
          <i class="iconfont icon-selected" :style="[{color:audit ? '#33a1ff' : '#a0a3b2'}]"></i>
          <div class="line" :style="[{borderColor:audit ? '#33a1ff' : '#a0a3b2'}]"></div>
          <i class="iconfont icon-selected" :style="[{color:audit ? '#33a1ff' : '#a0a3b2'}]"></i>
          <div class="line" :style="[{borderColor:!cpt ? '#33a1ff' : '#a0a3b2'}]"></div>
          <i class="iconfont icon-selected" :style="[{color:!cpt ? '#33a1ff' : '#a0a3b2'}]"></i>
        </div>
        <div class="process-info">
          <div class="process-info-item">
            <div>选择分站</div>
            <div v-if="audit">已完成</div>
            <div v-if="!audit" style="color: #eb9704;">未完成</div>
          </div>
          <div class="process-info-item">
            <div>开通店铺</div>
            <div v-if="audit">已完成</div>
            <div v-if="!audit" style="color: #eb9704;" >未完成</div>
          </div>
          <div class="process-info-item">
            <div>审核成功</div>
            <div v-if="!cpt">已完成</div>
            <div v-if="cpt" style="color: #eb9704;">未完成</div>
          </div>
        </div>
      </div>
      <div class="button">
        <mt-button class="audit" v-if="cpt" :disabled = "true" >等待验证</mt-button>
        <mt-button v-if="!cpt" @click = auditsuccess>审核通过</mt-button>
      </div>
    </mt-popup>
    <mt-datetime-picker ref="timepicker"
      v-model="pickerVisible"
      type="time"
      @confirm="handleConfirm">
    </mt-datetime-picker>
    <mt-popup
      v-model="popbottom"
      position="bottom">
      <div class="popup-menu">联系客服:400-9999-8888</div>
      <div class="popup-menu"><a href="tel:18555501932">拨打</a></div>
      <div class="popup-menu" @click="popbottom = false">取消</div>
    </mt-popup>
  </div>

</template>

<script>
  // TODO: 提供服务小右箭头
  import '../../assets/icon/iconfont.css'
  // TODO: 添加联系客服
  export default {
    name: 'register',
    data () {
      return {
        blank: false,
        pickerVisible: '',
        popuphold: false,
        popbottom: false,
        cpt: true,
        storeInfo: {
        },
        pickerflag: '',
        audit: false,
        workflag1: true,
        workflag2: true,
        workAt: '',
        workendAt: ''
      }
    },
    watch: {

    },
    mounted () {
      this.selectpage()
    },
    created () {
      this.storeInfo = this.$store.state.Store
      if (this.storeInfo.workAt) {
        this.workflag1 = false
        this.workAt = this.storeInfo.workAt
      }
      if (this.storeInfo.workendAt) {
        this.workflag2 = false
        this.workendAt = this.storeInfo.workendAt
      }
      if (this.storeInfo.servicestext === undefined) {
        this.storeInfo.servicestext = [{name: '请选择'}]
      }
      if (this.storeInfo.weekstext === undefined) {
        this.storeInfo.weekstext = [{value: '请选择'}]
      }
      console.log(this.storeInfo)
    },
    methods: {
      selectpage () {
        let pra = this.$route.params.register
        if (pra === 'holdon') {
          this.popuphold = true
          this.audit = true
          this.cpt = true
        } else if (pra === 'success') {
          this.popuphold = true
          this.audit = true
          this.cpt = false
        } else {
        }
        this.$http.get('/store/v1/store-manages/status').then(res => {
          if (res.data.status === 1) {
            this.popuphold = true
            this.audit = true
            this.cpt = false
          } else if (res.data.status === 0) {
            this.popuphold = true
            this.audit = true
            this.cpt = true
          }
        }).catch(erro => {
          console.log(erro.response.message)
        }).then(() => { this.blank = true })
      },
      commitInfo () {
        this.$store.dispatch('storeinfochange', this.storeInfo)
      },
      sadress () {
        this.commitInfo()
        this.$router.push({name: 'adress'})
        console.log(this.$store.state)
      },
      scategory () {
        this.commitInfo()
        this.$router.push({name: 'selectcategory'})
      },
      weekpicker () {
        this.commitInfo()
        this.$router.push({name: 'weekpicker', params: { page: 'weeks' }})
      },
      checkin () {
        if (!this.storeInfo.name) {
          this.$toast('请输入店铺名称')
          return false
        } else if (!this.storeInfo.address) {
          this.$toast('请输入店铺地址')
        } else if (!this.storeInfo.phone || this.storeInfo.phone.length < 7) {
          this.$toast('请输入正确的电话号码')
        } else if (!this.storeInfo.categoryText) {
          this.$toast('请选择经营品类')
        } else if (!this.storeInfo.weeks) {
          this.$toast('请选择营业日')
        } else if (!this.storeInfo.workAt) {
          this.$toast('请选择营业开始时间')
        } else if (!this.storeInfo.workendAt) {
          this.$toast('请选择营业结束时间')
        } else if (!this.storeInfo.services) {
          this.$toast('请选择提供的服务')
        } else if (!this.storeInfo.lat || !this.storeInfo.lon) {
          this.$toast('地址定位失败，请检查定位是否开启并重试')
        } else {
          this.$http.post('/store/v1/store-manages', this.storeInfo).then(
            res => {
              console.log(res.data)
              if (res.data.status === 1) {
                this.popuphold = true
                this.audit = true
                this.cpt = false
              } else if (res.data.status === 0) {
                this.popuphold = true
                this.audit = true
                this.cpt = true
              } else {
              }
            }
          ).catch(erro => { this.$toast(erro.response.data.message) })
        }
      },
      pickeropen (para) {
        this.$refs.timepicker.open()
        this.pickerflag = para
      },
      handleConfirm (p) {
        if (this.pickerflag === 1) {
          this.workflag1 = false
          this.workAt = p
          this.storeInfo.workAt = this.workAt
        } else if (this.pickerflag === 2) {
          this.workflag2 = false
          this.workendAt = p
          this.storeInfo.workendAt = this.workendAt
        }
      },
      selectservice () {
        this.$router.push({name: 'weekpicker', params: { page: 'service' }})
      },
      auditsuccess () {
        this.$router.push({name: 'home'})
        this.$http.post('/store/v1/stores/step').then()
      },
      holdback () {
        if (this.popbottom) { this.popbottom = false } else { this.popuphold = false }
      }
    },
    beforeRouteLeave (to, from, next) {
      if (to.name === 'home') {
        next()
      } else if (this.popbottom) {
        next(false)
        this.popbottom = false
      } else if (this.popuphold) {
        this.popuphold = false
        next(false)
      } else {
        next()
      }
    }
  }
</script>

<style lang="stylus">
  #register{
    .mint-header{
      height: .88rem
      .mint-header-title{
        font-size .32rem
      }
      .mint-button-text{
        font-size .24rem
      }
    }
    input[type="text" i]:disabled{
      background: transparent
    }
    background: #f7faff
    height: 100vh
    .information{
      padding-top .3rem
      .mint-cell-wrapper{
        line-height 1.04rem
        font-size .26rem !important
        padding-left .3rem
        padding-right .3rem
        .mint-cell-text{
          font-size .26rem
          color: #161829
        }
      }
      .mint-cell:first-child .mint-cell-wrapper{
        background-size 0 0
      }
      .mint-button--normal{
        background: #00b4fe
        width: 94%
        color: #fff
        margin-left auto
        margin-right auto
        display block
        .mint-button-text{
          font-size .32rem
        }
      }
      .time{
        display: flex
        align-items:center
        line-height .9rem
        padding-left: .3rem
        padding-right: .3rem
        background: #ffffff
        p{
          color: rgb(84,84,84)
          display flex
          align-items center
          img{
            height:.35rem
            width:.4rem
            display block
            margin-left:.45rem
          }
          span{
            display: block
            width: 1rem
          }
        }
        p:first-child{
          color: #000000
          margin-right: .9rem
          /*white-space: nowrap*/
          width: 1rem
          display: block
        }
      }
      .time.weeks{
        p{
          span{
            width: .75rem
          }
        }
      }
    }
    .checkin{
      margin-top 1rem
    }
    .popup-hold{
      width: 100%
      height:100%
      background #f7faff
      .process{
        padding .66rem .3rem
        margin-top .3rem
        background: #fff
        height:4.16rem
        display: flex
        align-items center
        justify-content flex-start
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
            display flex
            align-items center
            justify-content space-between
            div:first-child{
              width:1.3rem
              font-size .26rem
              color: #161829
            }
            div:last-child{
              width:.75rem
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
      }
      .button{
        button:first-child{
          width:94%;
          display: block
          margin-left auto
          margin-right auto
          box-shadow none
          background: #e8e9f3
          line-height .8rem
          .mint-button-text{
            font-size .32rem
            color: #a0a3b2
          }
        }
        button:last-child{
          width:94%;
          display: block
          margin-left auto
          margin-right auto
          box-shadow none
          background: #33a1ff
          line-height .8rem
          .mint-button-text{
            font-size .32rem
            color: #ffffff
          }
        }
        button.is-disabled{
          background: #e8e9f3;
          .mint-button-text{
            font-size .32rem
            color: #a0a3b2
          }
        }
      }
    }
    .mint-popup-bottom{
      width: 100%
      height auto
      .popup-menu{
        line-height 1rem
        text-align center
        background #ffffff
        border-bottom 1px solid #e2e4e9
        a{
          display: block
          width: 100%
          height: 100%
          color: #000
        }
      }
      .popup-menu:first-child{
        border-top-left-radius:.15rem;
        border-top-right-radius:.15rem;
      }
      .popup-menu:last-child{
        border:none
      }
    }

  }

</style>
