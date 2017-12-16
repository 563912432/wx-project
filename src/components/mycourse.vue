<template>
  <div class="mycourse">
    <div class="head">
      <div class="left" @click="goBack">
        <i class="icon iconfont icon-fanhui1"></i>
      </div>
      <div class="title">我的课程</div>
      <div class="right"></div>
    </div>
    <div class="list">
      <div class="item" v-for="course in myCourses" @click="startStudy(course.course_type, course.id)">
        <img :src="uploadPath + course.thumb" alt="course.title">
        <div class="info-right">
          <h2 class="course-title">{{course.title}}</h2>
          <div class="summary" v-html="course.info"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {COMMON} from '../mixins'
  import {Indicator, Toast, Button} from 'mint-ui'
  import {mapGetters} from 'vuex'
  export default {
    mixins: [COMMON],
    name: 'mycourse',
    components: {
      Indicator,
      Toast,
      'v-button': Button
    },
    computed: {
      ...mapGetters(['uploadPath', 'myCourses'])
    },
    data () {
      return {
        // myCourses: []
      }
    },
    created () {
      this.initData()
    },
    methods: {
      goBack () {
        this.$router.push({path: '/member'})
      },
      initData () {
        Indicator.open('载入中…')
        let that = this
        let data = {
          success: function (list) {
            Indicator.close()
            that.$store.commit('setMyCourses', list)
            // that.myCourses = list
          },
          error: function (error) {
            Indicator.close()
            if (!error) {
              error = '获取我的课程列表失败'
            }
            let instance = Toast({
              message: error,
              iconClass: 'mint-toast-icon mintui mintui-field-warning'
            })
            setTimeout(() => {
              instance.close()
            }, 1500)
          }
        }
        this.$store.dispatch('getMyCourse', data)
      },
      startStudy (type, id) {
        switch (+type) {
          case this.$store.state.courseType.tk:
            this.$router.push({path: '/tkDetail/' + id})
            break
          case this.$store.state.courseType.video:
            this.$router.push({path: '/video/' + id})
            break
          default:
            Toast({
              message: '此课程暂不支持手机端操作，请在PC端练习'
            })
            console.log('暂无相应类型的处理逻辑')
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .mycourse
    flex 1
    display flex
    flex-direction column
    position absolute
    z-index 1
    top 0
    width 100%
    height 100%
    background-color: #FBF9FE
    .head
      height 50px
      font-size 18px
      display flex
      flex-direction row
      align-items center
      border-bottom 1px solid #ddd
      box-shadow: 2px 2px 2px rgba(175, 209, 252, 0.5);
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
      overflow auto
      .item
        font-size 16px
        padding 5px
        border-bottom 1px solid #f3f3f3
        display flex
        flex-direction row
        margin-bottom 5px
        background #fff
        align-items center
        height 100px;
        img
          width 120px;
          height 80px
        .info-right
          flex 1
          display flex
          flex-direction column
          align-items flex-start
          padding 0 5px
          overflow hidden
          .course-title
            height 30px;
            line-height 30px;
            width: 100%;
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
          .summary
            height 50px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            font-size 12px
            line-height 17px
            color #999
</style>
