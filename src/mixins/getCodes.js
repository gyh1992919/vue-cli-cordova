/**
 * Created by Administrator on 2018/5/11.
 */

//mixin
const styling = {
  opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
  backgroundColor: '#000000', // make sure you use #RRGGBB. Default #333333
  textColor: '#FFFFFF', // Ditto. Default #FFFFFF
  textSize: 14, // Default is approx. 13.
  cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
  horizontalPadding: 30, // iOS default 16, Android default 50
  verticalPadding: 30 // iOS default 12, Android default 30
}
const Tooltip  = {
  data () {
    return {
      buttonText: '获取验证码',
      buttonDisable: false,
      number: 10
    }
  },
  methods: {
    async getCode(getCodeApi) {

      this.countDown()
      await getCodeApi.then(res => {
        const {message} = res.data
        window.plugins.toast.showWithOptions({
          message: message,
          duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
          position: "center",
          styling: styling
        });
        console.log(res)
      }).catch(err => {
        const {message} = err.response.data
        window.plugins.toast.showWithOptions({
          message: message,
          duration: "short", // which is 2000 ms. "long" is 4000. Or specify the nr of ms yourself.
          position: "center",
          styling: styling
        });
      })
    },
    countDown() {
      this.buttonText = `(${this.number}s)重新获取`
      this.buttonDisable = true
      const timer = setInterval(() => {
        this.number --
        if (this.number > 0) {
          this.buttonText = `(${this.number}s)重新获取`
          this.buttonDisable = true
        } else {
          this.buttonText = '获取验证码'
          this.buttonDisable = false
          clearInterval(timer)
          this.number = 10
        }
      }, 1000)
    }
  }
}

export default Tooltip
