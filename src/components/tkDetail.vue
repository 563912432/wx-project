<template>
  <div class="tk-detail">
    <div class="head" @click="goBack">
      <i class="icon iconfont icon-fanhui1"></i>
    </div>
    <div v-if="+courseInfo.course_type !== courseType.op" class="courseInfo">
      <h1><span>
        {{courseInfo.title}}
      </span></h1>
      <div v-if="courseInfo.info" v-html="courseInfo.info.substr(0,80)">...</div>
      <div v-else>暂无简介</div>
      <img v-if="courseInfo.thumb" :src="uploadPath + courseInfo.thumb" :alt="courseInfo.title">
    </div>
    <div v-else class="courseInfo ;courseOp">
      <h1><span>
        {{courseInfo.title}}
      </span></h1>
      <div v-if="courseInfo.info" v-html="courseInfo.info.substr(0,80)">...</div>
      <div v-else>暂无简介</div>
      <div class="remark">注意：此系统需要在PC端进行使用</div>
      <img v-if="courseInfo.thumb" :src="uploadPath + courseInfo.thumb" :alt="courseInfo.title">
    </div>
    <div v-if="+courseInfo.course_type !== courseType.op" class="nav">
      <div class="row">
        <span @click="goRouter(1)">
          <i class="icon iconfont icon-zhuantilianxi"></i>
          <b>章节测试</b>
        </span>
        <span @click="goRouter(2)">
          <i class="icon iconfont icon-Ontrial"></i>
          <b>模拟测试</b>
        </span>
      </div>
      <div class="row">
        <span @click="goRouter(3)">
          <i class="icon iconfont icon-vip1"></i>
          <b>考前密卷</b>
        </span>
        <span v-show="isShow" @click="goRouter(7)">
          <i class="icon iconfont icon-dayi"></i>
          <b>我的答疑</b>
        </span>
        <span @click="goRouter(4)">
          <i class="icon iconfont icon-jindu"></i>
          <b>载入进度</b>
        </span>
      </div>
      <div class="row">
        <span @click="goRouter(5)">
          <i class="icon iconfont icon-shoucang"></i>
          <b>我的收藏</b>
        </span>
        <span @click="goRouter(6)">
          <i class="icon iconfont icon-cuotiji"></i>
          <b>错题强化</b>
        </span>
      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import {Indicator, Toast} from 'mint-ui'
  import {mapGetters} from 'vuex'
  import {COMMON} from '../mixins'
  export default {
    mixins: [COMMON],
    name: 'tkDetail',
    components: {
      Indicator, Toast
    },
    computed: {
      ...mapGetters(['uploadPath', 'myCourses', 'courseType', 'createSignature']),
      isShow: {
        get: function () {
          return this.$store.state.isCheckAsk
        }
      }
    },
    data () {
      return {
        courseInfo: {}
      }
    },
    created () {
      this.$store.commit('setSelected', '2')
      this.getMyCourse()
      this.getIsAsk()
    },
    methods: {
      goBack () {
        this.$router.push({path: '/mycourse'})
      },
      goRouter (index) {
        switch (index) {
          case 1:
            this.$router.push({path: '/chapter_paper/' + this.$route.params.cid})
            break
          case 2:
            this.$router.push({path: '/simulate_paper/' + this.$route.params.cid})
            break
          case 3:
            this.$router.push({path: '/vip_paper/' + this.$route.params.cid})
            break
          case 4:
            this.$router.push({path: '/myProgress/' + this.$route.params.cid})
            break
          case 5:
            this.$router.push({path: '/collect_exam/' + this.$route.params.cid})
            break
          case 6:
            this.$router.push({path: '/error_exam/' + this.$route.params.cid})
            break
          case 7:
            this.getMyAsk()
            break
        }
      },
      getCourseInfo () {
        if (this.courseInfo.length > 0) {
          return
        }
        Indicator.open({
          text: '获取课程信息…',
          spinnerType: 'snake'
        })
        let id = this.$route.params.cid
        let that = this
        let data = {
          id: id,
          success: function (info) {
            Indicator.close()
            that.courseInfo = info
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
      getMyCourse () {
        let that = this
        Indicator.open({
          text: '加载中…',
          spinnerType: 'snake'
        })
        let data = {
          success: function (list) {
            Indicator.close()
            that.$store.commit('setMyCourses', list)
            // 如果当前的访问的课程没有开通的话 提示要开通console.log(that.myCourses)
            if (!that.myCourses || !that.myCourses[that.$route.params.cid]) {
              that.$router.push({path: '/buy/' + that.$route.params.cid, query: {redirect: that.$route.path}})
            } else {
              that.getCourseInfo()
            }
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
      getMyAsk () {
        let that = this
        let signatureObj = this.createSignature
        Indicator.open({
          text: '加载中…',
          spinnerType: 'snake'
        })
        let data = {
          params: {
            uid: this.$store.state.userInfo.id,
            random: signatureObj.random,
            signature: signatureObj.signature,
            cid: this.$route.params.cid
          },
          callback: function (res) {
            Indicator.close()
            switch (res.status) {
              case 1:
              case 2:
                Toast({
                  message: res.info
                })
                break
              case 3:
                let info = []
                info['info'] = JSON.parse(res.info['info'])
                info['ti'] = JSON.parse(res.info['ti'])
                that.$store.commit('setAskInfo', info)
                that.$router.push({path: '/ask/' + that.$route.params.cid})
                break
              case 4:
                that.$store.commit('setAskInfo', null)
                that.$router.push({path: '/ask/' + that.$route.params.cid})
                break
              case -1:
                let instance = Toast({
                  message: res.info,
                  iconClass: 'mint-toast-icon mintui mintui-field-warning',
                  duration: 1500
                })
                setTimeout(function () {
                  that.$store.commit('logout')
                  instance.close()
                  that.$router.push({path: '/login'})
                }, 1500)
                break
              case 0:
                let error = res.info
                if (!error) {
                  error = '操作失败'
                }
                Toast({
                  message: error,
                  duration: 1000
                })
                break
              default:
                Toast({
                  message: '操作失败',
                  duration: 1000
                })
                break
            }
          }
        }
        this.$store.dispatch('myAsk', data)
      },
      getIsAsk () {
        let that = this
        let signatureObj = this.createSignature
        let data = {
          params: {
            random: signatureObj.random,
            signature: signatureObj.signature,
            uid: this.$store.state.userInfo.id,
            cid: this.$route.params.cid
          },
          callback: function (res) {
            let instance = null
            switch (res.status) {
              case 1:
                that.$store.commit('setIsCheckAsk', false)
                that.$store.commit('setIsAsk', false)
                break
              case 2:
                that.$store.commit('setIsCheckAsk', true)
                that.$store.commit('setIsAsk', false)
                break
              case 3:
              case 4:
                that.$store.commit('setIsCheckAsk', true)
                that.$store.commit('setIsAsk', true)
                break
              case -1:
                instance = Toast({
                  message: res.info,
                  iconClass: 'mint-toast-icon mintui mintui-field-warning',
                  duration: 1500
                })
                setTimeout(function () {
                  that.$store.commit('logout')
                  instance.close()
                  that.$router.push({path: '/login'})
                }, 1500)
                break
              case 0:
                let error = res.info
                if (!error) {
                  error = '试卷错误'
                }
                instance = Toast({
                  message: error,
                  iconClass: 'mint-toast-icon mintui mintui-field-warning'
                })
                setTimeout(function () {
                  instance.close()
                  that.$router.go(-1)
                }, 1500)
                break
              default:
                Toast({
                  message: '操作失败',
                  iconClass: 'mint-toast-icon mintui mintui-field-warning',
                  duration: 1500
                })
                break
            }
          }
        }
        this.$store.dispatch('myAsk', data)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .tk-detail
    flex 1
    display flex
    flex-direction column
    position relative
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
    .nav
      flex 1
      display flex
      flex-direction column
      .row
        flex 1
        display flex
        span
          flex 1
          display flex
          margin 2px
          flex-direction column
          align-items center
          justify-content center
          box-sizing border-box
          border 1px solid #eee
          background url("../assets/bg.png")
          .icon
            font-size 26px
          b
            margin-top 10px
          font-size 18px
    .courseOp
      height 100%
      overflow hidden
      position: relative;
      background rgba(7, 17, 27, 0.2)
      display flex
      flex-direction column
      align-items center
      h1
        height 120px;
        flex none
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
        font-size 14px
        letter-spacing 1px
        padding 10px 20px
      .remark
        margin-top 15px
        font-size 16px
        width 100%
</style>
