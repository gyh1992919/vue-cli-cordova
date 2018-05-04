<template>
  <div id="storeweeks">
    <div class="popup-content">
      <mt-header :title="title">
        <mt-button icon="back" slot="left" @click = $router.go(-1)></mt-button>
        <mt-button slot="right"></mt-button>
      </mt-header>
      <div v-if="render">
        <mt-checklist
          align="right"
          v-model = "weekvalue"
          :options = options>
        </mt-checklist>
      </div>
      <mt-button class="confirm" @click = commit()>确认</mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'storeweeks',
    data () {
      return {
        title: '',
        options: [],
        weekvalue: [],
        storeInfo: {},
        services: [],
        servicestext: [],
        weeks: [],
        weekstext: [],
        render: false
      }
    },
    created () {
      // 获取店铺信息
      this.$http.get('/store/v1/stores').then(
        res => {
          this.storeInfo = res.data
          console.log(this.storeInfo)
        }
      )
      // 判断来源，获取数据
      this.getData()
    },
    methods: {
      getData () {
        if (this.$route.params.page) {
          if (this.$route.params.page === 'service') {
            this.title = '提供服务'
            this.$http.get('/store/v1/store-manages/services').then(
              res => {
                this.services = res.data
                let _options = []
                this.services.map((item, index) => {
                  _options[index] = {label: item.name, value: item.id}
                })
                this.options = _options
              }
            )
          } else {
            this.title = '营业日'
            this.$http.get('/store/v1/store-manages/weeks').then(
              res => {
                this.weeks = res.data
                let _options = []
                this.weeks.map((item, index) => {
                  _options[index] = {label: item.value, value: item.key}
                })
                this.options = _options
              }
            )
          }
        }
      },
      commit () {
        if (this.$route.params.page === 'weeks') {
          if (this.weekvalue.length > 0) {
            this.$http.put(`/store/v1/stores/${this.storeInfo.id}/weeks`, {
              id: this.storeInfo.id,
              weeks: this.weekvalue
            }).then(
              () => this.$router.push({name: 'storemanage'})
            ).catch(
              erro => this.$toast(erro.response.data.message)
            )
            // 提交信息
          } else {
            this.$toast('请选择营业日')
          }
        } else {
          if (this.weekvalue.length > 0) {
            this.$http.put(`/store/v1/stores/${this.storeInfo.id}/services`, {
              id: this.storeInfo.id,
              services: this.weekvalue
            }).then(
              () => this.$router.push({name: 'storemanage'})
            ).catch(
              erro => this.$toast(erro.response.data.message)
            )
            this.$router.push({name: 'storemanage'})
          } else {
            this.$toast('请选择提供的服务')
          }
        }
      }
    }
  }
</script>

<style lang="stylus">
  #storeweeks{
    background: #f7faff
    min-height 100vh
    .mint-header{
      height: .88rem
      .mint-header-title{
        font-size .32rem
      }
      .mint-button-text{
        font-size .24rem
      }
    }
    .popup-content{
      .mint-cell-wrapper{
        line-height 1.05rem
        padding-left .3rem
        padding-right .3rem
        input[type="text" i]:disabled{
          background: #fff
        }
        .mint-cell-title{
          width:auto
        }
        .mint-cell-text{
          font-size .26rem
          vertical-align baseline
        }
      }
      .confirm {
        width: 94%;
        background: #00b4fe;
        display: block;
        margin-left: auto;
        margin-right: auto;
        color: #fff;
        border-radius: 0;
        font-size: 0.32rem;
        height: 0.8rem;
        line-height: 0.8rem;
        margin-top: 1.05rem;
        margin-bottom: 0.18rem;
        box-shadow none
      }
    }
  }

</style>
