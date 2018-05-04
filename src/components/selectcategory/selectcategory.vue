<template>
  <div id="selectcategory">
    <mt-header title="选择品类">
        <mt-button icon="back"  slot="left" @click = $router.back()></mt-button>
      <mt-button slot="right">联系客服</mt-button>
    </mt-header>
      <div class="scroller">
        <div class="scroller-left">
          <iscroll-view ref="iscroll" class="scroll-view" :options="{click : true}">
            <ul>
              <li v-for="item in list" :class="{active : (select===item)}" @click="selected(item)">{{ item.name }}</li>
            </ul>
          </iscroll-view>
        </div>
        <div class="scroller-right">
          <iscroll-view class="scroll-view"  :options="{click : true}">
            <ul>
              <li v-for="item in listright" @click="selectedright(item)">{{ item.name }}</li>
            </ul>
          </iscroll-view>
        </div>
      </div>
  </div>
</template>

<script>
// TODO: 添加联系客服
export default {
  name: 'selectcategory',
  data () {
    return {
      select: {},
      selectright: {},
      topStatus: '',
      loading: false,
      isActive: true,
      list: [],
      listright: [],
      storeInfo: {}
    }
  },
  created () {
  },
  mounted () {
    // 获取状态管理中的店铺信息
    this.storeInfo = this.$store.state.Store
    this.getList()
  },
  methods: {
    // 获取首屏一级菜单数据
    getList () {
      this.$http.get('/common/v1/categories').then(res => { this.list = res.data; this.select = this.list[0]; this.getListright(res.data[0].id) })
    },
    // 获取首屏二级菜单数据
    getListright (id) {
      this.$http.put(`/common/v1/categories/${id}/child`).then(
        res => { this.listright = res.data }
      )
    },
    selected (item) {
      this.select = item
      this.getListright(item.id)
    },
    selectedright (item) {
      this.selectright = item
      this.jobdone()
    },
    jobdone () {
      this.storeInfo.categoryId = this.selectright.id
      this.storeInfo.categoryText = this.selectright.name
      // 提交信息
      this.$store.dispatch('storeinfochange', this.storeInfo)
      if (this.$route.params.page === 'storechange') {
        this.$router.push({name: 'storechange'})
      } else {
        this.$router.push({name: 'register'})
      }
    }
  }
}
</script>

<style lang="stylus">
  #selectcategory{
    .mint-header{
      height: .88rem
      .mint-header-title{
        font-size .32rem
      }
      .mint-button-text{
        font-size .24rem
      }
    }
    .scroller{
      height:calc(100% - .88rem)
      .scroller-left{
        height:100%
        width:2.5rem
        .scroll-view {
          background #f0f0f0
          width:2.5rem
          /* -- Attention: This line is extremely important in chrome 55+! -- */
          touch-action: none;
          /* -- Attention-- */
          position: fixed;
          top: .88rem;
          bottom: 0;
          left: 0;
          overflow: hidden;
          li{
            width: 100%
            height .9rem
            padding-left .3rem
            padding-top .32rem
            border-bottom 1px solid #e7e7e7
            border-right 1px solid #e7e7e7
            background #f0f0f0
            cursor: pointer;
          }
          li.active{
            border-right 1px solid #ffffff
            background #ffffff
          }
        }
      }
      .scroller-right{
        margin-left 2.5rem
        height:100%
        .scroll-view {
          /* -- Attention: This line is extremely important in chrome 55+! -- */
          touch-action: none;
          /* -- Attention-- */
          position: fixed;
          top: .88rem;
          bottom: 0;
          left: 2.5rem;
          right: 0;
          overflow: hidden;
          li{
            width: 100%
            height .9rem
            padding-left .3rem
            padding-top .32rem
            border-bottom 1px solid #e7e7e7
          }
        }
      }
    }
  }

</style>
