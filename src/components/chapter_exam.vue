<template>
  <div class="exam">
    <div class="head">
      <div class="left" @click="goBack">
        <i class="icon iconfont icon-fanhui1"></i>
      </div>
      <div class="title">
        <span>{{curr.type_name ? curr.type_name.name : ''}}（{{exam_index+1}}/{{exam_length}}）</span>
        <small>考试进行中…</small>
      </div>
      <div class="right" @click="doWell"
           v-if="+curr.type === typeList.multi ||　
                  +curr.type === typeList.multi_five ||　
                  +curr.type === typeList.qhzhmx ||　
                  +curr.type === typeList.material">
        <i class="icon iconfont icon-wancheng"></i>
        完成
      </div>
      <div class="right" v-else></div>
    </div>
    <div class="prev" @click="prev">
      <i class="icon iconfont icon-fanhui1"></i>
    </div>
    <div class="next" @click="next">
      <i class="icon iconfont icon-fanhui1"></i>
    </div>
    <div class="wrapper" v-if="exam">
      <div v-if="+curr.type === typeList.single ||
                  +curr.type === typeList.single_five ||
                  +curr.type === typeList.zuhexuanze ||
                  +curr.type === typeList.qhzhdx">
        <single :exam="curr"></single>
      </div>
      <!--多选4  多选5  期货综合多选-->
      <div v-else-if="+curr.type === typeList.multi ||
                      +curr.type === typeList.multi_five ||
                      +curr.type === typeList.qhzhmx">
        <multi :exam="curr" :random="random"></multi>
      </div>
      <div v-if="+curr.type === typeList.pw">
        <pw :exam="curr" :index="subExamInfo.index" :len="subExamInfo.len"
            :orientation="orientation"></pw>
      </div>
      <div v-else-if="+curr.type === typeList.judge">
        <judge :exam="curr"></judge>
      </div>
      <!--不定向选择-->
      <div v-else-if="+curr.type === typeList.material">
        <material :exam="curr" :random="random" :index="subExamInfo.index" :len="subExamInfo.len"
                  :orientation="orientation"></material>
      </div>
      <!--计算分析题中级职称-->
      <div v-else-if="+curr.type === typeList.jisuan_fenxi">
        <zj-jsfx :exam="curr" :index="subExamInfo.index" :len="subExamInfo.len"
                 :orientation="orientation"></zj-jsfx>
      </div>
      <!--中级职称 综合题/简答题  建筑案例分析  教师：材料分析 教学设计 活动设计-->
      <div v-else-if="+curr.type === typeList.zh ||
                      +curr.type === typeList.zjjd ||
                      +curr.type === typeList.jzanli ||
                      +curr.type === typeList.huodongsheji ||
                      +curr.type === typeList.jiaoxuesheji ||
                      +curr.type === typeList.cailiaofenxi">
        <zj-zh :exam="curr" :index="subExamInfo.index" :len="subExamInfo.len"
               :orientation="orientation"></zj-zh>
      </div>
      <!--教师：辨析题 简答 论述 写作题-->
      <div v-else-if="+curr.type === typeList.bianxi ||
                      +curr.type === typeList.jianda ||
                      +curr.type === typeList.xiezuo ||
                      +curr.type === typeList.lunshu">
        <bianxi :exam="curr"></bianxi>
      </div>
      <!--综合分析选择题-->
      <div v-else-if="+curr.type === typeList.zhfxxz">
        <zhfxxz :exam="curr" :index="subExamInfo.index" :len="subExamInfo.len"
                  :orientation="orientation" :random="random"></zhfxxz>
      </div>
    </div>

    <div class="wrapper" v-else style="text-align: center;display: flex; align-items: center; justify-content: center;">
      <div class="empty">
        <i class="icon iconfont icon-meiyougengduo" style="font-size: 40vw; color: rgba(7,17,27,0.1)"></i>
        <small>没有找到题目</small>
      </div>
    </div>
    <!--控制台-->
    <div class="control-tools">
      <span @click.stop="card"> <i class="icon iconfont icon-datiqia"></i>答题卡</span>
      <span @click.stop="parse"><i class="icon iconfont icon-bulb"></i>本题解析</span>
      <span @click.stop="doCollect">
        <i v-bind:class="[collect ? collectedClass : unCollectedClass]"></i>
        收藏</span>
      <span @click="saveProgress"><i class="icon iconfont icon-baocun"></i>保存进度</span>
      <span v-if="hasAsk" @click="ask"><i class="icon iconfont icon-dayi"></i>提问</span>
    </div>
    <!--答题卡-->
    <card v-if="exam" :exam="exam" :exam_index="exam_index" popup-transition="popup-fade"></card>
    <!--题目解析-->
    <examparse v-if="+curr.type !== typeList.material &&
                      +curr.type !== typeList.zh &&
                      +curr.type !== typeList.zjjd &&
                      +curr.type !== typeList.jzanli &&
                      +curr.type !== typeList.huodongsheji &&
                      +curr.type !== typeList.jiaoxuesheji &&
                      +curr.type !== typeList.cailiaofenxi &&
                      +curr.type !== typeList.jiaoxuesheji &&
                      +curr.type !== typeList.huodongsheji &&
                      +curr.type !== typeList.zhfxxz &&
                      +curr.type !== typeList.jisuan_fenxi" :parse="curr.parse" :answer="curr.right_answer" :examType="curr.type"
               :index="subExamInfo.index" :video="curr.video"
               v-bind:exam_index="exam_index" popup-transition="popup-fade"></examparse>
    <examparse v-else :parse="curr.parse[subExamInfo.index]" :answer="curr.right_answer" :examType="curr.type"
               :index="subExamInfo.index" :video="curr.video"
               v-bind:exam_index="exam_index" popup-transition="popup-fade"></examparse>
    <!--我的答疑-->
    <myAsk v-bind:number="curr.number"></myAsk>
  </div>
</template>
<script type="text/ecmascript-6">
  import material from '@/components/material'
  import zh from '@/components/zong_he'
  import zjJiSuanFenXi from '@/components/zj_jisuanfenxi'
  import zhfxxz from '@/components/zhfxxz'
  import bianxi from '@/components/bianxi'
  import pw from '@/components/pw'
  import single from '@/components/single'
  import multi from '@/components/multi'
  import judge from '@/components/judge'
  import djs from '@/components/daojishi'
  import card from '@/components/examcard'
  import examparse from '@/components/examparse'
  import myAsk from '@/components/myAsk'
  import {COMMON} from '../mixins'
  import {Toast, MessageBox, Indicator} from 'mint-ui'
  import {mapState, mapGetters} from 'vuex'

  export default {
    mixins: [COMMON],
    name: 'chapter_exam',
    components: {
      Toast,
      MessageBox,
      Indicator,
      material,
      single,
      multi,
      pw,
      judge,
      card,
      examparse,
      myAsk,
      'zj-zh': zh,
      'zj-jsfx': zjJiSuanFenXi,
      'v-djs': djs,
      bianxi,
      zhfxxz
    },
    data () {
      return {
        random: 0,
        time: null,
        type: 1,
        exam: [],
        exam_length: 0,
        visible: false,
        curr: {
          type: 0
        },
        subExamInfo: {
          index: 0,
          len: 0
        },
        // 方向： 代表上一题还是下一题
        orientation: false,
        collect: 0,
        collectedClass: 'icon iconfont icon-like_fill',
        unCollectedClass: 'icon iconfont icon-like',
        hasAsk: false
      }
    },
    created () {
      this.hasAsk = this.isAsk
    },
    computed: {
      ...mapState(['typeList']),
      ...mapGetters(['createSignature', 'isAsk']),
      exam_index () {
        return this.$store.state.examState.curr_index
      }
    },
    beforeRouteEnter (to, from, next) {
      if (from.name !== 'paperInfo' && from.name !== 'progress') {
        next(vm => {
          vm.$router.go(-1)
        })
      } else {
        next(function (vm) {
          vm.$store.commit('clearExamState')
          if (vm.$route.params.progress_id) {
            vm.getExamOfPaper()
          } else {
            // 检测试卷信息是否存在
            if (vm.$store.state.paperInfo === null) {
              vm.$router.push({path: '/paperInfo/' + vm.$route.params.tid + '/' + vm.$route.params.pid})
            }
            // 获取试卷题目列表
            vm.getExamOfPaper()
          }
        })
      }
    },
    methods: {
      goBack () {
        this.$router.push({path: '/chapter_paper/' + this.$route.params.tid})
      },
      doWell () {
        this.random = Math.random()
      },
      getExamOfPaper () {
        Indicator.open('载入中...')
        let that = this
        let signatureObj = this.createSignature
        let data = {
          params: {
            random: signatureObj.random,
            signature: signatureObj.signature,
            pid: this.$route.params.pid,
            uid: this.$store.state.userInfo.id,
            cid: this.$route.params.tid,
            progress_id: this.$route.params.progress_id ? this.$route.params.progress_id : 0
          },
          callback: function (res) {
            Indicator.close()
            let instance = null
            switch (res.status) {
              case 1:
                let returnData = JSON.parse(res.info)
                that.$store.commit('setPaper', {pid: that.$route.params.pid, info: returnData.allExamInfo})
                if (typeof returnData.record === 'object') {
                  if (returnData.record.progress) {
                    that.$store.commit('saveAnswer', JSON.parse(returnData.record.progress))
                  }
                  if (returnData.record.paperInfo) {
                    that.$store.commit('setCurrentPaperInfo', returnData.record.paperInfo)
                  }
                }
                that.exam = returnData.allExamInfo
                that.exam_length = returnData.allExamInfo.length
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
        this.$store.dispatch('getExamOfPaper', data)
      },
      card () {
        this.$store.commit('setExamCard', true)
      },
      parse () {
        this.$store.commit('setExamParse', true)
      },
      next () {
        this.orientation = false
        if ((this.exam_index + 1) === this.exam_length) {
          if (this.subExamInfo.len !== 0 && (this.subExamInfo.len - 1 === this.subExamInfo.index)) {
            Toast({
              message: '已经是最后一题',
              duration: 1500
            })
            return
          }
          if (this.subExamInfo.len === 0) {
            Toast({
              message: '已经是最后一题',
              duration: 1500
            })
            return
          }
        }
        if (this.subExamInfo.index < this.subExamInfo.len - 1) {
          this.subExamInfo.index += 1
        } else {
          this.$store.commit('setExamCurrIndex', this.exam_index + 1)
        }
      },
      prev () {
        this.orientation = true
        if (this.exam_index === 0) {
          Toast({
            message: '已经是第一题',
            duration: 1500
          })
          return
        }
        if (this.subExamInfo.index > 0) {
          this.subExamInfo.index -= 1
        } else {
          this.$store.commit('setExamCurrIndex', this.exam_index - 1)
        }
      },
      doCollect () {
        Indicator.open('正在处理')
        let that = this
        let signatureObj = this.createSignature
        let data = {
          param: {
            random: signatureObj.random,
            signature: signatureObj.signature,
            number: this.curr.number,
            uid: this.$store.state.userInfo.id,
            cid: this.$route.params.tid
          },
          callback: function (res) {
            Indicator.close()
            let instance = null
            switch (res.status) {
              case 1:
                that.collect = true
                that.curr.collect = 1
                break
              case -2:
                that.collect = false
                that.curr.collect = 0
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
                  message: '收藏失败',
                  iconClass: 'mint-toast-icon mintui mintui-field-warning',
                  duration: 1500
                })
                break
            }
          }
        }
        this.$store.dispatch('collectExam', data)
      },
      saveProgress () {
        let that = this
        MessageBox.prompt('请输入进度名称', {inputType: 'text'}).then(({value, action}) => {
          if (value) {
            if (/[\w\u4E00-\u9FA5\uF900-\uFA2D]/g.exec(value)) {
              if (that.$store.state.examState.userAnswer.length <= 0) {
                Toast({
                  message: '您还未作答',
                  duration: 1000
                })
                return
              }
              let signatureObj = this.createSignature
              let data = {
                param: {
                  random: signatureObj.random,
                  signature: signatureObj.signature,
                  cid: this.$route.params.tid,
                  pid: this.$route.params.pid,
                  uid: this.$store.state.userInfo.id,
                  tag: value,
                  remainder_time: 0,
                  progress: that.$store.state.examState.userAnswer,
                  len: that.exam_length
                },
                callback: function (res) {
                  let instance = null
                  switch (res.status) {
                    case 1:
                      Toast({
                        message: '保存成功',
                        duration: 1000
                      })
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
                        error = '保存失败'
                      }
                      Toast({
                        message: error,
                        duration: 1500
                      })
                      break
                    default:
                      Toast({
                        message: '收藏失败',
                        iconClass: 'mint-toast-icon mintui mintui-field-warning',
                        duration: 1500
                      })
                      break
                  }
                }
              }
              that.$store.dispatch('saveProgress', data)
            } else {
              Toast({
                message: '进度名称不合法',
                duration: 1000
              })
            }
          }
        })
      },
      ask () {
        this.$store.commit('setExamAsk', true)
      },
      initData () {
        this.curr = this.exam[this.exam_index]
        this.collect = this.curr.collect
        this.type = this.curr.type
        if (+this.type === this.typeList.material ||
            +this.type === this.typeList.jisuan_fenxi ||
            +this.type === this.typeList.zh ||
            +this.type === this.typeList.zjjd ||
            +this.type === this.typeList.cailiaofenxi ||
            +this.type === this.typeList.jiaoxuesheji ||
            +this.type === this.typeList.huodongsheji ||
            +this.type === this.typeList.pw ||
            +this.type === this.typeList.zhfxxz ||
            +this.type === this.typeList.jzanli) {
          if (this.orientation) {
            this.subExamInfo.index = this.curr['title'].length - 1
          } else {
            this.subExamInfo.index = 0
          }
          this.subExamInfo.len = this.curr['title'].length
        } else {
          this.subExamInfo.index = 0
          this.subExamInfo.len = 0
        }
      }
    },
    watch: {
      exam_index () {
        this.initData()
      },
      exam () {
        this.initData()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .exam
    position absolute
    z-index 10
    top 0
    left 0
    width 100%
    height 100%
    background-color: #FBF9FE
    overflow hidden
    display flex
    flex-direction column
    .head
      height 50px
      font-size 18px
      display flex
      flex-direction row
      align-items center
      border-bottom 1px solid #ddd
      background #35495E
      color #fff
      .left, .right
        width 50px
        overflow hidden
        height 100%
        display flex
        align-items center
        justify-content center
      .right
        font-size 14px
      .left
        .icon
          font-size 22px
      .title
        flex 1
        text-align center
        overflow hidden
        span
          display block
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
        small
          font-size 12px
    .prev, .next
      position absolute
      z-index 10
      top 80%
      width 50px
      height 50px
      border-radius 25px
      background rgba(7, 17, 27, 0.3)
      display flex
      align-items center
      justify-content center
      .icon
        font-size 25px
        color #fff
    .prev
      left 20px
    .next
      right 20px
      transform: rotate(180deg);
    .wrapper
      flex 1
      overflow auto
      .empty
        display flex
        flex-direction column
        small
          color #999
    .control-tools
      margin-top 1px
      height 50px
      display flex
      flex-direction row
      justify-content center
      align-items center
      box-sizing border-box
      background #fff
      font-size 14px
      span
        height 100%
        flex 1
        display flex
        justify-content center
        align-items center
        .icon
          font-size 14px
          margin-right 2px
          color #0086b3
</style>
