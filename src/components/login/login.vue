<template>
  <div id="login">
    <div class="colorfix" >
      <div class="loginarea">
        <div class="inputarea">
          <div class="inputarea-user">
            <div class="inputarea-icon"></div>
            <input type="text" placeholder="请输入手机号" v-model="userInfo.phone">
          </div>
          <div class="inputarea-password">
            <div class="code-icon"></div>
            <input type="number" placeholder="请输入验证码" v-model="userInfo.code">
            <mt-button size="small"  @click="reqCode" :disabled="buttonDisable"  class="verification" >{{buttonText}}</mt-button>
          </div>
          <div class="confirm-btn">
            <mt-button @click="login" :disabled="!(userInfo.phone && userInfo.code)" class="btn">登录</mt-button>
          </div>
        </div>
        <div class="bottom">
          <p>纸象优惠 V20.0正式版</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import getCodes from '@/mixins/getCodes'
  import { Toast } from 'mint-ui';
  export default {
    name: 'login',
    mixins: [getCodes],
    data () {
      return {
        userInfo: {
          phone: '',
          code: '',
          loginType: 2
        },
        clicked: false,
        sendMember: true,
        sendMseDisabled: 0
      }
    },
    methods: {
      reqCode() {
          let api =  this.$http.post('/common/v1/login-codes', this.userInfo.phone)
          this.getCode(api)
      },
      async login () {
        this.$http.post('/common/v1/accounts/login', this.userInfo)
          .then(res => {
              const {token} = res.data
              localStorage.setItem("token", token);
          })
          .catch(err => {
            const {message} = err.response.data
            window.plugins.toast.showWithOptions({message: message});
          })
      },
      clickedFun (s) {
        if (this.userInfo.phone.length === 11) {
          this.clicked = !this.clicked
          this.$http.post('/common/v1/login-codes', this.userInfo).then(
            res => { this.$toast('登录成功') }
          ).catch(err => {
            console.log(err.response.data.message)
            this.$toast({
              message: err.response.data.message,
              position: 'top',
              duration: 3000
            })
          })
        } else {
          this.$toast({
            message: '请输入正确的手机号码',
            position: 'top',
            duration: 3000
          })
        }
        this.sendOver(s)
      },
      sendOver (sendMseDisabled) {
        if (sendMseDisabled === 0) {
          this.clicked = false
          return false
        } else {
          sendMseDisabled--
        }
        this.sendMseDisabled = sendMseDisabled
        setTimeout(() => {
          this.sendOver(sendMseDisabled)
        }, 1000)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../stylus/mixin.styl"
    #login
      width:100%;
      height:100vh;
      position: relative;
      .colorfix
        background: #031425
        background-image: url("../../assets/images/login_bg.jpg")
        background-size: 750px 720px;
        height: 100%
        width: 100%
        background-repeat: no-repeat
        background-position: center top
        .bottom
          position: absolute
          bottom: 0
          width: 100%
          height: 74px
          line-height: 74px
          font-size: 20px
          color: #161829
          background: #f7faff
          text-align: center
        .loginarea
          position: absolute
          bottom: 0
          left: 0
          width: 100%
          height: 577px
          padding-top 1.1rem
          border-radius: 20px
          background #ffffff
          .inputarea
            margin: 90px 72px 168px 77px
            .inputarea-user,.inputarea-password
              position: relative
              display: flex
              align-items: center
              border-bottom 1px solid #ebedf3
            .inputarea-password
              margin-top: 40px
            .inputarea-icon
              width: 19px
              height: 28px
              display: inline-block
              background-size: 19px 28px
              bg-image('../../assets/icon/login-phone')
            .code-icon
              width: 22px
              height: 28px
              display: inline-block
              background-size: 22px 28px
              bg-image('../../assets/icon/code')
            .verification
              font-size: 24px
              height: 45px
              line-height: 45px
              border: 1px solid #5cb4ff
              color: #5cb4ff
              background-color: transparent
              border-radius: 10px
            .verification[disabled]{
              color: #a0a3b2
              border-color: #a0a3b2
            }
            input
              width 100%
              height .85rem
              line-height .85rem
              font-size 26px
              margin-left: 30px
              flex: 1
            input::-webkit-input-placeholder { /* WebKit browsers */
              color:    #cccccc;
                }
            input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
              color:    #cccccc;
            }
            input::-moz-placeholder { /* Mozilla Firefox 19+ */
              color:    #cccccc;
            }
            input:-ms-input-placeholder { /* Internet Explorer 10+ */
              color:    #cccccc;
            }
            .confirm-btn
              margin-top: 70px
              .btn
                width 100%
                border-radius: 10px
                height: 80px
                color #fff
                font-size: 24px
                line-height: 80px
                background-image: linear-gradient( 15deg, rgb(0,180,254) 1%,rgb(51,161,255) 100%);
                box-shadow: 0 -1px 20px rgba(51,161,255, 0.4)
                border: none
              .btn[disabled]
                opacity: 0.5

</style>
