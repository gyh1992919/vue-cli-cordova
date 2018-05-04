<template>
  <div id="login">
    <div class="colorfix" >
      <div class="loginarea">
        <div class="inputarea">
          <div class="inputarea-user">
            <input type="text" placeholder="请输入手机号" v-model="userInfo.phone">
            <img class="inputarea-icon" src="../../assets/icon/phone@3x.png" alt="" >
          </div>
          <div class="inputarea-password">
            <input type="number" placeholder="请输入验证码" v-model="userInfo.code">
            <img class="inputarea-icon"  src="../../assets/icon/lock@3x.png" alt="" >
            <button @click="clickedFun(60)" :disabled="clicked" class="verification" :class="{ 'clicked': clicked}">发送验证码 <span v-if="clicked">{{sendMseDisabled}}s</span> </button>
          </div>
          <button @click="login" :disabled="!(userInfo.phone && userInfo.code)">登录</button>
        </div>
        <div class="bottom">
          <p>纸象优惠 V20.0正式版</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
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
    created () {
    },
    methods: {
      login () {
        this.$http.post('/common/v1/accounts/login', this.userInfo).then(
          res => {
            console.log(res.data)
            console.log(res.data.store)
            this.$store.dispatch('login', res.data)
            if (res.data.store && res.data.store.status === 1 && res.data.store.step === 0) {
              this.$store.dispatch('storeinfochange', res.data.store)
              this.$router.push({name: 'register', params: { register: 'success' }})
            } else if (res.data.store && res.data.store.status === 0) {
              this.$store.dispatch('storeinfochange', res.data.store)
              this.$router.push({name: 'register', params: { register: 'holdon' }})
            } else if (res.data.store && res.data.store.status === 1 && res.data.store.step === 1) {
              this.$store.dispatch('storeinfochange', res.data.store)
              this.$router.push({name: 'home'})
            } else {
              this.$router.push({name: 'register'})
            }
          }
          ).catch(err => {
            console.log(err.response.data.message)
            this.$toast({
              message: err.response.data.message,
              position: 'top',
              duration: 3000
            })
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

    #login
      width:100%;
      height:100vh;
      position: relative
      .colorfix
        background: #031425
        background-image: url("../../assets/images/login_bg.jpg")
        background-size: 375px 360px;
        height: 100%
        width: 100%
        background-position: center top
      .bottom{
        padding-top:1.5rem
        p{
            color #a0a3b2
            line-height .75rem
            font-size .2rem
            background: #f7faff
            text-align center
          }
        }
        .loginarea
          position: absolute
          bottom: 0
          left: 0
          width: 100%
          padding-left .3rem
          padding-right .3rem
          padding-top 1.1rem
          border-top-left-radius:.16rem
          border-top-right-radius:.16rem
          background #ffffff
          .inputarea
            padding-left .3rem
            padding-right .3rem
            .inputarea-user,.inputarea-password{
              position: relative
            }
            .inputarea-icon{
              width:.2rem;
              height:.28rem;
              position: absolute
              left:0;
              top:.28rem;
            }
            .verification{
              position: absolute;
              right:0
              top:.2rem
              width:1.62rem
              height:.45rem
              line-height:.45rem;
              border-radius .1rem
              color: #33a1ff
              border:1px solid #33a1ff
              background #ffffff
              font-size:.22rem
            }
            .verification.clicked{
              width:2rem
              color: #a0a3b2
              border:1px solid #a0a3b2
              background #ffffff
            }
            input
              width 100%
              height .85rem
              line-height .85rem
              font-size .26rem
              text-indent .48rem
              border-bottom 1px solid #ebedf3
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
            input:first-child
              margin-bottom .3rem
            input:nth-child(2)
              margin-bottom .9rem
            button
              width 100%
              height .85rem
              background: #33a1ff
              color #fff
              border-radius .1rem
            button[disabled]
              background #cccccc

</style>
