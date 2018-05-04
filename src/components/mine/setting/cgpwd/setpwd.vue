<template>
  <div id="setpwd">
    <mt-header title="修改支付密码">
      <mt-button icon="back" slot="left" @click="$router.back()"></mt-button>
      <router-link to="" slot="right">
        <mt-button icon="add"></mt-button>
      </router-link>
    </mt-header>
    <div class="pwd-box">
          <h1>修改支付密码：</h1>
          <h3>请输入旧支付密码，完成身份验证</h3>
          <div class="write-input">
            <input type="password"  ref="input1" maxlength="6" class="realInput" v-model="realInput1" autofocus >
          </div>
    </div>

    <mt-popup v-model="step2" position="right">
      <mt-header title="修改支付密码">
        <mt-button icon="back" slot="left" @click.native="$router.back()"></mt-button>
        <router-link to="" slot="right">
          <mt-button icon="add"></mt-button>
        </router-link>
      </mt-header>
      <div class="pwd-box">
        <h1>输入新支付密码：</h1>
        <h3>输入新支付密码，完成修改密码</h3>
        <div class="write-input">
          <input type="password"  ref="input2" maxlength="6" class="realInput" v-model="realInput2" autofocus >
        </div>
      </div>
    </mt-popup>
    <mt-popup v-model="step3" position="right">
      <mt-header title="修改支付密码">
        <mt-button icon="back" slot="left" @click.native="$router.back()"></mt-button>
          <mt-button icon="add" slot="right"></mt-button>
      </mt-header>
      <div class="pwd-box">
        <h1>重新输入新支付密码：</h1>
        <h3>再次输入新密码，保证密码一致</h3>
        <div class="write-input">
          <input type="password"  ref="input3" maxlength="6" class="realInput" v-model="realInput3" autofocus >
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import '../../../../assets/icon/iconfont.css'
export default {
  name: 'setpwd',
  data () {
    return {
      realInput1: '',
      realInput2: '',
      realInput3: '',
      step2: false,
      step3: false
    }
  },
  watch: {
    realInput1 (n, o) {
      console.log(n)
      if (n.length === 6) {
        this.getValidate()
      }
    },
    realInput2 (n, o) {
      console.log(n)
      if (n.length === 6) {
        this.step3 = true
      }
    },
    realInput3 (n, o) {
      if (n.length === 6) {
        if (this.realInput2 === this.realInput3) {
          this.changepassword()
        } else {
          this.$toast('您两次输入密码不一致，请重新输入！')
        }
      }
    }
  },
  created () {
    console.log(this.vis)
  },
  methods: {
    goPay () {
      console.log(this.realInput)
    },
    changepassword () {
      this.$http.post('/store/v1/ext-passwords/update-password', {
        password: this.realInput2,
        rePassword: this.realInput3,
        validateCode: this.validateCode
      }).then(res => {
        console.log(res.data)
        this.$toast('密码修改成功！')
        this.$router.push({name: 'mine'})
      }).catch(erro => {
        this.$toast(erro.response.data.message)
      })
    },
    nextStep () {
      this.$toast({
        message: '操作成功',
        iconClass: 'iconfont icon-selected'
      })
    },
    consoleErr () {
      this.$toast({
        message: '两次输入密码不一致'
      })
    },
    getValidate () {
      this.$http.post('/store/v1/ext-passwords/validate', {
        oldPassword: this.realInput1
      }).then(res => {
        this.validateCode = res.data.validateCode
        this.step2 = true
      }).catch(
        erro => {
          this.$toast(erro.response.data.message)
        }
      )
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.step3) {
      if (to.name === 'mine') {
        next()
        return false
      }
      next(false)
      this.step3 = false
    } else if (this.step2) {
      next(false)
      this.step2 = false
    } else {
      next()
    }
  }
}
</script>

<style lang="stylus">
  .mint-toast{
    z-index: 9000
    .mint-toast-icon{
      font-size .56rem
    }
  }
  #setpwd{
    .mint-popup{
      width: 100%
      height:100vh
    }
    background: #f7faff
    height 100vh

    .mint-header{
      height: .88rem
      .mint-header-title{
        font-size .32rem
      }
      .mint-button-text{
        font-size .24rem
      }
    }

    .pwd-box{
      text-align center
      padding-top 1.5rem
      h1{
        font-size .48rem
        color: #000
        font-weight 500
        margin-bottom .3rem
      }
      h3{
        color: #c1c4d5
        font-size .24rem
        font-weight:normal
        margin-bottom 1rem
      }
      .realInput{
        /* Keyword values */
        -webkit-appearance: none;
        resize: none;
        outline: none;
        border: 0;
        width: 5.51rem;
        height: .9rem;
        line-height .9rem
        background: none;
        display: block;
        margin-left auto
        margin-right auto
        text-align: center;
        border-bottom: 1px solid #33a1ff;
      }
      .mint-button--normal{
        width 4rem
        height:.7rem
        background #ffffff
        border:1px solid #33a1ff
        color: #33a1ff
      }
    }

  }

</style>
