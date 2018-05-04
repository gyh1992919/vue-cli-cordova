<template>
  <div id="fudaiagain">
    <mt-header title="再次发布">
      <mt-button icon="back" slot="left" @click.native = $back></mt-button>
      <mt-button slot="right"></mt-button>
    </mt-header>
    <div class="datepick">
      <p>活动截止 <input type="date" placeholder="开始时间" v-model="activityAt">-<input v-model="activityEndAt" type="date"></p>
      <p>有效时间 <input type="date" placeholder="开始时间" v-model="effectiveAt">-<input type="date" v-model="effectiveEndAt"></p>
    </div>
    <mt-button class="next" @click.native = jobdone()>发布</mt-button>
  </div>
</template>

<script>
  export default {
    name: 'fudaiagain',
    data () {
      return {
        activityAt: '',
        activityEndAt: '',
        effectiveAt: '',
        effectiveEndAt: ''
      }
    },
    created () {
      // 测试storei数据
    },
    mounted () {
      console.log(this.$route.params.id)
    },
    methods: {
      jobdone () {
        if (!this.activityAt || !this.activityEndAt || !this.effectiveAt || !this.effectiveEndAt) {
          this.$toast('请选择日期')
        } else {
          this.$http.post(`/store/v1/wallets/${this.$route.params.id}/create-again`, {
            id: this.$route.params.id,
            activityAt: this.activityAt,
            activityEndAt: this.activityEndAt,
            effectiveAt: this.effectiveAt,
            effectiveEndAt: this.effectiveEndAt
          }).then(
            res => {
              console.log(res.data)
              this.$toast('福袋已发布')
              this.$router.push({name: 'fudailist'})
            }
          ).catch(err => {
            this.$toast(err.response.data.message)
          })
        }
      }
    }
  }
</script>

<style lang="stylus">
  .mint-toast{
    z-index 9999
  }
  #fudaiagain{
    background #f7faff
    input{
      display inline-block
    }

    .mint-header{
      height: .88rem
      .mint-header-title{
        font-size .32rem
      }
      .mint-button-text{
        font-size .24rem
      }
    }
    .datepick{
      background: #ffffff
      padding-top .4rem
      padding-left .3rem
      padding-right .3rem
      padding-bottom .01rem
      p{
        line-height .75rem
        margin-bottom .5rem
        font-size .26rem
        color: #a0a3b2
        input{
          border:1px solid #eff1f7
          line-height .75rem
          font-size .24rem
          padding-left .2rem
        }
        input:first-child{
          margin-left .3rem
        }
      }
      p{
        input{
          width:2.3rem
          margin-left .15rem
          margin-right .15rem

        }
        input:first-child{
          margin-left .3rem
        }
      }
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
      margin-top .7rem
      margin-bottom .18rem
    }
  }

</style>
