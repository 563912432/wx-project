<template>
  <div class="tk-list">
    <div class="head" @click="goBack">
      <i class="icon iconfont icon-fanhui1"></i>
    </div>
    <div class="top">
      <div class="title">{{course.title}}</div>
      <img class="bg" src="/static/img/course_card.jpg" alt="">
    </div>
    <div class="course">
      <div class="list">
        <div v-for="item in course.list" class="item" @click="goDetail(item.id)">
          <div class="thumb">
            <img :src="uploadPath + item.thumb" alt="">
          </div>
          <div class="info">
            <div class="course-title">{{item.title}}</div>
            <div class="course-summary">{{item.info}}</div>
            <!--<div class="course-price">￥{{item.promotion_price}}</div>-->
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import {Toast, Indicator} from 'mint-ui'
  import {mapGetters} from 'vuex'
  export default {
    name: 'tkList',
    components: {
      Toast,
      Indicator
    },
    data () {
      return {
        course: []
      }
    },
    created () {
      this.$store.commit('setSelected', '2')
      this.getCourseList()
    },
    computed: {
      ...mapGetters(['uploadPath'])
    },
    methods: {
      goBack () {
        this.$router.go(-1)
      },
      goDetail (n) {
        this.$router.push({path: '/tkDetail/' + n})
      },
      getCourseList () {
        let that = this
        Indicator.open({
          text: '列表获取中...',
          spinnerType: 'snake'
        })
        let data = {
          id: this.$route.params.cid,
          success: function (courseData) {
            Indicator.close()
            that.course = courseData
          },
          error: function (info) {
            if (!info) {
              info = '获取课程列表出错'
            }
            Indicator.close()
            Toast({
              message: info,
              iconClass: 'mint-toast-icon mintui mintui-field-warning',
              duration: 1500
            })
            setTimeout(function () {
              that.$router.go(-1)
            }, 1500)
          }
        }
        this.$store.dispatch('getCourseList', data)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .tk-list
    position absolute
    z-index 1
    width 100%
    height 100%
    background #fff
    flex 1
    display flex
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
      height 150px
      display flex
      align-items center
      justify-content center
      font-size 8vw
      color #eeeeee
      position relative
      overflow hidden
      background rgba(7, 17, 27, 0.5)
      .bg
        position absolute
        top 0
        left 0
        width 100%
        height 100%
        filter blur(1px)
        z-index -1
    .course
      flex 1
      display: flex
      overflow hidden
      .list
        overflow auto
        .item
          height 100px
          display flex
          flex-direction row
          padding 5px
          border-bottom 1px solid #eee
          .thumb
            width 150px
            padding-right 15px
            overflow hidden
            img
              height 100px
          .info
            flex 1
            display flex
            flex-direction column
            overflow hidden
            .course-title
              height 30px;
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
            .course-summary
              height 60px;
              font-size 12px
              line-height 20px
              color #999
              overflow hidden
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
            .course-price
              flex 1
              display flex
              align-items flex-end
              color #ff0000
              font-size 3.5vw


</style>
