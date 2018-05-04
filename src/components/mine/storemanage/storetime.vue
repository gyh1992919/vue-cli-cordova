<template>
  <div id="storetime">
    <mt-header title="修改营业时间">
      <mt-button icon="back" slot="left" @click = $router.go(-1)></mt-button>
      <mt-button slot="right"></mt-button>
    </mt-header>
    <div class="time">
      <p>营业时间</p>
      <p><span  @click="pickeropen(1)" >{{storeInfo.workAt}}</span></p>
      <p @click="pickeropen(1)"><img src="../../../assets/icon/rili@3x.png" alt=""></p>
      <p style="margin-left: 1.3rem"><span @click="pickeropen(2)">{{storeInfo.workendAt}}</span></p>
      <p @click="pickeropen(2)"><img src="../../../assets/icon/rili@3x.png" alt=""></p>
    </div>
    <mt-button class="confirm" @click = commit()>确认</mt-button>
    <mt-datetime-picker ref="timepicker"
                        v-model="pickerVisible"
                        type="time"
                        @confirm="handleConfirm">
    </mt-datetime-picker>
  </div>
</template>

<script>
export default {
  name: 'storetime',
  data () {
    return {
      storeInfo: {},
      pickerVisible: false,
      workAt: '',
      workendAt: ''
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
  },
  methods: {
    commit () {
      if (this.workAt || this.workendAt) {
        this.$http.put(`/store/v1/stores/${this.storeInfo.id}/work-time`, {
          id: this.storeInfo.id,
          workAt: this.storeInfo.workAt,
          workendAt: this.storeInfo.workendAt
        }).then(
          res => {
            console.log(res)
            this.$toast('营业时间段已修改')
            this.$router.push({name: 'storemanage'})
          }
        ).catch(erro => this.$toast(erro.response.data.message))
      } else {
        this.$toast('请选择新的时间段')
      }
    },
    pickeropen (para) {
      this.$refs.timepicker.open()
      this.pickerflag = para
    },
    handleConfirm (p) {
      if (this.pickerflag === 1) {
        this.workAt = p
        this.storeInfo.workAt = p
      } else if (this.pickerflag === 2) {
        this.workendAt = p
        this.storeInfo.workendAt = p
      }
    }
  }
}
</script>

<style lang="stylus">
  #storetime{
    .time{
      display: flex
      align-items:center
      line-height .9rem
      padding-left: .3rem
      padding-right: .3rem
      padding-top: .3rem
      background: #ffffff
      p{
        color: rgb(84,84,84)
        display flex
        align-items center
        img{
          height:.35rem
          width:.4rem
          display block
          margin-left:.45rem
        }
        span{
          display: block
          width: 1rem
        }
      }
      p:first-child{
        color: #000000
        margin-right: .9rem
        white-space: nowrap
        width: 1rem
        display: block
      }
    }
    .time.weeks{
      p{
        span{
          width: .75rem
        }
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

</style>
