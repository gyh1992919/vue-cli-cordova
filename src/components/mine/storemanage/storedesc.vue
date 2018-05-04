<template>
  <div id="storedesc">
    <mt-header title="修改店铺描述">
      <mt-button icon="back" slot="left" @click = $router.go(-1)></mt-button>
      <mt-button slot="right"></mt-button>
    </mt-header>

    <mt-field  label="店铺描述" :placeholder="storeInfo.description" type="text" v-model="desc" >

    </mt-field>
    <mt-button class="confirm" @click = commit()>确认</mt-button>

  </div>
</template>

<script>
export default {
  name: 'storedesc',
  data () {
    return {
      storeInfo: {},
      desc: ''
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
      if (this.desc) {
        this.storeInfo.description = this.desc
        this.$http.put(`/store/v1/stores/${this.storeInfo.id}/desc`, {
          id: this.storeInfo.id,
          description: this.storeInfo.description
        }).then(
          res => {
            console.log(res)
            this.$toast('店铺描述已更改')
            this.$router.push({name: 'storemanage'})
          }
        ).catch(erro => this.$toast(erro.response.data.message))
      } else {
        this.$toast('请输入新的店铺描述')
      }
    }
  }
}
</script>

<style lang="stylus">
  #storedesc{
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
