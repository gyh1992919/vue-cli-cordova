<template>
  <div id="addfd">
    <mt-header title="添加福袋">
      <mt-button icon="back" slot="left" @click.native = $back></mt-button>
      <mt-button slot="right"></mt-button>
    </mt-header>
    <div class="addfd-info">
      <p><img src="../../assets/icon/hsgth@3x.png" alt="">请按照下面信息提示，依次填写相关福袋信息</p>
      <p>提示一：红包金额默认设置区间在2~200元之间，超过将无法进行</p>
      <p>提示二：红包数量设置区间在100~500个之间，否则将无法进行活动</p>
    </div>
    <div class="datepick">
      <p>红包区间 <input type="number" placeholder="输入金额" v-model="fudaiInfo.minValue">-<input type="number" placeholder="输入金额" v-model="fudaiInfo.maxValue">元</p>
      <p>红包数量 <input type="number" placeholder="请输入红包个数" v-model="fudaiInfo.number">个</p>
      <p>活动截止 <input type="date" placeholder="开始时间" v-model="fudaiInfo.activityAt">-<input v-model="fudaiInfo.activityEndAt" type="date"></p>
      <p>有效时间 <input type="date" v-model="fudaiInfo.effectiveAt">-<input type="date" v-model="fudaiInfo.effectiveEndAt"></p>
      <p>每人限领 <input type="number" v-model="fudaiInfo.limitNum" placeholder="请输入限领张数">张</p>
      <p>使用门槛 <input type="number" placeholder="请输入金额" v-model="fudaiInfo.attainAmount">元</p>
    </div>
    <mt-button class="next" @click.native = nextStep()>下一步</mt-button>
    <mt-popup v-model="popup">
      <mt-header title="添加福袋">
          <mt-button icon="back" slot="left" @click = "popup = false"></mt-button>

        <mt-button slot="right"></mt-button>
      </mt-header>
      <div class="addimg">
        <div class="addimg1">
          <mt-field label="活动描述" placeholder="请输入活动描述" v-model="fudaiInfo.title"></mt-field>
          <div class="addinfo">
            <p style="margin-bottom: .2rem">消费须知(点击下方消费须知可编辑)</p>
            <p  ><textarea placeholder="" v-model="consumeNotes"></textarea></p>
          </div>
          <div style="width: 2.1rem;height: 1.6rem;position: relative;">
            <input type="file" @click="popphoto=true"  @change="uploadImg($event)" class="uploadimg" style="width: 2.1rem;height: 1.6rem;opacity: 0;position: absolute;">
            <img :src="fudaiInfo.modelSrc" alt="" style="width: 2.1rem;height: 1.6rem;">
          </div>
        </div>
      </div>
      <mt-button class="done" @click="jobdone">完成</mt-button>
    </mt-popup>
    <mt-popup v-model="popphoto">
      <mt-header title="照片切割">
          <mt-button icon="back" slot="left" @click="cutCancel">取消</mt-button>
        <mt-button slot="right" @click="cutFinish">完成</mt-button>
      </mt-header>
      <vueCropper
        ref="cropper"
        :img="options.img"
        :outputSize="options.size"
        :outputType="options.outputType"
        :info="options.info"
        :canScale="options.canScale"
        :autoCrop="options.autoCrop"
        :autoCropWidth="options.autoCropWidth"
        :autoCropHeight="options.autoCropHeight"
        :fixed="options.fixed"
        :fixedNumber="options.fixedNumber"
      ></vueCropper>
    </mt-popup>
  </div>
</template>

<script>
  import VueCropper from 'vue-cropper'
  export default {
    name: 'addfd',
    components: {
      VueCropper
    },
    data () {
      return {
        fudaiInfo: {},
        popup: false,
        popphoto: false,
        options: {
          img: '',
          info: true,
          size: 1,
          outputType: 'jpeg',
          canScale: false,
          autoCrop: true,
          // 只有自动截图开启 宽度高度才生效
          autoCropWidth: 300,
          autoCropHeight: 250,
          // 开启宽度和高度比例
          fixed: true,
          fixedNumber: [4, 3]
        },
        messages: '',
        job: true
      }
    },
    created () {
      // 测试storei数据
      if (this.$route.params.change) {
        this.fudaiInfo = this.$store.state.Wallet
        this.fudaiInfo.activityAt = this.fudaiInfo.activityAt.slice(0, 10)
        this.fudaiInfo.activityEndAt = this.fudaiInfo.activityEndAt.slice(0, 10)
        this.fudaiInfo.effectiveAt = this.fudaiInfo.effectiveAt.slice(0, 10)
        this.fudaiInfo.effectiveEndAt = this.fudaiInfo.effectiveEndAt.slice(0, 10)
      }
      if (this.fudaiInfo.walletImg) {
        this.fudaiInfo.modelSrc = this.fudaiInfo.walletImg
      } else {
        this.fudaiInfo.modelSrc = 'data:image/png;base64,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dwAAAAYh3AEAABiEcAcAAGAQwh0AAIBBCHcAAAAGIdwBAAAYhHAHAABgEMIdAACAQQh3AAAABiHcAQAAGIRwBwAAYBDCHQAAgEEIdwAAAAYh3AEAABiEcAcAAGAQwh0AAIBBCHcAAAAGIdwBAAAYhHAHAABgEMIdAACAQQh3AAAABiHcAQAAGIRwBwAAYBDCHQAAgEEIdwAAAAYh3AEAABiEcAcAAGAQwh0AAIBBCHcAAAAGIdwBAAAYhHAHAABgEMIdAACAQQh3AAAABiHcAQAAGIRwBwAAYBDCHQAAgEEIdwAAAAYh3AEAABiEcAcAAGAQwh0AAIBBCHcAAAAGIdwBAAAYhHAHAABgEMIdAACAQQh3AAAABiHcAQAAGIRwBwAAYBDCHQAAgEEIdwAAAAYh3AEAABiEcAcAAGAQwh0AAIBBCHcAAAAGIdwBAAAYhHAHAABgEMIdAACAQQh3AAAABiHcAQAAGIRwBwAAYBDCHQAAgEEIdwAAAAYh3AEAABiEcAcAAGAQwh0AAIBBCHcAAAAGIdwBAAAYhHAHAABgEMIdAACAQQh3AAAABiHcAQAAGIRwBwAAYBDCHQAAgEEIdwAAAAYh3AEAABiEcAcAAGAQwh0AAIBBCHcAAAAGIdwBAAAYhHAHAABgEMIdAACAQQh3AAAABiHcAQAAGIRwBwAAYBDCHQAAgEEIdwAAAAYh3AEAABiEcAcAAGAQwh0AAIBBCHcAAAAGIdwBAAAYhHAHAABgEMIdAACAQQh3AAAABiHcAQAAGIRwBwAAYBDCHQAAgEEIdwAAAAYh3AEAABiEcAcAAGAQwh0AAIBBCHcAAAAGIdwBAAAY5GZJByRdS3YhAAAAmLF3/j/U5ArCBoTOawAAAABJRU5ErkJggg=='
      }
    },
    mounted () {
      this.consumeNotes = this.$http.get('/store/v1/stores').then(
        res => {
          this.consumeNotes = res.data.consumeNotes
        }
      )
    },
    methods: {
      nextStep () {
        if (!this.fudaiInfo.minValue || this.fudaiInfo.minValue < 2 || this.fudaiInfo.minValue > 200) {
          this.$toast('请输入正确的红包金额')
        } else if (!this.fudaiInfo.maxValue || this.fudaiInfo.maxValue < 2 || this.fudaiInfo.maxValue > 200) {
          this.$toast('请输入正确的红包金额')
        } else if (!this.fudaiInfo.number || this.fudaiInfo.number < 100 || this.fudaiInfo.number > 500) {
          this.$toast('请输入正确的红包数量')
        } else if (!this.fudaiInfo.activityAt || !this.fudaiInfo.activityEndAt || !this.fudaiInfo.effectiveAt || !this.fudaiInfo.effectiveEndAt) {
          this.$toast('请选择正确的活动日期和有效时间')
        } else if (!this.fudaiInfo.limitNum) {
          this.$toast('请输入限领张数')
        } else if (!this.fudaiInfo.attainAmount) {
          this.$toast('请输入使用门槛金额')
        } else {
          this.popup = true
        }
      },
      uploadImg (e) {
        // 上传图片
        // this.option.img
        console.log(e)
        let file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        let reader = new FileReader()
        reader.onload = (e) => {
          let data
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          this.options.img = data
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file)
      },
      cutFinish () {
        this.$refs.cropper.getCropBlob(
          (data) => {
            let img = window.URL.createObjectURL(data)
            this.fudaiInfo.modelSrc = img
            this.popphoto = false
            let formData = new FormData()
            formData.append('file', data, 'avatar.png')
            console.log(formData)
            formData.append('type', 'png')
            this.$http.post('/common/v1/files', formData).then(
              res => { this.fudaiInfo.file = res.data.id }
            ).catch(
              error => this.$toast(error.response.data.message)
            )
          }
        )
      },
      cutCancel () {
        this.popphoto = false
      },
      jobdone () {
        this.job = false
        if (!this.consumeNotes) {
          this.$toast('请填写消费须知')
        } else if (!this.fudaiInfo.title) {
          this.$toast('请填写活动描述')
        } else if (!this.fudaiInfo.file && !this.fudaiInfo.walletImg) {
          this.$toast('请上传活动滚动图')
        } else {
          this.fudaiInfo.describe = this.consumeNotes
          this.$store.dispatch('walletinfochange', this.fudaiInfo)
          this.$router.push({name: 'fudai'})
        }
      },
      ci () {
      }
    },
    beforeRouteLeave (to, from, next) {
      if (this.popphoto) {
        next(false)
        this.popphoto = false
      } else if (this.popup && this.job) {
        next(false)
        this.popup = false
      } else {
        next()
      }
    }
  }
</script>

<style lang="stylus">
  .mint-toast{
    z-index 9999
  }
  #addfd{
    background #f7faff
    input{
      display inline-block
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

    .addfd-info{
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
      margin-bottom .2rem
    }
    .datepick{
      background: #ffffff
      padding-top .4rem
      padding-left .3rem
      padding-right .3rem
      padding-bottom .01rem
      p{
        line-height .75rem
        margin-bottom .5rem
        font-size .26rem
        color: #a0a3b2
        input{
          border:1px solid #eff1f7
          line-height .75rem
          font-size .24rem
          padding-left .2rem
        }
        input:first-child{
          margin-left .3rem
        }
      }
      p:first-child{
        input{
          width:2.3rem
          margin-left .15rem
          margin-right .15rem

        }
        input:first-child{
          margin-left .3rem
        }
      }
      p:nth-child(2) {
        input{
          width: 5.04rem
          margin-right .15rem
        }
      }
      p:nth-child(3){
        input{
          width 2.35rem
          margin-left .3rem
        }
        input:first-child{
          margin-right .3rem
        }
      }
      p:nth-child(4){
        input{
          width 2.35rem
          margin-left .3rem
        }
        input:first-child{
          margin-right .3rem
        }
      }
      p:nth-child(5) {
        input{
          width: 5.04rem
          margin-right .15rem
        }
      }
      p:nth-child(6) {
        input{
          width: 5.04rem
          margin-right .15rem
        }
      }
    }
    .next{
      width: 94%
      background: #33a1ff
      display: block
      margin-left auto
      margin-right auto
      color: #ffffff
      border-radius 0
      font-size .32rem
      height:.8rem
      line-height .8rem
      margin-top .7rem
      margin-bottom .18rem
    }
    .mint-popup{
      width:100%;
      height:100%
      background: #f7faff
      .addimg{
        margin-top .3rem
        padding-top .3rem
        padding-left .3rem
        padding-right .3rem
        padding-bottom .48rem
        background: #fff
        .mint-cell-wrapper{
          padding: 0
        }
        .mint-cell-text{
          font-size .26rem
          color: #a0a3b2
        }
        .mint-cell-value{
          font-size .26rem
        }
        .mint-field-core{
          font-size .26rem
        }
      }
      .done{
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
        margin-top 1.05rem
        margin-bottom .18rem
      }
      .addinfo{
        textarea{
          border:none
          font-size .24rem
          line-height .42rem
          color: #cbccd1
          width 100%
          height 5.7rem
        }
      }
    }
  }

</style>
