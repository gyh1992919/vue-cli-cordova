<template>
  <div id="fudaistate">
    <div class="wallet-record">
      <div class="tabbar">
        <div class="tabItem tabItem_1" :class = "show ? 'active' : ''" @click="toggleStatus">
          <p>已使用</p>
        </div>
        <div class="tabItem tabItem_2" :class = "show ?  '': 'active'" @click="toggleStatus">
          <p>未使用</p>
        </div>
      </div>

      <div class="wallet-record_body">
        <div class="wallet-record_count">
          <p class="day">2018年2月28日</p>
          <p class="user">{{show? '已': '未'}}使用/人 100</p>
        </div>
        <div class="wallet-record_list">
          <div v-for="item in [1,2,3,4,5,6,4,8,9]" >
            <div class="wallet-record_item">
              <img class="wallet-record_item_avatar">
              <div class="desc">
                <p class="username">晚风吹吹醒</p>
                <p class="phone">130******00</p>
                <div class="time">
                  <p>2018.01.20 15:30:20</p>
                </div>
              </div>
              <div class="number" :class="show? '' : 'empty-number'">
                <p>50.00</p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'fudaistate',
  data () {
    return {
      show: true
    }
  },
  created () {

  },
  methods: {
    toggleStatus () {
      this.show = !this.show
    }
  }
}
</script>

<style lang="stylus">
  #fudaistate
    .wallet-record
      container_wrap()
      .tabbar
        width: 100%
        height: .6rem
        position: fixed
        top: 0
        left: 0
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
      .wallet-record_body
        padding-top: .6rem
        min-height: auto
        background-color: #f7faff
        .wallet-record_count
          padding: 0 .3rem
          height: .77rem
          line-height: .77rem
          display: flex
          justify-content: space-between
          .day
            font-size: .26rem
          .user
            font-size: .24rem
            color: #a0a3b2
        .wallet-record_list
          .wallet-record_item
            padding: .3rem
            display: flex
            align-items: center
            border-bottom: 1px solid $line-color
            background-color: #fff
            .wallet-record_item_avatar
              width: .5rem
              height: .5rem
              border-radius: 50%
              background-color: #000
            .desc
              flex: 1
              margin-left: .2rem
              .username
                font-size: .26rem
                font-weight: bold
              .phone
                background-color: #f5f7fa
                color: #a0a3b2
                padding:0 .02rem
                margin-left: .15rem
                position: relative
                bottom: 2px
                font-size: .22rem
              .time
                margin-top: .2rem
                font-size: .2rem
                color: #a0a3b2
            .number
              font-size: .3rem
              &.empty-number
                color: #a0a3b2
</style>
