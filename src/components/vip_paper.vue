<template>
  <div class="paper">
    <div class="head">
      <div class="left" @click="goBack">
        <i class="icon iconfont icon-fanhui1"></i>
      </div>
      <div class="title">考前密卷</div>
      <div class="right"></div>
    </div>
    <div class="list" v-if="list">
      <router-link class="item" v-for="item in list" :key="item.index"
                   :to="'/paperInfo/'+$route.params.tid+'/'+item.id">
        <div class="p_title">
          <i class="icon iconfont icon-shijuan"></i>
          <span>{{item.title}}</span>
        </div>
      </router-link>
    </div>
    <div class="list" v-else style="display: flex; align-items: center; justify-content: center; text-align: center">
      <div class="empty">
        <i class="icon iconfont icon-meiyougengduo" style="font-size: 40vw; color: rgba(7,17,27,0.1)"></i>
        <small>没有找到题目</small>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Indicator, Toast} from 'mint-ui'
  export default {
    name: 'chapter_paper',
    data () {
      return {
        list: []
      }
    },
    components: {
      Indicator,
      Toast
    },
    created () {
      this.getPaperList()
    },
    methods: {
      goBack () {
        this.$router.push({path: '/tkDetail/' + this.$route.params.tid})
      },
      getPaperList () {
        let that = this
        let data = {
          param: {type: this.$store.state.vip, cid: this.$route.params.tid},
          success: function (list) {
            if (list) {
              that.list = list
            }
          },
          error: function (msg) {
            Indicator.close()
            Toast({
              message: msg,
              iconClass: 'mint-toast-icon mintui mintui-field-warning',
              duration: 1500
            })
          }
        }
        this.$store.dispatch('getPaperList', data)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .paper
    position absolute
    z-index: 1
    width 100%
    height 100%
    background-color: #FBF9FE
    flex 1
    overflow auto
    display flex
    flex-direction column
  .head
    height 50px
    font-size 18px
    display flex
    flex-direction row
    align-items center
    background #35495E
    color #fff
    .left, .right
      width 50px
      height 100%
      display flex
      align-items center
      justify-content center
      .icon
        font-size 22px
    .title
      flex 1
      text-align center
  .list
    flex 1
    padding 0 5px
    overflow auto
    .empty
      display flex
      flex-direction column
      small
        color #999
    .item
      padding 15px 0px
      border-bottom 1px solid #eee
      display flex
      flex-direction row
      .p_title
        font-size 18px
        .icon
          vertical-align middle
          font-size 25px
        span
          vertical-align middle
    a
      color #666
</style>
