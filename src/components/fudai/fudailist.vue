<template>
  <div id="fudailist">
    <mt-header title="福袋列表">
        <mt-button icon="back" slot="left" @click="$router.push({name: 'home'})"></mt-button>
      <mt-button slot="right" @click.native = addfd()>添加福袋</mt-button>
    </mt-header>
    <div class="main-body" :style="{ height: wrapperHeight + 'px', 'overflow': 'scroll'}">
      <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <div class="content">
          <div class="list" v-for="item in pageList" @click="goDetails(item)">
            <p><span>满50元享有折扣</span><span>{{item.activityAt.slice(0,10)}}-{{item.activityEndAt.slice(0,10)}}</span> </p>
            <p>¥{{item.minValue}}~¥{{item.maxValue}} <span>|</span> {{item.number}}个  </p>
            <p>
              <span>状态：</span>
              <span :class="{active : item.status === 2}">{{item.statusText}}</span>
            </p>
            <p><i class="mint-cell-allow-right"></i></p>
          </div>
        </div>
      </v-loadmore>
    </div>
  </div>
</template>

<script>
import {Loadmore} from 'mint-ui'
export default {
  name: 'fudailist',
  components: {
    'v-loadmore': Loadmore  // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
    // 推荐应用组件时用a-b形式起名
  },
  data () {
    return {
      //  分页属性
      searchCondition: {
        pageNo: 1,
        pageSize: 10
      },
      selected: '1',
      pageList: [],
      allLoaded: false, //  是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
      scrollMode: 'auto', //  移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
      wrapperHeight: 0,
      wallet: {}
    }
  },
  watch: {
    allLoaded (curVal, oldVal) {
      console.log('加载完成')
      console.log(curVal)
      if (curVal) {
        document.querySelector('.mint-loadmore-bottom').style.visibility = 'hidden'
      } else {
        document.querySelector('.mint-loadmore-bottom').style.visibility = 'visible'
      }
    }
  },
  mounted () {
    this.loadPageList()  //  初次访问查询列表
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.loadmore.$el.getBoundingClientRect().top
  },
  methods: {
    loadTop: function () { //  组件提供的下拉触发方法
      //  下拉加载
      // this.loadPageList()
      this.$refs.loadmore.onTopLoaded() // 固定方法，查询完要调用一次，用于重新定位
    },
    loadBottom: function () {
      // 上拉加载
      this.more() // 上拉触发的分页查询
      console.log(this.$refs.loadmore)
    },
    loadPageList: function () {
      // 查询数据
      return this.$http.get('/store/v1/wallets', {
        params: {
          'pre-page': this.searchCondition.pageSize,
          'page': this.searchCondition.pageNo
        }
      }).then(res => {
        console.log(res.data)
          // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
        this.isHaveMore(res.data.length)
        this.pageList = this.pageList.concat(res.data)
        this.$nextTick(function () {
            // 原意是DOM更新循环结束时调用延迟回调函数，大意就是DOM元素在因为某些原因要进行修改就在这里写，要在修改某些数据后才能写，
            // 这里之所以加是因为有个坑，iphone在使用-webkit-overflow-scrolling属性，就是移动端弹性滚动效果时会屏蔽loadmore的上拉加载效果，
            // 花了好久才解决这个问题，就是用这个函数，意思就是先设置属性为auto，正常滑动，加载完数据后改成弹性滑动，安卓没有这个问题，移动端弹性滑动体验会更好
          this.scrollMode = 'touch'
        })
      })
    },
    more: function () {
      // 分页查询
      this.searchCondition.pageNo = this.searchCondition.pageNo + 1
      setTimeout(() => this.loadPageList(this.selected).then(() => this.$refs.loadmore.onBottomLoaded()
      ), 500)
      // this.isHaveMore(data.result.haveMore)
    },
    isHaveMore: function (isHaveMore) {
      // 是否还有下一页，如果没有就禁止上拉刷新
      // this.allLoaded = true //  true是禁止上拉加载
      if (isHaveMore < this.searchCondition.pageSize) {
        this.allLoaded = true
      }
    },
    goDetails (item) {
      // 福袋未开始
      this.$store.dispatch('walletinfochange', item)
      this.$router.push({name: 'pending'})
      console.log(item)
    },
    addfd () {
      this.$router.push({name: 'addfd'})
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'fudai' || to.name === 'fudaiagain') {
      next(false)
      this.popupVisible = false
      console.log('导航被阻止了')
    } else {
      next()
    }
  }
}
</script>

<style lang="stylus">
  #fudailist{
    background: #f7faff
    .mint-header{
      height:.88rem
      .mint-header-title{
        font-size .32rem
      }
    }
    .content{
      margin-top: .3rem
      background #fff
      .list{
        padding: .3rem
        position: relative
        border-bottom:1px solid #eff1f7
        p{
          margin-bottom .2rem
        }
        p:first-child{
          display flex
          align-items center
          span:first-child{
            font-size .3rem
            color: #000
            display block
            line-height .35rem
            height .35rem
          }
          span:last-child{
            font-size .22rem
            color: #a0a3b2
            display block
            background: #f5f7fa
            margin-left .17rem
            height .3rem
            line-height .3rem
            padding-left .14rem
            padding-right .14rem
            border-radius 2px;
          }
        }
        p:nth-child(2){
          color: #a0a3b2
          font-size .24rem
        }
        p:nth-child(3){
          span:first-child{
            font-size .24rem
            color: #a0a3b2
          }
          span:last-child{
            font-size .24rem
            color: #d5d7df
          }
          span:last-child.active{
            color: #33a1ff
          }
        }

        .mint-cell-allow-right::after{
          width .15rem
          height .15rem
        }
      }

    }
  }

</style>
