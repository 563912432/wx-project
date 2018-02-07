<template>
  <div class="hello">
    <div class="swiper" id="swiper">
      <mt-swipe :auto="400000">
        <mt-swipe-item v-for="item in gallery">
          <a :href="item.href"><div :style="'height:100%;background: url(\'' + item.src + '\') no-repeat center;background-size:auto 200px;'"></div></a>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="wrapper">
      <div class="recommend">
        <div class="header"><span class="title">—&nbsp;&nbsp;&nbsp;&nbsp;视频推荐&nbsp;&nbsp;&nbsp;&nbsp;—</span></div>
        <div class="list">
          <div v-for="item in videoCourse" class="item" @click="goDetail(item.course_type,item.id)">
            <div class="thumb">
              <img :src="uploadPath + item.thumb_crop" alt="">
            </div>
            <div class="info">
              <!--div class="course-title"-->{{item.title}}<!--/div-->
            </div>
          </div>
        </div>
        <div class="more_bottom"><router-link tag="span" class="" :to="{ path: 'video'}">更多 &gt;</router-link></div>
      </div>
      <div class="recommend">
        <div class="header"><span class="title">—&nbsp;&nbsp;&nbsp;&nbsp;实训推荐&nbsp;&nbsp;&nbsp;&nbsp;—</span></div>
        <div class="list">
          <div v-for="item in scCourse" class="item" @click="goDetail(item.course_type,item.id)">
            <div class="thumb">
              <img :src="uploadPath + item.thumb_crop" alt="">
            </div>
            <div class="info">
              <!--div class="course-title"-->{{item.title}}<!--/div-->
            </div>
          </div>
        </div>
        <div class="more_bottom"><router-link tag="span" class="" :to="{ path: 'tk', query: { cid: this.scCid }}">更多 &gt;</router-link></div>
      </div>
      <div class="recommend">
        <div class="header"><span class="title">—&nbsp;&nbsp;&nbsp;&nbsp;题库推荐&nbsp;&nbsp;&nbsp;&nbsp;—</span></div>
        <div class="list">
          <div v-for="item in tkCourse" class="item" @click="goDetail(item.course_type,item.id)">
            <div class="thumb">
              <img :src="uploadPath + item.thumb_crop" alt="">
            </div>
            <div class="info">
              <!--div class="course-title"-->{{item.title}}<!--/div-->
            </div>
          </div>
        </div>
        <div class="more_bottom"><router-link tag="span" class="" :to="{ path: 'tk'}">更多 &gt;</router-link></div>
      </div>
      <!--最新资讯-->
      <div class="news">
        <div class="header">
          <div class="title">
            <span class="title_tag"></span>
            <span>最新资讯</span>
          </div>
          <router-link tag="div" class="more clearfix" :to="{ path: 'news'}">
            更多 >
          </router-link>
        </div>
        <div class="list">
          <div v-for="item in news" class="item" @click="goNews(item.id)">
            <div class="info">
              <div class="m_article_title">{{item.title}}</div>
              <!--div class="m_article_thumb"><img v-if="item.thumb" :src="uploadPath + item.thumb" alt="" /><span>{{item.summary}}</span>
                <div style="clear:both"></div>
              </div-->
              <!--div v-if="item.summary" class="m_article_summary">{{item.summary}}</div-->
              <div class="m_article_desc">
                <span class="m_article_channel">{{item.source}}</span>
                <span class="m_article_time"> {{item.addtime}} / 阅读 {{item.click}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus' rel='stylesheet/stylus'>
  .hello
    flex 1
    display flex
    flex-direction column
    overflow-x hidden
    overflow-y auto
    background #f1f1f1
  .swiper
    flex 0 0 200px
    overflow auto
  .recommend
    flex 1
    display flex
    flex-direction column
    margin 15px 0
    padding 20px 0
    overflow auto
    background #fff
    .more_bottom
      padding 10px
      color #999
      text-align center
      font-size 14px
      span
        padding 5px 10px
    .header
      position relative
      background:transparent
      text-align center
      padding 10px
      .title
        text-align left
        font-weight bold
      .title_tag
        display inline-block
        width 10px
        height 18px
        background #ff9900
        vertical-align text-top
        margin-right 10px
      .more
        position absolute
        top 0px
        font-size 16px
        color #999
        padding 0px 10px 5px 10px
        right 0
    .list
      flex 1
      display flex
      flex-flow row wrap
      align-content flex-start
      overflow auto
      padding 5px 12px
      .item
        flex 0 0 50%
        padding 10px
        color #666
        overflow hidden
        .thumb
          width 100%
          img
            border-radius 5px
        .info
          width 100%
          font-size 14px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
  .news
    margin 15px 0 0 0
    padding 20px 0
    overflow auto
    background #fff
    .header
      position relative
      background:transparent
      text-align center
      padding 5px
      .title
        text-align left
        font-weight bold
      .title_tag
        display inline-block
        width 10px
        height 18px
        background #ff9900
        vertical-align text-top
        margin-right 10px
      .more
        position absolute
        top 6px
        font-size 15px
        color #999
        padding 0px 15px 5px 10px
        right 5px
    .list
      overflow hidden
      padding 5px 25px
      .item
        width 100%
        border-top 1px solid #f1f1f1
        padding 15px 0
        overflow hidden
        .m_article_title
          font-size 16px
          margin-bottom .2rem
          color #404040
          line-height 24px
          width 100%
        .m_article_summary
          line-height 12px
          height 12px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          font-size 12px
          color #999
          margin-bottom 5px
          width 100%
        .m_article_thumb
          font-size 12px
          color #999
          padding-bottom 5px
          img
            float left
            width 30%
            border-radius 5px
            margin-right 5px
        .m_article_channel
          display inline-block
          color #f33
          font-size 12px
          padding 2px
          line-height 12px
          margin-right .1rem
          border 1px solid #f33
          border-radius 1px
          background-size 100% 100%
        .m_article_time
          color #888
          display inline-block
          font-size 14px
</style>
<script type="es6">
  import 'mint-ui/lib/style.css'
  import {Swipe} from 'mint-ui/lib/swipe'
  import {SwipeItem} from 'mint-ui/lib/swipe-item'
  import {Loadmore} from 'mint-ui/lib/loadmore'
  import {Toast, Indicator} from 'mint-ui'
  import {mapGetters} from 'vuex'
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
        scCourse: [],
        videoCourse: [],
        tkCourse: [],
        news: [],
        gallery: [],
        scCid: ''
      }
    },
    created () {
      this.$store.commit('setSelected', '1')
      this.getData()
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
      },
      goRouter (index) {
        this.$router.push({path: '/tk/' + index})
      },
      getData () {
        Indicator.open({
          text: '数据获取中...',
          spinnerType: 'snake'
        })
        let that = this
        let callBack = {
          success: function (data) {
            that.tkCourse = data.tkCourse,
            that.videoCourse = data.videoCourse,
            that.scCourse = data.scCourse,
            that.gallery = data.gallery,
            that.news = data.news,
            that.scCid = data.scCid
            Indicator.close()
          },
          error: function (error) {
            if (!error) {
              error = '数据获取失败'
            }
            Indicator.close()
            Toast({
              message: error,
              iconClass: 'mint-toast-icon mintui mintui-field-warning',
              duration: 1500
            })
          }
        }
        this.$store.dispatch('getIndexData', callBack)
      },
      goDetail (type, id) {
        switch (+type) {
          case this.$store.state.courseType.video:
            this.$router.push({path: '/videoIntro/' + id})
            break
          default :
            this.$router.push({path: '/tkIntro/' + id})
        }
      },
      goNews (id) {
        this.$router.push({path: '/news/' + id})
      }
    },
    computed: {
      ...mapGetters(['uploadPath'])
    }
  }
</script>
