<template>
  <div id="storechange">
    <mt-header title="店铺管理">
      <mt-button icon="back"  slot="left" @click="$router.back()"></mt-button>
      <mt-button slot="right"></mt-button>
    </mt-header>
    <div class="popup-content">
      <div class="information">
        <mt-field label="店铺名称" placeholder="请输入店铺名称" type="text" v-model="storeInfo.name"></mt-field>
        <mt-field @click.native="sadress" label="店铺地址" placeholder="请选择" type="text" v-model="storeInfo.address" :disabled="true"></mt-field>
        <mt-field label="联系电话" placeholder="请输入座机/手机，座机需加区号" type="tel" v-model="storeInfo.phone"></mt-field>
        <mt-field @click.native="scategory" label="经营品类" placeholder="请选择" type="text" v-model="storeInfo.categoryText" :disabled="true"></mt-field>

        <mt-button @click = commit() class="checkin">申请修改</mt-button>
      </div >
    </div>
  </div>
</template>

<script>
  export default {
    name: 'storechange',
    data () {
      return {
        storeInfo: {},
        desflag: false,
        pickerVisible: '',
        popuphold: false,
        popbottom: false,
        cpt: true,
        pickerflag: '',
        audit: false,
        workflag1: true,
        workflag2: true,
        workAt: '',
        workendAt: ''
      }
    },
    created () {
      this.storeInfo = this.$store.state.Store
      console.log(this.storeInfo)
    },
    methods: {
      commitInfo () {
        this.$store.dispatch('storeinfochange', this.storeInfo)
      },
      sadress () {
        this.commitInfo()
        this.$router.push({name: 'adress', params: {page: 'storechange'}})
        console.log(this.$store.state)
      },
      scategory () {
        this.commitInfo()
        this.$router.push({name: 'selectcategory', params: {page: 'storechange'}})
      },
      commit () {
        this.$http.put(`/store/v1/stores/${this.storeInfo.store.id}`, {
          id: this.storeInfo.id,
          name: this.storeInfo.name,
          categoryId: this.storeInfo.categoryId,
          phone: this.storeInfo.phone,
          provinceId: this.storeInfo.provinceId,
          cityId: this.storeInfo.cityId,
          regionId: this.storeInfo.regionId,
          address: this.storeInfo.address,
          lat: this.storeInfo.lat,
          lon: this.storeInfo.lon
        }).then(
          res => console.log(res)
        ).catch(
          erro => this.$toast(erro.response.data.message)
        )
      }
    }
  }
</script>

<style lang="stylus">
  #storechange{
    background: #f7faff
    min-height 100vh
    input:disabled{
      background: transparent
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

    .popup-bottom{
      width:100%;
      height:5rem
    }
    .information{
      padding-top .3rem
      .mint-cell-wrapper{
        line-height 1.04rem
        font-size .26rem !important
        padding-left .3rem
        padding-right .3rem
        .mint-cell-text{
          font-size .26rem
          color: #161829
        }
      }
      .mint-cell:first-child .mint-cell-wrapper{
        background-size 0 0
      }
      .mint-button--normal{
        background: #00b4fe
        width: 94%
        color: #fff
        margin-left auto
        margin-right auto
        display block
        .mint-button-text{
          font-size .32rem
        }
      }
      .time{
        display: flex
        align-items:center
        line-height .9rem
        padding-left: .3rem
        padding-right: .3rem
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
          /*white-space: nowrap*/
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
    }
    .manage-content{
      padding-top .3rem
      .item{
        display: flex
        align-items:center
        justify-content space-between
        padding .3rem
        background: #ffffff
        border-bottom:1px solid #eff1f7
        .item-title{
          color: #a0a3b2
          font-size .26rem
        }
        .item-content{
          font-size .26rem
          color: #000
          padding-right .3rem
          position: relative
          img{
            display block
            width:.8rem
            height:.8rem
          }
          .mint-cell-allow-right::after{
            right:0
          }
        }
      }
      .item:last-child{
        border-bottom none
      }
    }
    .mint-popup{
      width:100%;
      height:100%;
      background: #f7faff
      .popup-content{
        padding-top .3rem
        .mint-cell-wrapper{
          line-height 1.05rem
          padding-left .3rem
          padding-right .3rem
          input[type="text" i]:disabled{
            background: #fff
          }
          .mint-cell-title{
            width:auto
            margin-right .6rem
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
    .mint-popup.mint-popup-bottom{
      height: auto
    }
  }
</style>
