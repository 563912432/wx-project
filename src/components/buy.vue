<template>
  <div class="buy">
    <div class="mask">
      <div class="back" @click="goBack">
        <i class="icon iconfont icon-fanhui1"></i>
      </div>
      <img class="course-bg" :src="courseInfo ? uploadPath + courseInfo.thumb : ''" alt="">
      <div class="info">
        <div class="c-title">{{courseInfo?courseInfo.title:''}}</div>
        <div class="c-summary" v-html="courseInfo?courseInfo.brief:''"></div>
        <div class="card-open">
          <div v-if="isFree" style="text-align: center">
            <mt-button type="primary" style="width: 100px;height:48px;border-radius: 0;padding:0"
                       @click.native="openFree">立即开通
            </mt-button>
          </div>
          <div v-else>
            <mt-field placeholder="请输入卡号" v-model="card">
              <mt-button type="primary" style="width: 100px;height:48px;border-radius: 0;padding:0" @click="openByCard">
                立即开通
              </mt-button>
            </mt-field>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Field, Button, Toast, Indicator} from 'mint-ui'
  import {mapGetters} from 'vuex'
  export default {
    name: 'buy',
    components: {
      Field,
      Toast,
      Indicator,
      'v-button': Button
    },
    data () {
      return {
        isFree: false,
        card: null,
        courseInfo: null
      }
    },
    computed: {
      ...mapGetters(['uploadPath', 'createSignature'])
    },
    created () {
      let cid = this.$route.params.cid
      if (this.$store.state.myCourses[cid]) {
        this.$router.go(-2)
      } else {
        this.getCourseInfo(cid)
      }
    },
    methods: {
      goBack () {
        this.$router.go(-2)
      },
      getCourseInfo (cid) {
        let that = this
        let data = {
          id: cid,
          success: function (info) {
            that.courseInfo = info
            that.isFree = +info.free
          },
          error: function (error) {
            if (!error) {
              error = '课程信息获取失败'
            }
            let instance = Toast({
              message: error
            })
            setTimeout(function () {
              instance.close()
              that.$router.go(-1)
            }, 1500)
          }
        }
        this.$store.dispatch('getCourseInfoById', data)
      },
      openByCard () {
        let that = this
        if (this.card !== null) {
          Indicator.open({
            text: '请稍后...',
            spinnerType: 'fading-circle'
          })
          let signatureObj = this.createSignature
          let data = {
            param: {
              random: signatureObj.random,
              signature: signatureObj.signature,
              cid: this.$route.params.cid,
              uid: this.$store.state.userInfo.id,
              card: this.card
            },
            callback: function (res) {
              Indicator.close()
              let instance = null
              switch (res.status) {
                case 1:
                  instance = Toast({
                    message: '开通成功',
                    iconClass: 'mint-toast-icon mintui mintui-success'
                  })
                  setTimeout(function () {
                    instance.close()
                    that.$router.push({path: that.$route.query.redirect})
                  }, 1000)
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
                  Toast({
                    message: res.info,
                    iconClass: 'mint-toast-icon mintui mintui-field-warning',
                    duration: 1500
                  })
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
          this.$store.dispatch('openCourseByCard', data)
        } else {
          let instance = Toast({
            message: '请输入卡号'
          })
          setTimeout(function () {
            instance.close()
          }, 1000)
        }
      },
      openFree () {
        Indicator.open({
          text: '请稍后...',
          spinnerType: 'fading-circle'
        })
        let that = this
        let signatureObj = that.createSignature
        let data = {
          params: {
            random: signatureObj.random,
            signature: signatureObj.signature,
            uid: this.$store.state.userInfo.id,
            cid: this.$route.params.cid
          },
          callback: function (res) {
            Indicator.close()
            let instance = null
            switch (res.status) {
              case 1:
                instance = Toast({
                  message: '开通成功',
                  iconClass: 'mint-toast-icon mintui mintui-success'
                })
                setTimeout(function () {
                  instance.close()
                  that.$router.push({path: that.$route.query.redirect})
                }, 1000)
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
                  error = '开通失败'
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
        this.$store.dispatch('opeFreeCourse', data)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .mint-indicator
    z-index 10

  .buy
    flex 1
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    z-index 1
    background #fff
    .mask
      width 100%
      height 100%
      background rgba(0, 0, 0, 0.5)
      .course-bg
        position absolute
        z-index -1
        top 0
        left 0
        width 100%
        height 100%
        filter blur(10px)
      .back
        position absolute
        top 15px
        left 15px
        width 30px
        height 30px
        border 1px solid #fff
        background rgba(0, 0, 0, 0.5)
        border-radius 15px
        display flex
        align-items center
        justify-content center
        z-index 100
        .icon
          color #fff
      .mint-cell-wrapper
        padding-left 10px
        padding-right 0px
      .info
        z-index 10
        flex 1
        color #fff
        padding-top 80px
        .c-title
          text-align center
          font-size 24px
        .c-summary
          font-size 16px
          line-height 30px
          padding 15px
          letter-spacing 1.5px
          color #ddd
        .card-open
          padding 15px
          margin-bottom 10px

</style>
