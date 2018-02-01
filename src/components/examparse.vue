<template>
  <div>
    <mt-popup v-model="isShow" position="bottom" :closeOnClickModal="false">
      <span class="close" @click="setVisible"><i class="icon iconfont icon-close"></i> </span>
      <div class="parse-info" @click="setVisible">
        <h2>名师解析</h2>
        <div class="info">
          <div>
            <span>正确答案：{{right_answer ? right_answer : '见解析'}}</span>
            <mt-button v-if="video" @click.stop="videoShow" type="primary" size="small"　style="margin-left:10px">视频解析</mt-button>
          </div>
          <div v-html="parse"></div>
        </div>
      </div>
    </mt-popup>
    <!-- 视频解析 -->
    <parseVideo :videoCode="video"></parseVideo>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Popup} from 'mint-ui'
  import parseVideo from '@/components/parseVideo'
  import {mapState} from 'vuex'
  export default {
    name: 'card',
    components: {
      Popup,
      parseVideo
    },
    props: ['parse', 'answer', 'index', 'examType', 'video'],
    computed: {
      ...mapState(['typeList']),
      isShow: {
        get: function () {
          return this.$store.state.examState.examParse
        },
        set: function (newValue) {
          this.$store.state.examState.examParse = newValue
        }
      },
      right_answer () {
        if (typeof this.answer === 'object' && this.answer !== null) {
          if (+this.examType === this.typeList.multi ||
            +this.examType === this.typeList.multi_five ||
            +this.examType === this.typeList.qhzhmx) {
            return this.answer.toString()
          }
          return this.answer[this.index].toString()
        } else if (+this.examType === this.typeList.judge) {
          return this.answer.toUpperCase() === 'A' ? '正确' : '错误'
        }
        return this.answer
      }
    },
    methods: {
      setVisible () {
        this.$store.commit('setExamParse', false)
      },
      videoShow () {
        this.$store.commit('setParseVideo', true)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .mint-popup
    width 100%
    height 50%
    overflow auto
    flex 1
    display flex
    flex-direction column
    .close
      position absolute
      z-index 5
      right 10px
      top 10px
      width 20px
      height 20px
      color #fff
    .parse-info
      flex 1
      display flex
      flex-direction column
      overflow auto
      h2
        position fixed
        width 100%
        font-size 14px
        padding 10px 5px
        color #fff
        background #3f5977
        .icon
          font-size 18px
      .info
        padding 50px 20px 0 20px
        color #35495e
        font-size 14px
        line-height 25px
        letter-spacing 1px
</style>
