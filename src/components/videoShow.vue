<template>
  <div class="video-show">
    <div class="video">
      <div class="ctrl" @click="goBack">
        <i class="icon iconfont icon-fanhui1"></i>
      </div>
      <div id="player"></div>
    </div>
    <div class="chapter">
      <div class="list">
        <div class="list-item" v-for="item in list" :key="item.chapter">
          <div class="chpt-name">{{item.chapter_name}}</div>
          <div class="part" v-for="n in item.video">
            <i class="icon iconfont icon-bofang1"></i>
            <span @click.self="play" :code="n.code">{{n.title}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {COMMON} from '../mixins'
  import {Indicator, Toast} from 'mint-ui'
  import polyvObject from 'polyvObject'
  export default {
    mixins: [COMMON],
    name: 'videoShow',
    data () {
      return {
        list: [],
        player: null,
        hasBuy: true
      }
    },
    created () {
      this.$store.commit('setSelected', '3')
      this.getMyCourse()
    },
    methods: {
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
        this.player = polyvObject('#player').videoPlayer({
          'width': '100%',
          'height': '200',
          'vid': code
        })
        this.player.j2s_resumeVideo()
      },
      getVideoChapterList () {
        Indicator.open({
          text: '加载中…',
          spinnerType: 'snake'
        })
        let that = this
        let data = {
          id: this.$route.params.vid,
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
      getMyCourse () {
        let that = this
        let data = {
          success: function (list) {
            that.myCourses = list
            // 如果当前的访问的课程没有开通的话 提示要开通
            if (!that.myCourses[that.$route.params.vid]) {
              that.$router.push({path: '/buy/' + that.$route.params.vid, query: {redirect: that.$route.path}})
            } else {
              that.getVideoChapterList()
            }
          },
          error: function (error) {
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
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .video-show
    flex 1
    display flex
    flex-direction column
    overflow hidden
    .video
      position relative
      height 200px
      background: url('/static/img/course_card.jpg') no-repeat
      background-size cover
      .ctrl
        position absolute
        z-index 1000
        top 10px
        left 10px
        width 30px
        height 30px
        border-radius 15px
        box-sizing border-box
        border 1px solid #fff
        background rgba(0, 0, 0, 0.5)
        display flex
        align-items center
        justify-content center
        .icon
          color #fff
    .chapter
      flex 1
      display: flex
      overflow hidden
      .list
        flex 1
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
            width 50px
            padding-left 15px
            text-align: center
          span
            flex 1
</style>
