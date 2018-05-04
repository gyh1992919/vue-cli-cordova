<template>
  <div id="fgsetpwd">
    <mt-header title="设置支付密码">
      <mt-button icon="back" slot="left"></mt-button>
      <router-link to="" slot="right">
        <mt-button icon="add"></mt-button>
      </router-link>
    </mt-header>
    <div class="pwd-box" v-if="fstdis">
      <h1>设置支付密码：</h1>
      <h3>请输入支付密码,完成修改支付密码</h3>
      <div class="write-input">
        <input type="password"  ref="input1" maxlength="6" class="realInput" v-model="realInput1" autofocus >
      </div>
    </div>

    <mt-popup v-if="!fstdis" v-model="vis" position="right">
      <mt-header title="设置支付密码">
        <mt-button icon="back" slot="left" @click.native=""></mt-button>
        <router-link to="" slot="right">
          <mt-button icon="add"></mt-button>
        </router-link>
      </mt-header>
      <div class="pwd-box">
        <h1>重新输入密码：</h1>
        <h3>再次输入密码，保证密码一致</h3>
        <div class="write-input">
          <input type="password"  ref="input2" maxlength="6" class="realInput" v-model="realInput2" autofocus >
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import '../../../../assets/icon/iconfont.css'
  export default {
    name: 'fgsetpwd',
    data () {
      return {
        realInput1: '',
        realInput2: '',
        fstdis: true,
        vis: !this.fstdis,
        carddone: false
      }
    },
    watch: {
      realInput1 (n, o) {
        console.log(n)
        if (n.length === 6) {
          this.fstdis = false
        }
      },
      realInput2 (n, o) {
        console.log(n)
        if (n.length === 6 && this.realInput1 === this.realInput2) {
          this.nextStep()
        } else if (n.length === 6) {
          this.consoleErr()
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
      nextStep () {
        this.$http.post('/store/v1/ext-passwords/update-password', {
          password: this.realInput1,
          rePassword: this.realInput2,
          validateCode: this.$route.params.validateCode
        }).then(res => {
          this.$toast({
            message: '操作成功',
            iconClass: 'iconfont icon-selected',
            duration: 1000
          })
          this.$router.push({name: 'setting'})
        }).catch(erro => {
          this.$toast(erro.response.data.message)
        })
      },
      consoleErr () {
        this.$toast({
          message: '两次输入密码不一致',
          duration: 1000
        })
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
  #fgsetpwd{
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
