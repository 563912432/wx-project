<template>
  <div class="result">
    <div id="charts"></div>
    <div class="inspire" v-if="score !== sumScore">
      <span>本次测试满分 {{sumScore}} 分，共 {{sumNum}} 题。您答对 {{right}} 题（含小题数），得 {{score}} 分。</span>
      <span style="color:#C23531">继续加油，相信自己，我就是我自己的主宰！</span>
      <small style="color:#0086b3;margin-top: 15px">注：主观题未进行判分，此结果仅作参考</small>
    </div>
    <div class="inspire" v-else>
      <span>本次测试满分 {{sumScore}} 分，共 {{sumNum}} 题。答对 {{right}} 题（含小题数），得 {{score}} 分。</span>
      <span style="color:#C23531">还有谁？还有谁！这都能做满分，没错，你就是天才！</span>
      <small style="color:#0086b3;margin-top: 15px">注：主观题未进行判分，此结果仅作参考</small>
    </div>
    <div class="ctrl">
      <mt-button type="primary" @click="goParse">查看全卷解析</mt-button>
      <mt-button plain @click="goBack">返回列表</mt-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {COMMON} from '../mixins'
  import {Toast} from 'mint-ui'
  import pie from 'echarts'
  import {mapGetters} from 'vuex'
  export default {
    mixins: [COMMON],
    name: 'result',
    components: {
      Toast
    },
    data () {
      return {
        myChart: null,
        score: 0,
        sumScore: 0,
        sumNum: 0,
        right: 0,
        error: 0
      }
    },
    beforeRouteEnter (to, from, next) {
      if (from.name === 'exam') {
        next(vm => {
          // 通过 `vm` 访问组件实例
          let record = vm.$store.state.examState.userAnswer
          let paper = vm.$store.state.paper[vm.$route.params.pid]
          let paperInfo = vm.$store.state.paperInfo.info
          // 计算试卷的满分
          if (paperInfo) {
            for (let i in paperInfo) {
              vm.sumScore += +paperInfo[i].num * +paperInfo[i].score
            }
          }
          // 计算试题总量
          for (let i = 0; i < paper.length; i++) {
            if (typeof paper[i].title === 'object') {
              vm.sumNum += +(paper[i].title).length
            } else {
              vm.sumNum += 1
            }
          }
          let errorNumber = []
          for (let i = 0; i < record.length; i++) {
            for (let j = 0; j < paper.length; j++) {
              if (record[i].no === paper[j].number) {
                if (+paper[j].type === 1 || +paper[j].type === 5 || +paper[j].type === 8) {
                  if (paper[j].right_answer === record[i].val) {
                    vm.score += +paperInfo[paper[j].type].score
                    vm.right += 1
                  } else {
                    errorNumber.push(record[i].no)
                  }
                } else {
                  for (let m = 0; m < record[i].val.length; m++) {
                    for (let n = 0; n < paper[j].right_answer.length; n++) {
                      if (paper[j].right_answer[n].sort().toString().toUpperCase() === record[i].val[m].subval.split('').sort().toString().toUpperCase()) {
                        vm.score += +paperInfo[paper[j].type].score / paper[j].title.length
                        vm.right += 1
                      } else {
                        errorNumber.push(record[i].no)
                      }
                    }
                  }
                }
              }
            }
          }
          if (errorNumber.length > 0) {
            vm.saveError(errorNumber)
          }
          vm.error = vm.sumNum - vm.right
          // 绘制图表
          let leftTime = vm.transSeconds(vm.$store.state.paperInfo.time - vm.$store.state.examState.leftTime)
          vm.myChart.setOption({
            baseOption: {
              title: {
                text: vm.$store.state.paperInfo.title,
                subtext: '用时 ' + leftTime,
                x: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {d}%'
              },
              legend: {
                orient: 'vertical',
                left: 'left'
              },
              series: [
                {
                  name: '数据',
                  type: 'pie',
                  radius: '55%',
                  center: ['50%', '60%'],
                  data: [
                    {value: vm.right / vm.sumNum, name: '正确'},
                    {value: vm.error / vm.sumNum, name: '错误'}
                  ],
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
            }
          })
        })
      } else {
        next(vm => {
          vm.$router.push({path: '/'})
        })
      }
    },
    mounted () {
      this.myChart = pie.init(document.getElementById('charts'))
    },
    computed: {
      ...mapGetters(['createSignature'])
    },
    methods: {
      goBack () {
        let cid = this.$store.state.paperInfo.course_id
        if (this.$store.state.paperInfo.type === '1') {
          this.$router.push({path: '/chapter_paper/' + cid})
        } else if (this.$store.state.paperInfo.type === '2') {
          this.$router.push({path: '/simulate_paper/' + cid})
        } else {
          this.$router.push({path: '/vip_paper/' + cid})
        }
      },
      goParse () {
        this.$router.push('/parse/' + this.$route.params.pid)
      },
      // 保存错题
      saveError (error) {
        let signatureObj = this.createSignature
        let data = {
          param: {
            random: signatureObj.random,
            signature: signatureObj.signature,
            uid: this.$store.state.userInfo.id,
            cid: this.$store.state.paperInfo.course_id,
            error: error
          },
          error: function (msg) {
            if (!msg) {
              msg = '错题保存失败'
            }
            Toast({
              message: msg,
              duration: 1500
            })
          }
        }
        this.$store.dispatch('saveError', data)
      },
      transSeconds (time) {
        let day = 0
        let hour = 0
        let minute = 0
        let second = 0
        if (time > 0) {
          day = Math.floor(time / (60 * 60 * 24))
          hour = Math.floor(time / (60 * 60)) - (day * 24)
          minute = Math.floor(time / 60) - (day * 24 * 60) - (hour * 60)
          second = Math.floor(time - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60))
        }
        if (hour <= 9) hour = '0' + hour
        if (minute <= 9) minute = '0' + minute
        if (second <= 9) second = '0' + second
        return (hour + ' :' + minute + ' :' + second)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .result
    position absolute
    z-index 1
    width 100%
    height 100%
    flex 1
    display flex
    flex-direction column
    overflow hidden
    background url("../assets/bg2.png") repeat-x
    background-size contain
    padding 50px 10px 10px 10px
    #charts
      flex 3
      height 50%
      display flex
    .inspire
      flex 1
      padding 0 20px
      text-align left
      font-size 14px
      display flex
      color #666
      flex-direction column
      align-items flex-start
      justify-content center
    .ctrl
      flex 2
      display flex
      flex-direction column
      margin-top 20px
      height 100%
      button
        margin-top 10px
</style>
