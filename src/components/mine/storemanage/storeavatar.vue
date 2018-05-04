<template>
  <div id="storeavatar">
    <mt-header title="照片切割">
      <mt-button icon="back" slot="left" @click="$back"></mt-button>
      <mt-button slot="right"><label for="ipt">上传图片</label></mt-button>
    </mt-header>
    <input type="file" @change="uploadImg($event)" ref="ipt" id="ipt" style="width: 0;height: 0">
    <img :src="storeInfo.avatarUrl" alt="" style="width: 100%;">
    <mt-popup
      v-model="popupVisible"
      position="right">
      <mt-header title="照片切割">
        <mt-button icon="back" slot="left" @click="$back"></mt-button>
        <mt-button slot="right" @click="cutFinish">完成</mt-button>
      </mt-header>
      <vueCropper v-if="storeInfo"
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
    name: 'storeavatar',
    components: {
      VueCropper
    },
    data () {
      return {
        popupVisible: false,
        storeInfo: {},
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

        }
      }
    },
    mounted () {
      this.$http.get('/store/v1/stores').then(
        res => {
          this.storeInfo = res.data
        }
      )
    },
    methods: {
      uploadImg (e) {
        // 上传图片
        // this.option.img
        let file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        this.popupVisible = true
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
            this.storeInfo.modelSrc = img
            let formData = new FormData()
            formData.append('file', data, 'avatar.png')
            formData.append('type', 'png')
            this.$http.post('/common/v1/files', formData).then(
              res => {
                this.storeInfo.file = res.data.id
                this.upload()
              }
            ).catch(
              err => console.log(err.response.data.message)
            )
          }
        )
      },
      upload () {
        this.$http.post(`/store/v1/stores/${this.storeInfo.file}/avatar`, {id: this.storeInfo.file}).then(
          res => {
            this.$router.push({name: 'storemanage'})
          }
        ).catch(
          erro => {
            this.$toast(erro.response.data.message)
          }
        )
      }
    }
  }
</script>

<style lang="stylus">
  #storeavatar{
    width: 100%
    height: 100%
    position absolute

    .mint-popup{
      width: 100%
      height: 100%
      .popup-menu{
        line-height 1rem
        text-align center
        background #ffffff
      }
      .popup-menu:first-child{
        border-top-left-radius:.15rem;
        border-top-right-radius:.15rem;
        border-bottom 1px solid #e2e4e9
      }
    }
  }

</style>
