<template>
  <div id="relieve">
    <mt-header title="解除银行卡">
      <mt-button icon="back" slot="left" @click.native="$router.push({name:'mine'})"></mt-button>
      <router-link to="" slot="right">
        <mt-button icon="add"></mt-button>
      </router-link>
    </mt-header>
    <div class="pwd-box">
      <h1>请输入安全密码：</h1>
      <h3>解除绑定银行卡前，请先验证安全密码</h3>
      <div class="write-input">
        <input type="password"  ref="input" maxlength="6" class="realInput" v-model="realInput" autofocus >
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'relieve',
    data () {
      return {
        realInput: '',
        cardId: {}
      }
    },
    created () {
    },
    mounted () {
      this.cardId = this.$route.params.id
    },
    methods: {
      validate () {
        this.$http.post('/store/v1/ext-passwords/validate', {oldPassword: this.realInput}).then(
          res => {
            this.validateCode = res.data.validateCode
            this.del()
          }).catch(erro => { this.$toast(erro.response.data.message) })
      },
      del () {
        this.$http.post(`/store/v1/bank-cards/${this.cardId}/del`, {
          id: this.cardId,
          validateCode: this.validateCode
        }).then(res => {
          console.log(res)
          this.$toast('删除成功')
          this.$router.push({name: 'mine'})
        }).catch(
          erro => this.$toast(erro.response.data.message)
        )
      }
    },
    watch: {
      realInput (n, o) {
        console.log(n)
        if (n.length === 6) {
          this.validate()
        }
      }
    }
  }
</script>

<style lang="stylus">
  #relieve{
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
      p
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
    }

  }

</style>
