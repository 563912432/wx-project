<template>
  <div class="video">
    <div class="head">
      <div class="title">全部视频</div>
    </div>
    <div class="list">
      <div class="video-item" v-for="video in videoList" @click="showVideo(video.id)">
        <div class="video-item-wrapper">
          <div class="video-cate">
            {{video.category.title}}
          </div>
          <div class="info">
            <div class="video-title">
              <i v-show="video.has_course" class="icon iconfont icon-taocan"></i>{{video.title}}
            </div>
            <div class="summary" v-html="video.info"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Navbar, TabItem, Indicator, Toast, Badge} from 'mint-ui'
  export default {
    name: 'video',
    data () {
      return {
        videoSelected: '0',
        videoList: []
      }
    },
    components: {
      Navbar,
      TabItem,
      Badge,
      Indicator,
      Toast
    },
    created () {
      this.$store.commit('setSelected', '3')
      if (this.$store.state.videoList.length > 0) {
        this.videoList = this.$store.state.videoList
      } else {
        this.getList()
      }
    },
    methods: {
      showVideo (index) {
        this.$router.push({path: '/videoIntro/' + index})
      },
      getList () {
        Indicator.open({
          text: '加载中…',
          spinnerType: 'snake'
        })
        let that = this
        let data = {
          success: function (list) {
            Indicator.close()
            that.videoList = list
          },
          error: function (error) {
            Indicator.close()
            if (!error) {
              error = '视频列表获取失败'
            }
            Toast({
              message: error,
              iconClass: 'mint-toast-icon mintui mintui-field-warning',
              duration: 1500
            })
            that.$router.go(-1)
          }
        }
        this.$store.dispatch('getCourseListOfVideo', data)
      }
    },
    watch: {
      videoSelected (newValue, oldValue) {
        if (newValue === oldValue) {
          return
        }
        switch (newValue) {
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel='stylesheet/stylus'>
  .video
    flex 1
    display flex
    flex-direction column
    overflow hidden
    background #FBF9FE
    .head
      height 50px
      font-size 18px
      display flex
      flex-direction row
      align-items center
      background #35495E
      color #fff
      .left, .right
        padding 0 10px
        overflow hidden
        height 100%
        display flex
        align-items center
        justify-content center
        .icon
          font-size 22px
      .title
        flex 1
        text-align center
        display flex
        flex-direction column
        small
          font-size 12px
    .list
      flex 1
      display flex
      flex-flow row wrap
      align-content flex-start
      overflow auto
      .video-item
        flex 0 0 50%
        .video-item-wrapper
          margin 10px 2px 10px 2px
          border 1px solid #ddd
          box-sizing border-box
          border-radius 5px
          background url('/static/img/course_card.jpg')
          background-size contain
          overflow hidden
          color #fff
          .video-cate
            height 30px
            padding 2px 10px 2px 10px
            display flex
            line-height 30px
            font-size 14px
            background linear-gradient(270deg, rgba(75, 150, 220, .7), #4b96dc)
            .icon
              font-size 18px
              margin-right 3px
          .info
            height 80px
            overflow hidden
            padding 5px 5px
            background #fff
            color #ccc
            font-size: 3.5vw
            .video-title
              color #999
              font-size 14px
              overflow hidden
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
            .summary
              color #ccc
              font-size 12px
              overflow hidden
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
</style>
