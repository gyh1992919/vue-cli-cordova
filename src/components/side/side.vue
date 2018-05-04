<template>
  <div id="side">
    <mt-header title=""></mt-header>
    <div class="main-body" :style="{ height: wrapperHeight + 'px', overflow: 'scroll'}">
      <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <div class="wallet-record">
          <div class="wallet-record_body"  v-for="(items, index) in pageList">
            <div class="wallet-record_count"  v-if="index === 0 || items.time !== pageList[index-1].time">
              <p class="day">{{items.time}}</p>
              <p class="user"></p>
            </div>
            <div class="wallet-record_list">
              <div v-for="item in items.data" class="wallet-record-wrapper">
                <div class="wallet-record-header">
                  <div class="cont"> <p><span>订单编号：{{item.sn}}</span></p><p><span style="color: #33a1ff" v-if="item.status===1">待支付</span><span  v-if="!(item.status===1)">已支付</span></p> </div>
                </div>
                <div class="wallet-record_item">
                  <img :src="item.avatarUrl" class="wallet-record_item_avatar">
                  <div class="desc">
                    <p class="username">{{item.userName}} <span v-if="item.userPhone">{{item.userPhone.slice(0,3)}}****{{item.userPhone.slice(-4)}}</span> </p>
                    <div class="time">
                      <p>{{item.createdAt}}</p>
                    </div>
                  </div>
                  <div class="number" :class="show? '' : 'empty-number'">
                    <p>{{(item.status===1)?'+':''}}{{item.storeAmount}}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </v-loadmore>
    </div>

    <div class="tabbar">
      <div class="tabItem tabItem_1" :class = "show ? 'active' : ''" @click="toggleStatus(1)">
        <p>待支付</p>
      </div>
      <div class="tabItem tabItem_2" :class = "show ?  '': 'active'" @click="toggleStatus(2)">
        <p>已完成</p>
      </div>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
  import tabbar from '../tabbar/tabbar'
  import {Loadmore} from 'mint-ui'
  export default {
    components: {
      tabbar,
      'v-loadmore': Loadmore  // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
      // 推荐应用组件时用a-b形式起名
    },
    name: 'side',
    data () {
      return {
        show: true,
        //  分页属性
        searchCondition: {
          pageNo: 1,
          pageSize: 10
        },
        pageList: [],
        allLoaded: false, //  是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        scrollMode: 'auto', //  移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        wrapperHeight: 0,
        ajaxUrl: '/store/v1/orders/unpayed'
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
      this.loadPageList(this.index)  //  初次访问查询列表
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.loadmore.$el.getBoundingClientRect().top
    },
    methods: {
      toggleStatus (index) {
        this.show = !this.show
        if (index === 1) {
          this.ajaxUrl = '/store/v1/orders/unpayed'
        } else {
          this.ajaxUrl = '/store/v1/orders/finish'
        }
        this.listReset()
        this.loadPageList()
      },
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
      loadPageList: function (index) {
        // 查询数据
        return this.$http.get(this.ajaxUrl, {
          params: {
            'pre-page': this.searchCondition.pageSize,
            'page': this.searchCondition.pageNo
          }
        }).then(res => {
          console.log(res.data)
          // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
          this.isHaveMore(res.data)
          this.pageList = this.pageList.concat(res.data)
          console.log(this.pageList)
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
        setTimeout(() => this.loadPageList(this.index).then(() => this.$refs.loadmore.onBottomLoaded()
        ), 500)
        // this.isHaveMore(data.result.haveMore)
      },
      isHaveMore: function (data) {
        // 是否还有下一页，如果没有就禁止上拉刷新
        // this.allLoaded = true //  true是禁止上拉加载
        let len = 0
        if (data.length > 0) {
          data.map(res => {
            len += res.data.length
          })
        }
        if (len < this.searchCondition.pageSize) {
          this.allLoaded = true
        }
      },
      listReset () {
        this.pageList = []
        this.searchCondition.pageNo = 1
        this.allLoaded = false
      }
    }
  }
</script>

<style lang="stylus">
  #side
    padding-bottom .8rem
    .mint-header{
      height: .88rem

      .mint-header-title{
        font-size .32rem
      }
      .mint-button-text{
        font-size .24rem
      }
    }
    .tabbar
      width: 2.5rem
      height: .42rem
      position: fixed
      top: .25rem
      left: 2.5rem
      display: flex
      justify-content: center
      background-color: #33a1ff
      z-index: 2222
      .tabItem
        font-size: .26rem
        width: 1.26rem
        height: 41rpx
        line-height: .41rem
        text-align: center
        border: 1px solid #fff
        color: #fff
        &.tabItem_1
          border-top-left-radius: .08rem
          border-bottom-left-radius: .08rem
        &.tabItem_2
          border-top-right-radius: .08rem
          border-bottom-right-radius: .08rem
        &.active
          background-color: #fff
          color:  #33a1ff
    .wallet-record
      .wallet-record_body
        min-height: auto
        background-color: #f7faff
        .wallet-record_count
          padding: 0 .3rem
          height: .8rem
          line-height: .8rem
          display: flex
          justify-content: space-between
          .day
            font-size: .26rem
          .user
            font-size: .24rem
            color: #a0a3b2
        .wallet-record_list
          .wallet-record-wrapper{
            margin-bottom .18rem
            .wallet-record-header{
              padding-left .3rem
              .cont{
                display: flex
                justify-content: space-between
                border-bottom 1px solid #eff1f7
                background: #ffffff
                line-height: .7rem
                padding-right:.3rem
              }
            }
            .wallet-record_item {
              padding: .3rem
              display: flex
              align-items: center
              border-bottom: 1px solid $line-color
              background-color: #fff
              .wallet-record_item_avatar {
                width: .5rem
                height: .5rem
                border-radius: 50%
              }
              .desc {
                flex: 1
                margin-left: .18rem
                .username {
                  font-size: .26rem
                  margin-bottom: .2rem
                  span{
                    color: #a0a3b2
                    background #f5f7fa
                    display: inline-block
                    line-height .3rem
                    padding-left .1rem
                    padding-right .1rem
                    border-radius .3rem
                    font-size:.22rem
                  }
                }
                .time {
                  font-size: .2rem
                  color: #a0a3b2
                }
              }
              .number {
                font-size: .3rem
                &.empty-number {
                  color: #a0a3b2
                }
              }
            }
          }

</style>
