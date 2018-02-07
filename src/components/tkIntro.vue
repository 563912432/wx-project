<template>
  <div class="container">
    <div class="course">
      <div class="head" @click="goBack">
        <i class="icon iconfont icon-fanhui1"></i>
      </div>
      <!--div class="top">
        <div class="title">{{courseInfo.title}}</div>
      </div>
      <div class="thumb_wrap">
        <div :style="'width:100%;height:100%;background:url('+uploadPath + courseInfo.thumb+')  center center / 100% no-repeat'"></div>
      </div-->
      <div class="courseInfo">
        <h1><span>
        {{courseInfo.title}}
      </span></h1>
        <div v-if="courseInfo.brief" v-html="courseInfo.brief.substr(0,80)">...</div>
        <div v-else>暂无简介</div>
        <img v-if="courseInfo.thumb" :src="uploadPath + courseInfo.thumb" :alt="courseInfo.title">
      </div>
      <div class="detail_title">—&nbsp;&nbsp;&nbsp;&nbsp;课程详情&nbsp;&nbsp;&nbsp;&nbsp;—</div>
      <div class="detail">
        <div class="detail_body" v-html="courseInfo.info"></div>
      </div>
      <div class="bottom">
        <div v-if="+courseInfo.course_type === courseType.tk" class="tk" @click="goDetail(courseInfo.course_type,courseInfo.id)">
          点击进入
        </div>
        <div v-else class="op">
          请在PC端体验实训课程
        </div>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import {COMMON} from '../mixins'
  import {Indicator, Toast} from 'mint-ui'
  import {mapGetters} from 'vuex'
  export default {
    mixins: [COMMON],
    name: 'tkIntro',
    data () {
      return {
        courseInfo: []
      }
    },
    created () {
      this.$store.commit('setSelected', '2')
      this.getScDetail()
    },
    methods: {
      getScDetail () {
        if (this.courseInfo.length > 0) {
          return
        }
        Indicator.open({
          text: '获取课程信息…',
          spinnerType: 'snake'
        })
        let that = this
        let data = {
          id: that.$route.params.id,
          success: function (data) {
            Indicator.close()
            that.courseInfo = data
          },
          error: function (error) {
            Indicator.close()
            if (!error) {
              error = '课程不存在或不可用'
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
        this.$store.dispatch('getCourseInfoById', data)
      },
      goDetail (type, id) {
        this.$router.push({path: '/tkDetail/' + id})
      }
    },
    computed: {
      ...mapGetters(['uploadPath', 'myCourses', 'courseType', 'createSignature'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .container
    position absolute
    top 0
    left 0
    z-index 10
    width 100%
    height 100%
    background #fff
  .course
    flex 1
    display flex
    width 100%
    height 100%
    flex-direction column
    overflow hidden
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
      border 1px solid #ddd
      border-radius 15px
      background rgba(7, 17, 27, 0.6)
      color #fff
      .icon
        font-size 15px
    .top
      height 50px
      display flex
      align-items center
      justify-content center
      font-size 18px
      color #eeeeee
      position relative
      overflow hidden
      background #35495e
      .bg
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        filter blur(1px)
        z-index -1
    .detail_title
      margin 0 15px 5px 15px
      padding 15px 0
      border-bottom 1px solid #fafafa
      text-align center
    .courseInfo
      height 180px
      overflow hidden
      position: relative;
      background rgba(7, 17, 27, 0.2)
      display flex
      flex-direction column
      align-items center
      h1
        flex 1
        font-size 7vw
        color #fff
        width 100%
        padding 0 15px
        display flex
        align-items flex-end
        justify-content center
        span
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
      div
        height 80px
        color #f3f3f3
        font-size 12px
        padding 10px 20px
      img
        width: 100%
        height 180px
        position absolute
        top 0
        z-index -1
        filter blur(10px)
    .thumb_wrap
      text-align center
      width 100%
      flex 0 0 30%
    .detail
      flex 1
      padding 5px 20px
      line-height 28px
      overflow auto
    .bottom
      margin-top 5px
      height 50px
      line-height 50px
      text-align center
      .tk
        background #3bb4f2
        color #fff
      .op
        background #f1f1f1
</style>
