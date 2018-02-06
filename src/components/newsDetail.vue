<template>
  <div class="container">
    <div class="news">
      <div class="head" @click="goBack">
        <i class="icon iconfont icon-fanhui1"></i>
      </div>
      <div class="top">
        <div class="title">资讯详情</div>
        <!--img class="bg" src="/static/img/course_card.jpg" alt=""-->
      </div>
      <div class="news">
        <div class="news_header">
          <h3 class="content_title">{{newsDetail.title}}</h3>
          <div class="content_intro">
            <!--span class="m_article_channel">{{newsDetail.source}}</span-->
            <span class="m_article_time">阅读 {{newsDetail.click}}&nbsp;&nbsp;/&nbsp;&nbsp;{{newsDetail.addtime}}  </span>
          </div>
        </div>
        <div class="news_body" v-html="newsDetail.detail"></div>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import {COMMON} from '../mixins'
  import {Indicator, Toast} from 'mint-ui'
  export default {
    mixins: [COMMON],
    name: 'newsDetail',
    data () {
      return {
        newsDetail: []
      }
    },
    created () {
      this.$store.commit('setSelected', '1')
      this.getNewsDetail()
    },
    methods: {
      getNewsDetail () {
        let that = this
        let data = {
          id: that.$route.params.id,
          success: function (data) {
            //alert('qunimei')
            that.newsDetail = data.newsDetail
          },
          error: function (error) {

          }
        }
        this.$store.dispatch('getNewsDetail', data)
      }
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
  .news
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
    .news
      flex 1
      overflow auto
      .news_header
        padding 20px 20px 10px 20px
        margin-bottom 10px
        background #f5f5f5
        .content_title
          font-weight bold
          font-size 1.17em
        .content_intro
          font-size 14px
          text-align left
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
            line-height 30px
      .news_body
        padding 0 20px
        line-height 28px
</style>
