<template>
  <div id="waitingforsettlement">
    <mt-header title="待结算余额" fixed>
      <mt-button icon="back" slot="left" @click="$back()"></mt-button>
      <router-link to="" slot="right">
        <mt-button icon="add"></mt-button>
      </router-link>
    </mt-header>
    <div class="list-wrapper">
      <div class="list-content" :style="{ height: wrapperHeight + 'px', overflow: 'scroll'}">
        <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
          <div class="banner">
            <div style="font-size: .24rem;color: #fea6af;margin-bottom: .45rem">今日结算/元</div>
            <div style="font-size: 1.2rem;color: #ffffff;margin-bottom: .65rem">{{finance.todaySettlement}}</div>
            <div class="overview">
              <p v-if=" parseInt(finance.yesterdayAmount) == 0">昨日成交额/元&nbsp;0.00</p>
              <p v-if=" parseInt(finance.yesterdayAmount)!==0 ">昨日成交额/元 +{{finance.yesterdayAmount}}<img src="../../../assets/icon/up@3x.png" alt=""></p>
              <p v-if=" parseInt(finance.settlementAmount) == 0" >待结算/元&nbsp;0.00</p>
              <p v-if=" parseInt(finance.settlementAmount)!==0" >待结算/元+{{finance.settlementAmount}}<img src="../../../assets/icon/up@3x.png" alt=""></p>
            </div>
          </div>
          <div class="list-title">
            结算记录
          </div>
          <div class="list-header">
            <div>预计处理时间</div>
            <div>待结算</div>
            <div>已结算</div>
          </div>
          <ul class="list" v-for="(item, index) in pageList">
            <div class="list-item" @click="itemgo(item.id)">
              <div>{{item.formatTime}}</div>
              <div>￥{{item.unamount}}</div>
              <div :class="{'amounted': (item.status ===1)}">￥{{item.amount}}</div>
              <i class="mint-cell-allow-right"></i>
            </div>
          </ul>
        </v-loadmore>
      </div>
    </div>
  </div>
</template>

<script>
  import {Loadmore} from 'mint-ui'
  export default {
    name: 'waitingforsettlement',
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
        selected: '',
        pageList: [],
        allLoaded: false, //  是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        scrollMode: 'auto', //  移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        wrapperHeight: 0,
        finance: {}
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
    created () {

    },
    mounted () {
      this.$http.get('/store/v1/finances').then(
        res => {
          this.finance = res.data
        }
      ).then(() => {
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.loadmore.$el.getBoundingClientRect().top
      })
      this.loadPageList().then(
        res => {
          this.wrapperHeight = document.documentElement.clientHeight - this.$refs.loadmore.$el.getBoundingClientRect().top
        }
      )  //  初次访问查询列表
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
        return this.$http.get('/store/v1/settlements', {
          params: {
            'pre-page': this.searchCondition.pageSize,
            'page': this.searchCondition.pageNo
          }
        }).then(res => {
          console.log(res.data)
          // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
          this.isHaveMore(res.data.length)
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
      itemgo (id) {
        this.$router.push({name: 'waitingforsettlementdetails', params: {id: id}})
      }
    }
}
</script>

<style lang="stylus">
  #waitingforsettlement{
    .mint-header{
      height: .88rem
      background: #ff005a
      .mint-header-title{
        font-size .32rem
      }
      .mint-button-text{
        font-size .24rem
      }
    }
    .banner {
      padding-top: 1.5rem
      background-image: linear-gradient( -350deg, rgb(253,56,74) 1%, rgb(255,0,90) 100%);
      box-shadow: 0 4px 20px 0 rgba(10, 22, 108, 0.16);
      padding-left .3rem
      padding-right .3rem
      padding-bottom .46rem
      .overview{
        display flex
        justify-content space-between
        p{
          color: #ffffff
          font-size .24rem
          display: flex
          img{
            display: block
            width:.15rem
            height:.22rem
            margin-left .1rem
          }
        }
      }
    }
    .list-wrapper{
      .list-title{
        line-height:1rem
        background: #f7faff
        font-size .28rem
        color: #000
        padding-left .3rem
        padding-right .3rem
      }
      .list-header{
        display: flex
        line-height .8rem
        color: #a0a3b2
        padding-left .3rem
        padding-right .3rem
        div{
          flex: 1
        }
      }
      .list-content{
        .list-item{
          display: flex
          line-height .8rem
          padding-left .3rem
          padding-right .3rem
          position: relative
          div{
            flex:1
          }
          .amounted{
            color: #29a2ff
          }
        }
      }
    }
  }

</style>
