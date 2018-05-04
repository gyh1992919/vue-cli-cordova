<template>
  <div id="traderecord">
    <header class="mint-header">
      <div class="mint-header-button is-left">
        <button class="mint-button mint-button--default mint-button--normal" @click="$router.back()">
          <span class="mint-button-icon"><i class="mintui mintui-back"></i></span>
          <label class="mint-button-text"></label></button></div>
      <h1 class="mint-header-title">
        <div class="select" style="display: flex;align-items: center;justify-content: center">
          <select id="select" v-model="selected" @change="selectTab()">
            <option disabled value="">请选择</option>
            <option value="0">全部记录</option>
            <option value="1">提现记录</option>
            <option value="2">结算记录</option>
          </select><label for="select"><span style="color: #ffffff;">▼</span></label>
        </div>
      </h1>
      <div class="mint-header-button is-right">
        <button class="mint-button mint-button--default mint-button--normal" @click="selectdate()">
          <label class="mint-button-text"><img src="../../../assets/icon/rilisx@3x.png" style="width: .4rem;height: .35rem;"></label>
        </button>
      </div>
    </header>
    <div class="date">
      <div v-if="pageList.length">
        <p>{{pageList[0].time}}</p>
        <p>待结算{{pageList[0].mouthSettlement}}元 提现{{pageList[0].mouthExtract}}元</p>
      </div>
    </div>

    <div class="main-body" :style="{ height: wrapperHeight + 'px', 'overflow': 'scroll', 'margin-top': '1.3rem'}">
      <v-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <ul class="list" v-for="(items, index) in pageList">
          <div class="item" v-for="item in items.data" @click="goDetail(item.id)">
            <div class="name"><span>{{item.settlementText}}</span><span></span> </div>
            <div>{{item.tradingTypeText}}</div>
            <div class="desc">
              <div class="order-sn">
                <div class="sn">订单流水号: {{item.sn}}</div>
                <div :class="[{'amounted': true}, 'amount']"><span v-if="item.orderSettlemet === 1">+</span>{{item.amount}}</div>
              </div>
              <div class="createdAt">交易时间: {{item.orderCreatedAt}}</div>
            </div>
          </div>
        </ul>
      </v-loadmore>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="right"
      >
      <mt-header title="账单筛选">
        <mt-button icon="back" slot="left" @click="popupVisible = false"></mt-button>
        <mt-button slot="right" @click="query">查询</mt-button>
      </mt-header>
      <div class="selecttime">
        <label  for="inputdate" class="p">按月查询</label>
        <label for="inputdate" class="l">{{date}}</label>
        <input ref="inputdate" id="inputdate" type="date" style=" width: 0;height: 0; background: #f7faff;appearance:none;" v-model="datetime">
      </div>
    </mt-popup>
  </div>
</template>

<script>
  import {Loadmore} from 'mint-ui'
  export default {
    name: 'traderecord',
    data: function () {
      return {
        popupVisible: false,
        //  分页属性
        searchCondition: {
          pageNo: 1,
          pageSize: 10
        },
        selected: '0',
        pageList: [],
        allLoaded: false, //  是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
        scrollMode: 'auto', //  移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
        wrapperHeight: 0,
        datetime: ''
      }
    },
    computed: {
      date () {
        console.log(this.datetime.slice(0, 7))
        return this.datetime.slice(0, 7)
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
      this.getTimeNow()
      this.loadPageList(this.selected, this.date)  //  初次访问查询列表
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.loadmore.$el.getBoundingClientRect().top
    },
    methods: {
      getTimeNow () {
        let nowDate = new Date()
        let year = nowDate.getFullYear()
        let month = nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1
        let day = nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate()
        let dateStr = year + '-' + month + '-' + day
        this.datetime = dateStr
        console.log(this.date)
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
      loadPageList: function (index, date) {
        // 查询数据
        return this.$http.get('/store/v1/trading-records', {
          params: {
            'pre-page': this.searchCondition.pageSize,
            'page': this.searchCondition.pageNo,
            'tradingType': index,
            'date': date
          }
        }).then(res => {
          if (index === this.selected) {
            console.log(res.data)
            // 是否还有下一页，加个方法判断，没有下一页要禁止上拉
            this.isHaveMore(res.data)
            this.pageList = this.pageList.concat(res.data)
            this.$nextTick(function () {
              this.scrollMode = 'touch'
            })
          }
        })
      },
      more: function () {
        // 分页查询
        this.searchCondition.pageNo = this.searchCondition.pageNo + 1
        setTimeout(() => this.loadPageList(this.selected, this.date).then(() => this.$refs.loadmore.onBottomLoaded()
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
      contentReset () {
        this.pageList = []
        this.searchCondition.pageNo = 1
        this.allLoaded = false
        this.loadPageList(this.selected, this.date)
      },
      selectTab () {
        this.contentReset()
      },
      query () {
        this.popupVisible = false
        this.selectTab()
      },
      selectdate () {
        this.popupVisible = true
      },
      goDetail (id) {
        this.$router.push({name: 'settlementdetail', params: {id: id}})
      }
    },
    beforeRouteLeave (to, from, next) {
      if (this.popupVisible) {
        next(false)
        this.popupVisible = false
      } else {
        next()
      }
    }
  }
</script>

<style lang="stylus">
  #traderecord
      .mint-header{
        height: .88rem
        .mint-header-title{
          font-size .32rem
        }
        .mint-button-text{
          font-size .24rem
        }
      }
      .mint-popup{
        width: 100%
        height: 100%
        .selecttime{
          padding-top .7rem
          padding-left .3rem
          padding-right .3rem
          .l{
            width:100%
            display: block
            text-align center
            color: #33a1ff
            line-height .7rem
            border-bottom 1px solid #33a1ff
          }
          .p{
            width: 1.4rem
            height:.5rem
            line-height .5rem
            text-align center
            color: #33a1ff
            border: 1px solid #33a1ff
            border-radius 3px
            margin-bottom .9rem
            display: block
          }
        }
      }
      .select{
        width: 100%
        line-height .88rem
        background: #33a1ff
        select{
          background: #33a1ff
          color: #fff
          border: none
          outline:none
          -webkit-appearance:none
          font-size .35rem !important
          width: 1.7rem
          option{
            border:none
            -webkit-appearance:none
            outline:none
          }
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
            color: #000000
            font-size: .36rem
          .amount.amounted
            color: #33a1ff
        .createdAt
          font-size: .24rem
          color: #a0a3b2
      .date{
        padding: .3rem
        background: #f7faff
        display: flex
        justify-content space-between
        align-items center
        position fixed
        width: 100%
        top .88rem
        div:first-child{
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
