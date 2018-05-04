<template>
  <div id="record">
    <mt-header title="帐单记录">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button slot="right"></mt-button>
    </mt-header>
    <div class="main-body" :style="{ height: wrapperHeight + 'px', 'overflow': 'scroll'}">
      <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <ul class="list" v-for="(item, index) in pageList">
          <div class="date" v-if="index===0 || item.createdAt.substring(0,7) !== pageList[index-1].createdAt.substring(0,7)">
            <div class="date-p">
              <p>{{item.createdAt.substring(0,7) }}</p>
              <p>待结算1000.00元</p>
            </div>
            <img src="../../assets/icon/rili@3x.png" alt="">
          </div>
          <div class="item">
            <div class="name">{{item.name}}</div>
            <div class="desc">
              <div class="state"><span>已到账</span><span>未到账</span></div>
              <div class="order-sn">
                <div class="sn">订单流水号: {{item.sn}}</div>
                <div class="amount">{{item.amount}}</div>
              </div>
              <div class="createdAt">交易时间: {{item.createdAt}}</div>
            </div>
          </div>
        </ul>
      </v-loadmore>
    </div>
  </div>
</template>

<script>
  import {Loadmore} from 'mint-ui'
  export default {
    name: 'record',
    data: function () {
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
        wrapperHeight: 0
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
    components: {
      'v-loadmore': Loadmore  // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题
      // 推荐应用组件时用a-b形式起名
    },
    mounted () {
      this.loadPageList(this.selected)  //  初次访问查询列表
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
      loadPageList: function (index) {
        // 查询数据
        return this.$http.get('/store/v1/wallets', {
          params: {
            'pre-page': this.searchCondition.pageSize,
            'page': this.searchCondition.pageNo,
            'type': index
          }
        }).then(res => {
          if (index === this.selected) {
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
          }
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
      }
    }
  }
</script>

<style lang="stylus">
  #record
    .mint-header{
      height: .88rem
      .mint-header-title{
        font-size .32rem
      }
      .mint-button-text{
        font-size .24rem
      }
    }
    .item
      background-color: #fff
      padding: .3rem
      border-bottom 1px solid #f0f2f8
      .name
        font-size: .24rem
        font-weight: bold
      .state{
        font-size .26rem
        color: #000
      }
      .order-sn
        display: flex
        justify-content: space-between
        font-size: .24rem
        line-height: .18rem
        margin: .18rem 0
        color: #a0a3b2
        .amount
          color: #33a1ff
          font-size: .36rem
      .createdAt
        font-size: .24rem
        color: #a0a3b2
    .date{
      padding: .3rem
      background: #f7faff
      display: flex
      justify-content space-between
      align-items center
      img{
        width: .4rem
        height:.35rem
      }
      .date-p{
        p:first-child{
          margin-bottom .2rem
          font-size .26rem
        }
        p:last-child{
          font-size .24rem
          color: #a0a3b2
        }
      }


    }
</style>
