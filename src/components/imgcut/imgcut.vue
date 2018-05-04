<template>
  <div id="imgcut">
    <mt-header title="照片切割">
        <mt-button icon="back" slot="left" @click="$back"></mt-button>
      <mt-button slot="right"></mt-button>
    </mt-header>
    <input type="file" @change="uploadImg($event)" ref="ipt" id="ipt">
    <vueCropper
      ref="cropper2"
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
  </div>
</template>

<script>
import VueCropper from 'vue-cropper'
export default {
  name: 'imgcut',
  components: {
    VueCropper
  },
  data () {
    return {
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
  created () {
    this.$nextTick(() => {
    })
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
    }
  }
}
</script>

<style lang="stylus">
  #imgcut{
    width: 100%
    height: 100%
    position absolute
  }

</style>
