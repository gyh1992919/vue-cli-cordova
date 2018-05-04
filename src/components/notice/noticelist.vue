<template>
  <div id="noticelist">
    <mt-header title="通知">
      <mt-button icon="back" slot="left" @click="$router.back()"></mt-button>
      <mt-button slot="right"></mt-button>
    </mt-header>
    <div class="main-body" :style="{ height: wrapperHeight + 'px', overflow: 'scroll'}">
      <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <div class="notice-content">
          <div class="list" v-for="item in pageList" @click="goDetail(item)">
            <div class="list-title">
              <img :src="item.msgIcon" class="img-responsive title-icon">
              <p>{{item.msgType}} <span>{{item.createdAt}}</span></p>
            </div>
            <div class="list-content">
              <p>{{item.title}}</p>
            </div>
            <div class="list-state">{{item.desc}}</div>
          </div>
        </div>
      </v-loadmore>
    </div>
  </div>
</template>

<script>
  import tabbar from '../tabbar/tabbar'
  import {Loadmore} from 'mint-ui'
  export default {
    components: {
      tabbar,
      'v-loadmore': Loadmore
    },
    name: 'noticelist',
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
    mounted () {
      this.loadPageList(this.index)  //  初次访问查询列表
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
        return this.$http.get(`/store/v1/messages`, {
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
        setTimeout(() => this.loadPageList(this.index).then(() => this.$refs.loadmore.onBottomLoaded()
        ), 500)
        // this.isHaveMore(data.result.haveMore)
      },
      isHaveMore: function (len) {
        // 是否还有下一页，如果没有就禁止上拉刷新
        // this.allLoaded = true //  true是禁止上拉加载
        if (len < this.searchCondition.pageSize) {
          this.allLoaded = true
        }
      },
      goDetail (item) {
        switch (item.itemType) {
          case 1:
            this.$router.push({name: 'notice'})
            break
          case 2:
            this.$router.push({name: 'extractdetail', params: {item: item}})
            break
          case 3:
            this.$router.push({name: 'settlementdetail', params: {id: item.id}})
            break
          case 4:
            this.$router.push({name: 'paymentdetail', params: {id: item.id}})
            break
          case 5:
            this.$router.push({name: 'wallet'})
            break
          case 6:
            this.$router.push({name: 'storeInfo'})
            break
          case 7:
            this.$router.push({name: 'userWallet'})
            break
          case 8:
            this.$router.push({name: 'bankCard'})
            break
        }
      }
    }
  }
</script>

<style lang="stylus">
  #noticelist{
    background #f7faff
    .mint-header{
      height: .88rem
      .mint-header-title{
        font-size .32rem
      }
    }
    .notice-content{
      padding-top .3rem
      .list {
        margin-bottom .2rem
        padding .3rem
        background: #fff
        .list-title{
          display: flex
          align-items center
          margin-bottom .23rem
          .title-icon{
            width: .4rem;
            height: .4rem;
            margin-right .2rem
          }
          p{
            color: #a0a3b2
            font-size .24rem
            display flex
            span{
              font-size .2rem
              display block
              align-self center
              padding-left .1rem
            }
          }
        }
        .list-content{
          padding-bottom .29rem
          padding-left .59rem
          p{
            font-size .28rem
            color: #000
            font-weight bold
          }
        }
        .list-state{
          padding-left .59rem
          color: #a0a3b2
          font-size .26rem
        }
      }
    }
  }

</style>
