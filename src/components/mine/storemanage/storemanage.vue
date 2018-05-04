<template>
  <div id="storemanage">
    <mt-header title="店铺管理">
      <mt-button icon="back"  slot="left" @click="$router.push({name: 'mine'})"></mt-button>
      <mt-button v-if="!(checkflag === 0)" slot="right" @click.native="revise()">申请修改</mt-button>
    </mt-header>
    <div class="state" v-if="checkflag === 0" @click="revise()">
      <img src="../../../assets/icon/hsgth@3x.png" alt="">
      <p>店铺修改信息目前正在审核中，请等待…</p>
      <i class="mint-cell-allow-right"></i>
    </div>
      <div class="popup-content">
        <div class="information">
          <div class="time" style="justify-content: space-between" @click="avatar()">
            <p>店铺头像</p>
            <p style="position: relative"><img :src="storeInfo.avatarUrl" alt="" style="width: .8rem; height: .8rem;"><i class="mint-cell-allow-right sp"></i></p>
          </div>
          <mt-field label="店铺名称" placeholder="请输入店铺名称" type="text" v-model="storeInfo.name" disabled></mt-field>
          <div class="time" @click="changedesc">
            <p>描述</p>
            <p>{{storeInfo.description}}</p>
          </div>
          <mt-field label="店铺地址" placeholder="请选择" type="text" v-model="storeInfo.address" disabled></mt-field>
          <mt-field label="联系电话" placeholder="请输入座机/手机，座机需加区号" type="tel" v-model="storeInfo.phone" disabled></mt-field>
          <mt-field label="经营品类" placeholder="请选择" type="text" v-model="storeInfo.categoryText" :disabled="true"></mt-field>
          <div class="time weeks"  @click="weekpicker">
            <p>营业日</p>
            <p>
              <span v-for="item in storeInfo.weeks">{{item.value}}</span>
            </p>
          </div>
          <div class="time" @click="selecttime">
            <p>营业时间</p>
            <p><span >{{storeInfo.workAt}}</span></p>
            <p><img src="../../../assets/icon/rili@3x.png" alt=""></p>
            <p style="margin-left: 1.3rem"><span>{{storeInfo.workendAt}}</span></p>
            <p><img src="../../../assets/icon/rili@3x.png" alt=""></p>
          </div>
          <div class="time" @click = selectservice>
            <p>提供服务</p>
            <p><span style="margin-right: .1rem" v-for="item in storeInfo.services">{{item.name}}</span></p>
          </div>
        </div >
      </div>
      <div class="popup-content" v-if="desflag">
        <mt-field v-model="destext"></mt-field>
      </div>
  </div>
</template>

<script>
export default {
  name: 'storemanage',
  data () {
    return {
      checkflag: 1,
      storeInfo: {},
      desflag: false,
      pickerVisible: '',
      popuphold: false,
      popbottom: false,
      cpt: true,
      pickerflag: '',
      audit: false,
      workAt: '',
      workendAt: ''
    }
  },
  created () {
    // 获取店铺信息
    this.$http.get('/store/v1/stores').then(
      res => {
        this.storeInfo = res.data
        console.log(this.storeInfo)
      }
    )
    // 检查审核状态
    this.$http.get('/store/v1/stores/info-status').then(
      res => {
        this.checkflag = res.data.status
      }
    )
  },
  methods: {
    avatar () {
      this.$router.push({name: 'storeavatar'})
    },
    revise () {
      this.$router.push({name: 'storechange'})
    },
    scategory () {
      this.commitInfo()
      this.$router.push({name: 'selectcategory'})
    },
    weekpicker () {
      this.$router.push({name: 'storeweeks', params: {page: 'weeks'}})
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
        this.workAt = p
        this.storeInfo.workendAt = this.workendAt
      } else if (this.pickerflag === 2) {
        this.workendAt = p
        this.storeInfo.workendAt = this.workendAt
      }
    },
    selectservice () {
      this.$router.push({name: 'storeweeks', params: { page: 'service' }})
    },
    selecttime () {
      this.$router.push({name: 'storetime'})
    },
    changedesc () {
      this.$router.push({name: 'storedesc'})
    }
  },
  beforeRouteLeave (to, from, next) {
    let self = this
    if (self.popup || self.popbottom) {
      next(false)
      self.popupreset()
    } else {
      next()
    }
  }
}
</script>

<style lang="stylus">
  #storemanage{
    background: #f7faff
    min-height 100vh
    .mint-cell-allow-right.sp:after{
      right:0
    }
    input:disabled{
      background: transparent
    }
    .mint-header{
      height: .88rem
      .mint-header-title{
        font-size .32rem
      }
      .mint-button-text{
        font-size .24rem
      }
    }

    .popup-bottom{
      width:100%;
      height:5rem
    }

    .state{
      background: #ffffff
      height:1.1rem
      display: flex
      padding: .3rem
      align-items center
      position relative
      img{
        width:.35rem
        height:.35rem
        display: block
        margin-right .2rem
      }
    }
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
          white-space: nowrap
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
    .manage-content{
      padding-top .3rem
      .item{
        display: flex
        align-items:center
        justify-content space-between
        padding .3rem
        background: #ffffff
        border-bottom:1px solid #eff1f7
        .item-title{
          color: #a0a3b2
          font-size .26rem
        }
        .item-content{
          font-size .26rem
          color: #000
          padding-right .3rem
          position: relative
          img{
            display block
            width:.8rem
            height:.8rem
          }
          .mint-cell-allow-right::after{
            right:0
          }
        }
      }
      .item:last-child{
        border-bottom none
      }
    }
    .mint-popup{
      width:100%;
      height:100%;
      background: #f7faff
      .popup-content{
        padding-top .3rem
        .mint-cell-wrapper{
          line-height 1.05rem
          padding-left .3rem
          padding-right .3rem
          input[type="text" i]:disabled{
            background: #fff
          }
          .mint-cell-title{
            width:auto
            margin-right .6rem
          }
          .mint-cell-text{
            font-size .26rem
            vertical-align baseline
          }
        }

        .confirm {
          width: 94%;
          background: #00b4fe;
          display: block;
          margin-left: auto;
          margin-right: auto;
          color: #fff;
          border-radius: 0;
          font-size: 0.32rem;
          height: 0.8rem;
          line-height: 0.8rem;
          margin-top: 1.05rem;
          margin-bottom: 0.18rem;
          box-shadow none
        }
      }
    }
    .mint-popup.mint-popup-bottom{
      height: auto
    }
  }
</style>
