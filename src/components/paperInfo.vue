<template>
  <div class="paperInfo">
    <div class="head" @click="goBack">
      <i class="icon iconfont icon-fanhui1"></i>
    </div>
    <div class="info">
      <div class="top">
        <h1>{{paperInfo.title}}</h1>
        <small>考试时长： {{ paperInfo.time/60 > 1 ? (paperInfo.time/60).toString().substr(0, 3) + ' 分钟' : paperInfo.time + '秒钟' }}
        </small>
      </div>
      <div class="detail">
        <span v-for="(item, key, index) in paperInfo.info">{{index+1}}、{{item.remark}}</span>
      </div>
      <div class="start">
        <mt-button @click="goExam">开始做题</mt-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {COMMON} from '../mixins'
  import {Toast, Indicator} from 'mint-ui'
  export default {
    mixins: [COMMON],
    name: 'paperInfo',
    components: {
      Toast, Indicator
    },
    data () {
      return {
        paperInfo: {
          time: 0
        }
      }
    },
    created () {
      // 清空上次的考试状态
      this.clearExamState()
      this.getPaperInfo()
    },
    methods: {
      goBack () {
        if (this.$store.state.paperInfo.type === '1') {
          this.$router.push({path: '/chapter_paper/' + this.$route.params.tid})
        } else if (this.$store.state.paperInfo.type === '2') {
          this.$router.push({path: '/simulate_paper/' + this.$route.params.tid})
        } else {
          this.$router.push({path: '/vip_paper/' + this.$route.params.tid})
        }
      },
      goExam () {
        // 如果是章节就走章节模式
        let path = ''
        if (+this.paperInfo.chapter !== 0) {
          path = '/chapter_exam/' + this.$route.params.tid + '/' + this.$route.params.pid
        } else {
          path = '/exam/' + this.$route.params.tid + '/' + this.$route.params.pid
        }
        this.$router.push({path: path})
      },
      clearExamState () {
        this.$store.commit('clearExamState')
      },
      getPaperInfo () {
        Indicator.open({
          text: '加载中…'
        })
        let that = this
        let data = {
          id: this.$route.params.pid,
          success: function (info) {
            Indicator.close()
            that.paperInfo = info
          },
          error: function (error) {
            Indicator.close()
            if (!error) {
              error = '试卷不存在或不可用'
            }
            Toast({
              message: error,
              duration: 1500
            })
          }
        }
        this.$store.dispatch('getPaperInfo', data)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .paperInfo
    position absolute
    z-index 1
    width 100%
    height 100%
    flex 1
    display flex
    flex-direction column
    overflow hidden
    background #FBF9FE
    color #333
    .mint-button--default.is-plain
      border 1px solid #bbb
      font-style italic
    .head
      position absolute
      z-index 10
      display flex
      justify-content center
      align-items center
      top 3vw
      left 3vw
      width 30px
      height 30px
      border 1px solid #fff
      border-radius 15px
      background rgba(7, 17, 27, 0.6)
      color #fff
      .icon
        font-size 15px
    .info
      flex 1
      display flex
      flex-direction column
      align-items center
      .top
        flex 1
        display flex
        flex-direction column
        align-items center
        justify-content flex-end
        h1
          font-size 24px
          text-align center
          line-height 30px
          overflow hidden
          padding 0 15px
        small
          padding 10px 0
          font-size 12px
      .detail
        flex 3
        display flex
        width 100%
        flex-direction column
        align-items center
        justify-content flex-start
        span
          width 80%
          display flex
          flex-direction row
          align-items center
          padding 10px
          font-size 14px
      .start
        width 100%
        .mint-button
          height 50px
          width 100%
          color #fff
          letter-spacing 2px
          background #686e76
          border-radius 0
</style>
