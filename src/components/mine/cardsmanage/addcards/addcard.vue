<template>
  <div id="addcard">
    <mt-header title="添加银行卡">
      <mt-button icon="back" slot="left" @click.native="$router.back()"></mt-button>
      <router-link to="" slot="right">
        <mt-button icon="add"></mt-button>
      </router-link>
    </mt-header>
    <div class="addcard-content">
      <p class="content-header">建议绑定商户本人的银行卡</p>
      <div class="list">
        <label class="item">
            <span class="left">银行类型</span> <span class="sp">{{selectedtext}}</span>
          <select name="bankcards" id="bankcards" style="width: 0;height: 0;" v-model="selected">
            <option :value="item.id" v-for="item in bankcards">{{item.name}}</option>
          </select>
          <i class="mint-cell-allow-right"></i>
        </label>
        <label class="item">
          <span class="left">银行卡号</span>
          <mt-field type="number" v-model="cardnum" disableClear></mt-field>
        </label>
        <label class="item">
          <span class="left">持卡人</span>
          <mt-field v-model="username" disableClear></mt-field>
        </label>
      </div>
      <p><mt-checklist
        v-model="value"
        :options="['同意用户协议']">
      </mt-checklist></p>
      <mt-button class="next" @click="next">添加</mt-button>
    </div>
    <mt-popup v-model="carddone" position="right">
      <mt-header title="提示">
        <mt-button icon="back" slot="left" @click.native="welldown"></mt-button>
        <router-link to="" slot="right">
          <mt-button icon="add"></mt-button>
        </router-link>
      </mt-header>
      <div class="pwd-box">
        <img src="../../../../assets/icon/sucess@3x.png" alt="" style="width: .8rem;height: .8rem;margin-bottom: .4rem">
        <p style="color: #333;font-size: .3rem;margin-bottom: 4.95rem">添加银行卡成功</p>
        <mt-button @click="welldown">完成</mt-button>
      </div>
    </mt-popup>
  </div>
</template>

<script>
export default {
  name: 'addcard',
  data () {
    return {
      username: '',
      cardnum: '',
      value: [],
      bankcards: [],
      selected: '',
      selectedtext: '请选择',
      agree: false,
      carddone: false
    }
  },
  watch: {
    selected (n, o) {
      console.log(n)
      this.selectedtext = this.bankcards.filter(
        res => { return res.id === n }
      )[0].name
    },
    value (n, o) {
      if (n.length > 0) {
        this.agree = true
      } else {
        this.agree = false
      }
      console.log(this.agree)
    }
  },
  created () {
  },
  mounted () {
    this.$http.get('/store/v1/bank-cards/types').then(
      res => { this.bankcards = res.data }
    )
  },
  methods: {
    radioFun () {
    },
    next () {
      if (this.agree) {
        this.$http.post('/store/v1/bank-cards', {
          name: this.username,
          bankCode: this.cardnum,
          bankTypeId: this.selected,
          validateCode: this.$route.params.validateCode
        }).then(res => {
          console.log(res.data)
          this.carddone = true
        }).catch(
          erro => this.$toast(erro.response.data.message)
        )
      } else {
        this.$toast('你还未同意用户协议')
      }
    },
    welldown () {
      this.$router.push({name: 'mine'})
    }
  }
}
</script>

<style lang="stylus">
  #addcard{
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
        line-height .82rem
        color: #a0a3b2
        padding-left .3rem
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
          select{
            -webkit-appearance: none
            -moz-appearance: none
            appearance: none
            border-color:#ffffff
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
        margin-top .6rem
      }
    }
    .mint-popup{
      width: 100%
      height:100%

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
        .mint-button--normal{
          width 4rem
          height:.7rem
          background #ffffff
          border:1px solid #33a1ff
          color: #33a1ff
        }
      }

    }
  }

</style>
