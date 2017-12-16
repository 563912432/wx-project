<template>
  <div class="hello">
    <div class="wrapper">
      <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded"
                   ref="loadmore">
        <ul>
          <li class="img-li"><img src="../assets/ad_01.png" alt=""></li>
          <li class="img-li"><img src="../assets/ad_02.png" alt=""></li>
          <li class="img-li"><img src="../assets/ad_03.png" alt=""></li>
          <li class="img-li"><img src="../assets/ad_04.png" alt=""></li>
          <li class="img-li"><img src="../assets/ad_05.png" alt=""></li>
        </ul>
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading'">载入中...</span>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
  import {Swipe} from 'mint-ui/lib/swipe'
  import {SwipeItem} from 'mint-ui/lib/swipe-item'
  import {Loadmore} from 'mint-ui/lib/loadmore'

  export default {
    name: 'hello',
    components: {
      Swipe,
      SwipeItem,
      Loadmore
    },
    data () {
      return {
        allLoaded: false,
        topStatus: '',
        list: [
          '测试数据一',
          '测试数据二',
          '测试数据三',
          '测试数据四',
          '测试数据五'
        ]
      }
    },
    created () {
      this.$store.commit('setSelected', '1')
    },
    methods: {
      loadBottom () {
        let that = this
        setTimeout(function () {
          that.$refs.loadmore.onBottomLoaded()
        }, 1500)
        this.allLoaded = true
      },
      handleBottomChange (status) {
        this.topStatus = status
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus' rel='stylesheet/stylus'>
  .hello
    flex 1
    display flex
    flex-direction column
    overflow hidden
    .wrapper
      flex 1
      padding 5px
      overflow auto
      .img-li
        width 100%
        height 157px
        overflow hidden
</style>
