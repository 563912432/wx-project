<template>
  <div class="parse">
    <div class="head">
      <div class="left" @click="goBack">
        <i class="icon iconfont icon-fanhui1"></i>
      </div>
      <div class="title">{{paperName}} 试卷全解析</div>
      <div class="right"></div>
    </div>
    <div class="list" v-if="allExam">
      <div v-for="(exam, ind) in allExam" style="flex: 1;">
        <div :class="ind % 2 === 0 ? odd : even" v-if="+exam.type === typeList.single ||
                                                        +exam.type === typeList.single_five ||
                                                        +exam.type === typeList.zuhexuanze ||
                                                        +exam.type === typeList.qhzhdx ||
                                                        +exam.type === typeList.qhzhmx ||
                                                        +exam.type === typeList.multi ||
                                                        +exam.type === typeList.multi_five">
          <div class="row">
            <mt-badge size="small" type="success">
              {{ind+1}}、{{ examTypeMap[exam.type]?examTypeMap[exam.type].name:'' }}
            </mt-badge>
            <span v-html="exam.title"></span></div>
          <div class="row">
            <p v-for="(opt, index) in exam.option"><span style="color: #66ccff">{{az[index]}}</span>、{{opt}}</p>
          </div>
          <div class="row">
            <mt-badge size="small" color="#57bacd">
              我的答案
            </mt-badge>
            {{getAnswer(exam.number)}}
          </div>
          <div class="row">
            <mt-badge size="small" color="#57bacd">
              正确答案
            </mt-badge>
            {{exam.right_answer.toString()}}
          </div>
          <div class="row">
            <mt-badge size="small" color="#57bacd">名师解析</mt-badge>
            <span v-html="exam.parse ? exam.parse : '暂无解析'"></span>
          </div>
          <div v-if="exam.video" class="row">
            <mt-badge size="small" type="primary">
              <span @click="showVideo(exam.video)">视频解析</span>
            </mt-badge>
          </div>
        </div>
        <!--判断题-->
        <div class="item" v-if="+exam.type === typeList.judge">
          <div class="row">
            <mt-badge size="small" type="success">
              {{ind+1}}、{{ examTypeMap[exam.type]?examTypeMap[exam.type].name:'' }}
            </mt-badge>
            <span v-html="exam.title"></span>
          </div>
          <div class="row">
            <mt-badge size="small" color="#57bacd">我的答案</mt-badge>
            <span v-if="getAnswer(exam.number) === 'A'">
              正确
            </span>
            <span v-else-if="getAnswer(exam.number) === 'B'">
              错误
            </span>
            <span v-else>
              {{ getAnswer(exam.number) }}
            </span>
          </div>
          <div class="row">
            <mt-badge size="small" color="#57bacd">正确答案</mt-badge>
            {{exam.right_answer === 'A' ? '正确' : '错误'}}
          </div>
          <div class="row">
            <mt-badge size="small" color="#57bacd">名师解析</mt-badge>
            <span v-html="exam.parse ? exam.parse : '暂无解析'"></span>
          </div>
          <div v-if="exam.video" class="row">
            <mt-badge size="small" type="primary">
              <span @click="showVideo(exam.video)">视频解析</span>
            </mt-badge>
          </div>
        </div>
        <!--不定向选择题-->
        <div class="item" v-if="+exam.type === typeList.material">
          <div class="exam-title">
            <mt-badge size="small" type="success">
              {{ind+1}}、{{ examTypeMap[exam.type]?examTypeMap[exam.type].name:''}}
            </mt-badge>
            <span v-html="exam.material"></span>
          </div>
          <div class="exam-title" v-for="(title, title_index) in exam.title">
            <div v-html="title"></div>
            <div style="margin: 5px 10px">
              <div v-for="(opt, opt_index) in exam.option[title_index]">
                <span style="color: #66ccff">{{az[opt_index]}}</span>、{{opt}}
              </div>
              <div class="row">
                <mt-badge size="small" color="#57bacd">我的答案</mt-badge>
                {{getAnswer([exam.number, title_index])}}
              </div>
              <div class="row">
                <mt-badge size="small" color="#57bacd">正确答案</mt-badge>
                {{exam.right_answer[title_index].toString()}}
              </div>
              <div class="row">
                <mt-badge size="small" color="#57bacd">名师解析</mt-badge>
                <span v-html="exam.parse[title_index]"></span>
              </div>
              <div v-if="exam.video" class="row">
                <mt-badge size="small" type="primary">
                  <span @click="showVideo(exam.video)">视频解析</span>
                </mt-badge>
              </div>
            </div>
          </div>
        </div>
        <!--中级：材料分析题-->
        <div class="item" v-if="+exam.type === typeList.jisuan_fenxi">
          <div class="row">
            <mt-badge size="small" type="success">{{ind+1}}、{{ examTypeMap[exam.type]?examTypeMap[exam.type].name:''
              }}
            </mt-badge>
            <span v-html="exam.material"></span></div>
          <div class="row" v-for="(title, title_index) in exam.title">
            <span v-html="title_index+1 + '、' + title"></span>
            <div class="row">
              <mt-badge size="small" color="#57bacd">名师解析</mt-badge>
              <span v-html="exam.parse[title_index]"></span>
            </div>
          </div>
          <div v-if="exam.video" class="row">
            <mt-badge size="small" type="primary">
              <span @click="showVideo(exam.video)">视频解析</span>
            </mt-badge>
          </div>
        </div>
        <!--配伍题-->
        <div class="item" v-if="+exam.type === typeList.pw">
          <mt-badge size="small" type="success">
            {{ind+1}}、{{ examTypeMap[exam.type]?examTypeMap[exam.type].name:''}}
          </mt-badge>
          <div style="margin: 5px 10px">
            <mt-badge size="small" color="#57bacd">公共选项</mt-badge>
            <div class="row" v-for="(opt, opt_index) in exam.option">
              <span style="color: #66ccff">{{az[opt_index]}}</span>、{{opt}}
            </div>
          </div>
          <div class="row" v-for="(title, title_index) in exam.title">
            <span v-html="(title_index+1) + '、' + title"></span>
            <div style="margin: 5px 10px">
              <div class="row">
                <mt-badge size="small" color="#57bacd">您的答案</mt-badge>
                {{getAnswer([exam.number, title_index])}}
              </div>
              <div class="row">
                <mt-badge size="small" color="#57bacd">正确答案</mt-badge>
                {{exam.right_answer[title_index].toString()}}
              </div>
              <div class="row">
                <mt-badge size="small" color="#57bacd">名师解析</mt-badge>
                <span v-html="exam.parse"></span>
              </div>
              <div v-if="exam.video" class="row">
                <mt-badge size="small" type="primary">
                  <span @click="showVideo(exam.video)">视频解析</span>
                </mt-badge>
              </div>
            </div>
          </div>
        </div>
        <!--中级简答题-->
        <!--中级：材料分析题 建筑案例 活动设计 教学设计 材料分析-->
        <div class="item" v-if="+exam.type === typeList.zjjd ||
                                +exam.type === typeList.jzanli ||
                                +exam.type === typeList.zh ||
                                +exam.type === typeList.huodongsheji ||
                                +exam.type === typeList.jiaoxuesheji ||
                                +exam.type === typeList.cailiaofenxi">
          <div class="row">
            <mt-badge size="small" type="success">{{ind+1}}、({{ examTypeMap[exam.type]?examTypeMap[exam.type].name:''
              }})
            </mt-badge>
            <span v-html="exam.material"></span>
          </div>
          <div class="row" v-for="(title, title_index) in exam.title">
            <span v-html="title_index+1 + '、' + title"></span>
            <div class="row">
              <mt-badge size="small" color="#57bacd">名师解析</mt-badge>
              <span v-html="exam.parse[title_index]"></span>
            </div>
          </div>
          <div v-if="exam.video" class="row">
            <mt-badge size="small" type="primary">
              <span @click="showVideo(exam.video)">视频解析</span>
            </mt-badge>
          </div>
        </div>
        <!--辨析题-->
        <div class="item" v-if="+exam.type === typeList.bianxi ||
                                +exam.type === typeList.jianda ||
                                +exam.type === typeList.xiezuo ||
                                +exam.type === typeList.lunshu">
          <div class="row">
            <mt-badge size="small" type="success">{{ind+1}}、({{ examTypeMap[exam.type]?examTypeMap[exam.type].name:''
              }})
            </mt-badge>
            <span v-html="exam.title"></span>
          </div>
          <div class="row">
            <mt-badge size="small" color="#57bacd">名师解析</mt-badge>
            <span v-html="exam.parse"></span>
          </div>
          <div v-if="exam.video" class="row">
            <mt-badge size="small" type="primary">
              <span @click="showVideo(exam.video)">视频解析</span>
            </mt-badge>
          </div>
        </div>
        <!--综合分析选择题-->
        <!--不定向选择题-->
        <div class="item" v-if="+exam.type === typeList.zhfxxz">
          <div class="exam-title">
            <mt-badge size="small" type="success">{{ind+1}}、({{ examTypeMap[exam.type]?examTypeMap[exam.type].name:''
              }})
            </mt-badge>
            <span v-html="exam.material"></span>
          </div>
          <div class="exam-title" v-for="(title, title_index) in exam.title">
            ({{title_index+1}})、
            <span v-html="title"></span>
            <div class="row">
              <div v-for="(opt, opt_index) in exam.option[title_index]">
                <span style="color: #66ccff">{{az[opt_index]}}</span>、{{opt}}
              </div>
              <div class="row">
                <mt-badge size="small" color="#57bacd">您的答案</mt-badge>
                {{getAnswer([exam.number, title_index])}}
              </div>
              <div class="row">
                <mt-badge size="small" color="#57bacd">正确答案</mt-badge>
                {exam.right_answer[title_index].toString()}}
              </div>
              <div class="row">
                <mt-badge size="small" color="#57bacd">名师解析</mt-badge>
                <span v-html="exam.parse[title_index]"></span>
              </div>
              <div v-if="exam.video" class="row">
                <mt-badge size="small" type="primary">
                  <span @click="showVideo(exam.video)">视频解析</span>
                </mt-badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <parseVideo :videoCode='videoCode'></parseVideo>
  </div>
</template>

<script type="text/ecmascript-6">
  import {COMMON} from '../mixins'
  import {Toast, Indicator} from 'mint-ui'
  import {mapState} from 'vuex'
  import parseVideo from '@/components/parseVideo'
  export default {
    mixins: [COMMON],
    components: {
      Toast, parseVideo
    },
    computed: {
      ...mapState(['typeList'])
    },
    data () {
      return {
        videoCode: null,
        examTypeMap: [],
        paperName: this.$store.state.paperInfo.title,
        paperInfo: this.$store.state.paperInfo.info,
        allExam: [],
        az: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
        dx: ['一', '二', '三', '四', '五', '六', '七', '八'],
        examType: {
          single: 1,
          multi: 5,
          judge: 8,
          material: 15
        },
        odd: 'item odd',
        even: 'item even'
      }
    },
    beforeRouteEnter (to, from, next) {
      if (from.name !== 'result') {
        next(function (vm) {
          vm.$router.push({path: '/'})
        })
      } else {
        next()
      }
    },
    created () {
      this.getExamTypeMap()
      this.allExam = this.$store.state.paper[this.$route.params.pid]
      this.userAnswer = this.$store.state.examState.userAnswer
      if (!this.allExam || this.allExam.length < 0) {
        Toast({
          message: '试卷不存在',
          duration: 1500
        })
      }
    },
    methods: {
      goBack () {
        this.$router.push({path: '/tkDetail/' + this.$store.state.paperInfo.course_id})
      },
      showVideo (vid) {
        this.videoCode = vid
        if (this.videoCode) {
          this.$store.commit('setParseVideo', true)
        }
      },
      // 获取试题题型映射表
      getExamTypeMap () {
        Indicator.open('Loading')
        let that = this
        var data = {
          callback: function (res) {
            Indicator.close()
            switch (res.status) {
              case 1:
                let list = JSON.parse(res.info)
                that.examTypeMap = list
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
                  error = '题型获取失败'
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
        this.$store.dispatch('getExamTypeMap', data)
      },
      getAnswer (number) {
        if (this.userAnswer) {
          for (let n in this.userAnswer) {
            if (typeof number === 'string') {
              if (number === this.userAnswer[n].no) {
                return this.userAnswer[n].val.toString()
              }
            } else if (typeof number === 'object') {
              if (number[0] === this.userAnswer[n].no) {
                for (let i = 0; i < this.userAnswer[n].val.length; i++) {
                  if (number[1] === this.userAnswer[n].val[i].key) {
                    return this.userAnswer[n].val[i].subval.toString()
                  }
                }
              }
            }
          }
        }
        return '未作答'
      }
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .parse
    flex 1
    position absolute
    z-index 10
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
      background #35495E
      color #fff
      .left, .right
        width 50px
        height 100%
        display flex
        align-items center
        justify-content center
        .icon
          font-size 22px
      .right
        font-size 14px
        color #0086b3
        .icon
          font-size 12px
          margin-right 5px
      .title
        flex 1
        text-align center
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
    .list
      padding 0 5px 0
      font-size 14px
      flex 1
      background #fff
      overflow auto
      color #333
      .item
        padding 10px 5px
        border-bottom 1px dashed #f3f3f3
        .row
          padding 2px 0
      .odd
        background #FBF9FE
        .exam-option
          padding 5px 10px
          display flex
          flex-direction column
</style>
