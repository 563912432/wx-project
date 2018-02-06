<template>
  <div class="news">
    <div class="head" @click="goBack">
      <i class="icon iconfont icon-fanhui1"></i>
    </div>
    <div class="top">
      <div class="title">全部资讯</div>
      <!--img class="bg" src="/static/img/course_card.jpg" alt=""-->
    </div>
    <div class="chapter">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottomPullText='bottomText' :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
        <div class="list">
          <div v-for="item in news" class="item" @click="goNews(item.id)">
            <div class="info">
              <div class="m_article_title">{{item.title}}</div>
              <div class="m_article_thumb"><img v-if="item.thumb" :src="uploadPath + item.thumb" alt="" /><span>{{item.summary}}</span>
                <div style="clear:both"></div>
              </div>
              <!--div v-if="item.thumb"><img :src="uploadPath + item.thumb" alt="" style="width:30%" /></div-->
              <!--div v-if="item.summary" class="m_article_summary">{{item.summary}}</div-->
              <div class="m_article_desc">
                <span class="m_article_channel">{{item.source}}</span>
                <span class="m_article_time"> {{item.addtime}} / 阅读 {{item.click}}</span>
              </div>
            </div>
          </div>
        </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script type="es6">
  import {COMMON} from '../mixins'
  import {Indicator, Toast, Loadmore} from 'mint-ui'
  import {mapGetters} from 'vuex'
  export default {
    mixins: [COMMON],
    name: 'news',
    data () {
      return {
        news: [],
        p: 1,
        pageTotal: '',
        bottomText: '上拉加载更多...',
        allLoaded: false
      }
    },
    created () {
      this.$store.commit('setSelected', '1')
      this.getNewsList()
    },
    methods: {
      goNews (id) {
        this.$router.push({path: '/news/' + id})
      },
      //下拉刷新
      loadTop () {
        this.p = 1
        this.news = []
        this.getNewsList()
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom () {
        this.p += 1
        this.getNewsList()
        this.$refs.loadmore.onBottomLoaded()
      },
      getNewsList () {
        let that = this
        let data = {
          p: that.p,
          success: function (data) {
            //alert('qunimei')
            that.news = that.news.concat(data.news)
            that.pageTotal = data.pageTotal
            that.isLastPage()
          },
          error: function (error) {

          }
        }
        this.$store.dispatch('getNewsList', data)
      },
      isLastPage () {
        if(this.p == this.pageTotal){
          this.allLoaded = true;
        }else{
          this.allLoaded = false;
        }
      }
    },
    computed: {
      ...mapGetters(['uploadPath'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
    .chapter
      flex 1
      overflow auto
      padding 5px 20px
      .list
        overflow hidden
        .item
          width 100%
          border-bottom 1px solid #f1f1f1
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
            color #666
            display inline-block
            font-size 14px
</style>
