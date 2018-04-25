<template>
  <div class="container">
    <div class="course">
      <div class="head" @click="goBack">
        <i class="icon iconfont icon-fanhui1"></i>
      </div>
      <div id="player" class="player_wrap"></div>
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
      <ul class="nav">
        <li @click="active = 'tab-container1'" :class="{ active: (active == 'tab-container1') }">详情</li>
        <li @click="active = 'tab-container2'" :class="{ active: (active == 'tab-container2') }">列表</li>
      </ul>
      <div class="detail">
        <mt-tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
          <mt-tab-container-item id="tab-container1">
            <div class="detail_body" v-html="courseInfo.info"></div>
          </mt-tab-container-item>
          <mt-tab-container-item id="tab-container2">
            <div class="list-item" v-for="item in list" :key="item.chapter">
              <!--div class="chpt-name">{{item.chapter_name}}</div-->
              <div class="part" v-for="n in item.video">
                <i v-if="n.for_guest=='1'" class="icon iconfont icon-bofang1"></i>
                <div v-else style="width: 25px;text-align: center;"><i class="round">●</i></div>
                <span v-if="n.for_guest=='1'" @click.self="play" :code="n.code" class="vtitle">{{n.title}}</span>
                <span v-else class="vtitle">{{n.title}}</span>
                <span v-if="n.for_guest=='1'" class="mint-badge is-warning is-size-small vbadge">试看</span>
              </div>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
      <div class="bottom">
        <div class="tk" @click="goDetail(courseInfo.course_type,courseInfo.id)">
          点击进入
        </div>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import {COMMON} from '../mixins'
  import {Indicator, Toast, TabContainer, TabContainerItem} from 'mint-ui'
  import {mapGetters} from 'vuex'
  import polyvObject from 'polyvObject'
  export default {
    mixins: [COMMON],
    name: 'videoIntro',
    data () {
      return {
        active: 'tab-container1',
        courseInfo: [],
        list: []
      }
    },
    created () {
      this.$store.commit('setSelected', '3')
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
            // Indicator.close()
            that.courseInfo = data
            that.getVideoChapterList()
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
      play (event) {
        // 处理样式
        let el = document.getElementsByClassName('part')
        if (el.length > 0) {
          for (let i = 0; i < el.length; i++) {
            el[i].style.color = '#999'
            el[i].style.background = '#fff'
          }
        }
        let elParent = event.srcElement.parentNode
        elParent.style.color = 'red'
        elParent.style.background = '#eee'
        // 处理数据
        let code = event.srcElement.attributes.code.value
        let playerHtml = document.getElementById('player')
        playerHtml.innerHTML = ''

        let that = this
        // 获取视频播放签名
        this.$http.get(this.$store.state.host + 'Api/Video/getPolySign/code/' + code, {timeout: 5000}).then(response => {
          if (response.ok && response.body.status === 1) {
            let polySign = JSON.parse(response.body.info)
            that.player = polyvObject('#player').videoPlayer({
              'width': '100%',
              'height': '200',
              'vid': code,
              'ts': polySign.ts,
              'sign': polySign.sign
            })
            that.player.j2s_resumeVideo()
          } else {
            console.log(response.body.info)
          }
        }).catch(() => {
          console.log('连接超时')
        })
      },
      getVideoChapterList () {
        let that = this
        let data = {
          id: this.$route.params.id,
          success: function (list) {
            Indicator.close()
            that.list = list
          },
          error: function (error) {
            if (!error) {
              error = '获取失败'
            }
            Indicator.close()
            Toast({
              message: error,
              iconClass: 'mint-toast-icon mintui mintui-field-warning',
              duration: 1500
            })
            that.$router.go(-1)
          }
        }
        this.$store.dispatch('getVideoChapterList', data)
      },
      goDetail (type, id) {
        this.$router.push({path: '/video/' + id})
      }
    },
    computed: {
      ...mapGetters(['uploadPath', 'myCourses', 'courseType', 'createSignature'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .round
    width 16px
    height 16px
    display inline-block
    font-size 14px
    line-heigth 16px
    text-align center
    text-decoration none
  .container
    position absolute
    top 0
    left 0
    z-index 10
    width 100%
    height 100%
    background #f7f7f7
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
    .player_wrap
      position absolute
      width 100%
      background transparent
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
    .nav
      margin-top 10px
      padding 0px
      border-bottom 1px solid #f1f1f1
      background-color #ffffff
      height 52px
      width 100%
      display flex
      li
        height 100%
        line-height 52px
        text-align center
        width 100px
        color #333
        font-size 16px
        border-top solid 2px transparent
        cursor pointer
      .active
        color #197590
        border-top solid 2px #197590
    .detail_title
      margin 0 15px 5px 15px
      padding 15px 0
      border-bottom 1px solid #fafafa
      text-align center
    .courseInfo
      height 200px
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
      background #fff
      flex 1
      padding 5px 10px
      line-height 28px
      overflow auto
      .list-item
        display flex
        flex-direction column
        margin-bottom 10px
        font-size 3.8vw
        color #999
        .chpt-name
          color #555
          display: flex
          flex-direction column
          align-items flex-start
          box-sizing border-box
          border-bottom 1px solid #f3f3f3
          padding 10px 0 10px 15px
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
          margin-bottom 5px
        .part
          display flex
          flex-direction row
          align-items center
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
          height 35px
          font-size 14px
        .icon
          flex 0 0 25px
          padding-left 0px
          text-align: center
        .vtitle
          flex 1 1 0
          text-overflow ellipsis
          overflow hidden
        .vbadge
          line-height 14px
          vertical-align middle
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
