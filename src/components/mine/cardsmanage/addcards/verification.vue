<template>
  <div id="verification">
    <mt-header title="身份验证">
      <mt-button icon="back" slot="left" @click="$router.back()"></mt-button>
      <router-link to="" slot="right">
        <mt-button icon="add"></mt-button>
      </router-link>
    </mt-header>
    <div class="addcard-content">
      <p class="content-header">首次设置安全密码，需要验证，您的当前绑定手机号是：{{phone.slice(0,3)}}*****{{phone.slice(7,11)}}，
        请按提示操作</p>
      <div class="list">
        <div class="item">
          <span class="left">验证码</span>
          <mt-field type="number" placeholder="请输入验证码" v-model="code" disableClear></mt-field>
          <div class="verification" :class="{ 'clicked': clicked}"> <span v-if="clicked">{{sendMseDisabled}}s</span> </div>
        </div>
      </div>
      <mt-button class="next"  @click="clickedFun(60)" v-if="gain">获取验证码</mt-button>

      <mt-button class="next" v-if="!gain" :disabled="!code" @click="test()">确认</mt-button>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'verification',
    data () {
      return {
        gain: true,
        phone: '',
        code: '',
        clicked: false,
        sendMember: true,
        sendMseDisabled: 0
      }
    },
    created () {
      this.phone = this.$store.state.Logined.phone
    },
    methods: {
      clickedFun (s) {
        this.$http.post('/common/v1/auth-codes', {
          phone: this.phone,
          type: 2
        }).then(res => {
          this.$toast(res.data.message)
          this.clicked = !this.clicked
          this.gain = !this.gain
          this.sendOver(s)
        }).catch(
          error => {
            console.log(error.response.data.message)
            this.$toast(error.response.data.message)
          }
        )
      },
      sendOver (sendMseDisabled) {
        if (sendMseDisabled === 0) {
          this.clicked = false
          this.gain = true
          return false
        } else {
          sendMseDisabled--
        }
        this.sendMseDisabled = sendMseDisabled
        setTimeout(() => {
          this.sendOver(sendMseDisabled)
        }, 1000)
      },
      test () {
        console.log(this.clicked)
        this.$http.post('/store/v1/ext-passwords/validate-create', {code: this.code}).then(
          res => {
            console.log(res.data)
            this.$router.push({name: 'setpassword', params: {validateCode: res.data.validateCode, phone: this.phone}})
          }
        ).catch(
          err => {
            this.$toast(err.response.data.message)
          }
        )
      }
    }
  }
</script>

<style lang="stylus">
  #verification{
    .mint-header{
      height: .88rem
      .mint-header-title{
        font-size .32rem
      }
      .mint-button-text{
        font-size .24rem
      }
    }

    background: #f7faff
    height 100vh
    .addcard-content{
      .mint-cell{
        background transparent
      }
      .content-header{
        line-height .35rem
        color: #a0a3b2
        padding .3rem
      }
      .list{
        padding-left .3rem
        padding-right .3rem
        background: #fff

        .item{
          display: flex
          position: relative
          line-height .85rem
          border-bottom 1px solid #eff1f7
          .left{
            width:1.15rem
          }
          .verification{
            background: transparent
            span{
              width:1.4rem
              text-align center
            }
            button[disabled]{
              background #cccccc
            }
          }
          .mint-cell-allow-right::after{
            right:.05rem
            width: .1rem
            height: .1rem
          }
          span{
            display block
          }
          .sp{
            margin-left .5rem
            color: #c1c4d5
          }
          .mint-field{
            width: 5rem
          }
        }
        .item:last-child{
          border-bottom:none
        }
      }
      .mint-checkbox-core{
      }
      .mint-checkbox-label{
        color: #33a1ff
        font-size .24rem
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
        margin-top 3rem
      }

    }
  }

</style>
