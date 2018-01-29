<template>
  <div class="ask">
    <div class="head">
      <div class="left" @click="goBack">
        <i class="icon iconfont icon-fanhui1"></i>
      </div>
      <div class="title">我的答疑</div>
      <div class="right"></div>
    </div>
    <div class="list" v-if="allAsk">
      <div v-for="(item, index) in allAsk">
        <div v-if="allTimu[item.ti_num]">
          <!--  单选、多选 -->
          <div class="row" v-if="+allTimu[item.ti_num].type === typeList.single ||
                                  +allTimu[item.ti_num].type === typeList.multi ">
            <!-- 类型、题目 -->
            <div class="exam-title">
              <span @click="show($event,index)">
                <mt-badge size="small" type="success">
                {{index+1}}、题目 [点击展开]
              </mt-badge>
              </span>
            </div>
            <div style="display: none">
              <span v-html="allTimu[item.ti_num].title"></span>
              <!--选项-->
              <div class="row">
                <p v-for="(opt, index) in allTimu[item.ti_num].option"><span style="color: #66ccff">{{az[index]}}</span>、{{opt}}</p>
              </div>
              <!-- 正确答案 -->
              <div class="row">
                <mt-badge size="small" color="#57bacd">
                  正确答案
                </mt-badge>
                {{allTimu[item.ti_num].right_answer.toString()}}
              </div>
              <!-- 教师解析 -->
              <div class="row">
                <mt-badge size="small" color="#57bacd">名师解析</mt-badge>
                <span v-html="allTimu[item.ti_num].parse ? allTimu[item.ti_num].parse : '暂无解析'"></span>
              </div>
            </div>
            <!-- 我的提问 -->
            <div :style="background">
              <div class="row">
                <mt-badge size="small" type="primary">我的提问</mt-badge>
                <span v-html="item.ask"></span>
                <div class="myAsk">
                  <span>提问时间：{{ formatDateTime(item.created_at) }}</span>
                </div>
              </div>
              <!-- 老师回复 -->
              <div class="row">
                <mt-badge size="small" type="primary">老师回复</mt-badge>
                <span v-html="item.reply?item.reply:'暂无回复'"></span>
                <div v-if="item.reply" class="myAsk">
                  <span><span>课程老师</span> <span style="font-weight: bold">{{ item.admin.nickname }}</span> <span>回复于 {{ formatDateTime(item.reply_time) }}</span></span>
                </div>
              </div>
            </div>
          </div>
          <!-- 判断 -->
          <div class="row" v-if="+allTimu[item.ti_num].type === typeList.judge ">
            <!-- 类型、题目 -->
            <div class="exam-title">
              <span @click="show($event,index)">
                <mt-badge size="small" type="success">
                {{index+1}}、题目 [点击展开]
              </mt-badge>
              </span>
            </div>
            <div style="display: none">
              <span v-html="allTimu[item.ti_num].title"></span>
              <!-- 正确答案 -->
              <div class="row">
                <mt-badge size="small" color="#57bacd">正确答案</mt-badge>
                {{allTimu[item.ti_num].right_answer === 'A' ? '正确' : '错误'}}
              </div>
              <!-- 教师解析 -->
              <div class="row">
                <mt-badge size="small" color="#57bacd">名师解析</mt-badge>
                <span v-html="allTimu[item.ti_num].parse ? allTimu[item.ti_num].parse : '暂无解析'"></span>
              </div>
            </div>
            <!-- 我的提问 -->
            <div :style="background">
              <div class="row">
                <mt-badge size="small" type="primary">我的提问</mt-badge>
                <span v-html="item.ask"></span>
                <div class="myAsk">
                  <span>提问时间：{{ formatDateTime(item.created_at) }}</span>
                </div>
              </div>
              <!-- 老师回复 -->
              <div class="row">
                <mt-badge size="small" type="primary">老师回复</mt-badge>
                <span v-html="item.reply?item.reply:'暂无回复'"></span>
                <div v-if="item.reply" class="myAsk">
                  <span><span>课程老师</span> <span style="font-weight: bold">{{ item.admin.nickname }}</span> <span>回复于 {{ formatDateTime(item.reply_time) }}</span></span>
                </div>
              </div>
            </div>
          </div>
          <!-- 不定项 -->
          <div class="row" v-if="+allTimu[item.ti_num].type === typeList.material">
            <div class="exam-title">
              <span @click="show($event,index)">
                <mt-badge size="small" type="success">
                  {{index+1}}、题目 [点击展开]
                </mt-badge>
              </span>
            </div>
            <div style="display: none">
              <div v-html="allTimu[item.ti_num].material"></div>
              <div class="exam-title" v-for="(title, title_index) in allTimu[item.ti_num].title">
                <div v-html="title"></div>
                <div style="margin: 5px 10px">
                  <div v-for="(opt, opt_index) in allTimu[item.ti_num].option[title_index]">
                    <span style="color: #66ccff">{{az[opt_index]}}</span>、{{opt}}
                  </div>
                  <div>
                    正确答案：{{allTimu[item.ti_num].right_answer[title_index].toString()}}
                  </div>
                  <div>
                    名师解析：<span v-html="allTimu[item.ti_num].parse[title_index]"></span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 我的提问 -->
            <div :style="background">
              <div class="row">
                <mt-badge size="small" type="primary">我的提问</mt-badge>
                <span v-html="item.ask"></span>
                <div class="myAsk">
                  <span>提问时间：{{ formatDateTime(item.created_at) }}</span>
                </div>
              </div>
              <!-- 老师回复 -->
              <div class="row">
                <mt-badge size="small" type="primary">老师回复</mt-badge>
                <span v-html="item.reply?item.reply:'暂无回复'"></span>
                <div v-if="item.reply" class="myAsk">
                  <span><span>课程老师</span> <span style="font-weight: bold">{{ item.admin.nickname }}</span> <span>回复于 {{ formatDateTime(item.reply_time) }}</span></span>
                </div>
              </div>
            </div>
          </div>
          <!--中级：材料分析题-->
          <div class="row" v-if="+allTimu[item.ti_num].type === typeList.jisuan_fenxi">
            <div class="exam-title">
              <span @click="show($event,index)">
                <mt-badge size="small" type="success">
                {{index+1}}、题目 [点击展开]
              </mt-badge>
              </span>
            </div>
            <div style="display: none">
              <span v-html="allTimu[item.ti_num].material"></span>
              <div class="row" v-for="(title, title_index) in allTimu[item.ti_num].title">
                <span v-html="title_index+1 + '、' + title"></span>
                <div class="row">
                  <mt-badge size="small" color="#57bacd">名师解析</mt-badge>
                  <span v-html="allTimu[item.ti_num].parse[title_index]"></span>
                </div>
              </div>
            </div>
            <!-- 我的提问 -->
            <div :style="background">
              <div class="row">
                <mt-badge size="small" type="primary">我的提问</mt-badge>
                <span v-html="item.ask"></span>
                <div class="myAsk">
                  <span>提问时间：{{ formatDateTime(item.created_at) }}</span>
                </div>
              </div>
              <!-- 老师回复 -->
              <div class="row">
                <mt-badge size="small" type="primary">老师回复</mt-badge>
                <span v-html="item.reply?item.reply:'暂无回复'"></span>
                <div v-if="item.reply" class="myAsk">
                  <span><span>课程老师</span> <span style="font-weight: bold">{{ item.admin.nickname }}</span> <span>回复于 {{ formatDateTime(item.reply_time) }}</span></span>
                </div>
              </div>
            </div>
          </div>
          <!--中级 综合-->
          <div class="row" v-if="+allTimu[item.ti_num].type === typeList.zjjd ||
                                  +allTimu[item.ti_num].type === typeList.jzanli ||
                                  +allTimu[item.ti_num].type === typeList.zh ||
                                  +allTimu[item.ti_num].type === typeList.huodongsheji ||
                                  +allTimu[item.ti_num].type === typeList.jiaoxuesheji ||
                                  +allTimu[item.ti_num].type === typeList.cailiaofenxi ">
            <div class="exam-title">
              <span @click="show($event,index)">
                <mt-badge size="small" type="success">
                  {{index+1}}、题目 [点击展开]
                </mt-badge>
              </span>
            </div>
            <div style="display: none">
              <span v-html="allTimu[item.ti_num].material"></span>
              <div class="row" v-for="(title, title_index) in allTimu[item.ti_num].title">
                <span v-html="title_index+1 + '、' + title"></span>
                <div class="row">
                  <mt-badge size="small" color="#57bacd">名师解析</mt-badge>
                  <span v-html="allTimu[item.ti_num].parse[title_index]"></span>
                </div>
              </div>
            </div>
            <!-- 我的提问 -->
            <div :style="background">
              <div class="row">
                <mt-badge size="small" type="primary">我的提问</mt-badge>
                <span v-html="item.ask"></span>
                <div class="myAsk">
                  <span>提问时间：{{ formatDateTime(item.created_at) }}</span>
                </div>
              </div>
              <!-- 老师回复 -->
              <div class="row">
                <mt-badge size="small" type="primary">老师回复</mt-badge>
                <span v-html="item.reply?item.reply:'暂无回复'"></span>
                <div v-if="item.reply" class="myAsk">
                  <span><span>课程老师</span> <span style="font-weight: bold">{{ item.admin.nickname }}</span> <span>回复于 {{ formatDateTime(item.reply_time) }}</span></span>
                </div>
              </div>
            </div>
          </div>
          <!-- 简答 -->
          <div class="row" v-if=" +allTimu[item.ti_num].type === typeList.jianda ">
            <div class="exam-title">
              <span @click="show($event,index)">
                <mt-badge size="small" type="success">
                  {{index+1}}、题目 [点击展开]
                </mt-badge>
              </span>
            </div>
            <div style="display: none">
              <span v-html="allTimu[item.ti_num].title"></span>
              <div class="row">
                <mt-badge size="small" color="#57bacd">名师解析</mt-badge>
                <span v-html="allTimu[item.ti_num].parse"></span>
              </div>
            </div>
            <!-- 我的提问 -->
            <div :style="background">
              <div class="row">
                <mt-badge size="small" type="primary">我的提问</mt-badge>
                <span v-html="item.ask"></span>
                <div class="myAsk">
                  <span>提问时间：{{ formatDateTime(item.created_at) }}</span>
                </div>
              </div>
              <!-- 老师回复 -->
              <div class="row">
                <mt-badge size="small" type="primary">老师回复</mt-badge>
                <span v-html="item.reply?item.reply:'暂无回复'"></span>
                <div v-if="item.reply" class="myAsk">
                  <span><span>课程老师</span> <span style="font-weight: bold">{{ item.admin.nickname }}</span> <span>回复于 {{ formatDateTime(item.reply_time) }}</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <!-- 我的提问 -->
          <div :style="background">
            <div class="row">
              <mt-badge size="small" type="primary">{{ index+1 }}}我的提问</mt-badge>
              <span v-html="item.ask"></span>
              <div class="myAsk">
                <span>提问时间：{{ formatDateTime(item.created_at) }}</span>
              </div>
            </div>
            <!-- 老师回复 -->
            <div class="row">
              <mt-badge size="small" type="primary">老师回复</mt-badge>
              <span v-html="item.reply?item.reply:'暂无回复'"></span>
              <div v-if="item.reply" class="myAsk">
                <span><span>课程老师</span> <span style="font-weight: bold">{{ item.admin.nickname }}</span> <span>回复于 {{ formatDateTime(item.reply_time) }}</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {COMMON} from '../mixins'
  import {Toast, Indicator} from 'mint-ui'
  import {mapState, mapGetters} from 'vuex'
  export default {
    mixins: [COMMON],
    components: {
      Toast
    },
    computed: {
      ...mapState(['typeList']),
      ...mapGetters(['askInfo'])
    },
    data () {
      return {
        examTypeMap: [],
        allAsk: [],
        allTimu: [],
        az: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
        dx: ['一', '二', '三', '四', '五', '六', '七', '八'],
        examType: {
          single: 1,
          multi: 5,
          judge: 8,
          material: 15
        },
        curr_index: 0,
        exam_index: 0,
        background: {
          backgroundImage: 'url(' + require('../assets/bg.png') + ')',
          backgroundRepeat: 'repeat',
          padding: '3px'
        }
      }
    },
    created () {
      this.getExamTypeMap()
      // 答疑内容
      this.allAsk = this.askInfo.info
      this.allTimu = this.askInfo.ti
      if (!this.allAsk || this.allAsk.length < 0) {
        Toast({
          message: '暂无答疑',
          duration: 1500
        })
      }
    },
    methods: {
      show (e, index) {
        let el = e.target.parentNode.parentNode.nextElementSibling
        if (el.style.display === 'none') {
          el.style.display = 'block'
          e.target.innerText = (index + 1) + '、题目 [点击关闭]'
        } else {
          el.style.display = 'none'
          e.target.innerText = (index + 1) + '、题目 [点击展开]'
        }
      },
      formatDateTime (timeStamp) {
        let date = new Date()
        date.setTime(timeStamp * 1000)
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        m = m < 10 ? ('0' + m) : m
        let d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        let h = date.getHours()
        h = h < 10 ? ('0' + h) : h
        let minute = date.getMinutes()
        let second = date.getSeconds()
        minute = minute < 10 ? ('0' + minute) : minute
        second = second < 10 ? ('0' + second) : second
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
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
      }
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .ask
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
      padding 10px 5px 0
      font-size 14px
      flex 1
      display flex
      flex-direction column
      background #fff
      overflow auto
      color #333
      .item
        padding 10px 5px
        border-bottom 1px dashed #f3f3f3
      .row
        padding 10px 5px
        .exam-title
          padding-bottom  3px
        .myAsk
          text-align right
          font-size 12px
          color #999
          padding 2px
          font-family Georgia
        .exam-option
          padding 5px 10px
          display flex
          flex-direction column
</style>
