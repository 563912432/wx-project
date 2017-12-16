<template>
  <div class="single">
    <div class="title">
      <mt-badge size="small">题目{{index+1}}</mt-badge>
      <span v-html="exam.title[index]"></span>
    </div>
    <div class="choice">
      <mt-radio title="请选择" v-model="value" :options='options'></mt-radio>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Badge, Radio, Toast} from 'mint-ui'
  export default {
    name: 'single',
    components: {
      Badge,
      Radio,
      Toast
    },
    props: {
      exam: {
        type: Object,
        require: true
      },
      index: {
        type: Number,
        require: true
      },
      len: {
        type: Number,
        require: true
      },
      orientation: {
        type: Boolean,
        require: true
      }
    },
    computed: {
      options () {
        let az = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
        let opt = []
        for (let i = 0; i < this.exam.option.length; i++) {
          opt.push({
            label: this.exam.option[i],
            value: az[i]
          })
        }
        return opt
      }
    },
    created () {
      this.recoveryAnswer()
    },
    data () {
      return {
        value: ''
      }
    },
    methods: {
      // 还原答案
      recoveryAnswer () {
        let data = this.$store.state.examState.userAnswer
        let bool = false
        for (let i = 0; i < data.length; i++) {
          if (data[i].no === this.exam.number) {
            for (let j = 0; j < data[i].val.length; j++) {
              if (+data[i].val[j]['key'] === this.index) {
                this.value = data[i].val[j].subval
                bool = true
              }
            }
          }
        }
        if (bool === false) {
          this.value = ''
        }
      }
    },
    watch: {
      exam () {
        if (this.orientation) {
          this.index = this.exam['title'].length - 1
        } else {
          this.index = 0
        }
        this.len = this.exam['title'].length
      },
      value (newValue) {
        if (newValue) {
          let that = this
          if (this.$route.name === 'chapter_exam' || this.$route.name === 'error_exam') {
            // 判断是否答对
            if (this.value === this.exam.right_answer[this.index].toString()) {
              let instance = Toast({
                message: '恭喜，答对了',
                iconClass: 'mint-toast-icon mintui mintui-success'
              })
              setTimeout(function () {
                instance.close()
              }, 800)
            } else {
              that.$store.commit('setExamParse', true)
              // 记录错题
              if (this.$route.name === 'chapter_exam') {
                let data = {
                  param: {
                    cid: this.$route.params.tid,
                    uid: this.$store.state.userInfo.id,
                    error: this.exam.number
                  }
                }
                this.$store.dispatch('saveError', data)
              }
            }
          }
          let data = this.$store.state.examState.userAnswer
          let change = false
          let hasExam = false
          for (let i = 0; i < data.length; i++) {
            if (data[i].no === this.exam.number) {
              hasExam = i
              for (let j = 0; j < data[i].val.length; j++) {
                if (+data[i].val[j]['key'] === this.index) {
                  data[i].val[this.index]['subval'] = newValue
                  change = true
                  break
                }
              }
            }
            break
          }
          if (change === false) {
            if (hasExam !== false) {
              data[hasExam].val.push({
                key: this.index,
                subval: newValue
              })
            } else {
              data.push({
                no: this.exam.number,
                val: [
                  {key: this.index, subval: newValue}
                ]
              })
            }
          }
          this.$store.commit('saveAnswer', data)
        }
      },
      index () {
        this.recoveryAnswer()
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .single
    display flex
    flex-direction column
    .mint-radiolist-label
      display flex
      flex-direction row
      align-items center
      font-size 14px
      line-height 20px
      padding 10px 0
    .title, .choice
      font-size 14px
      padding 10px 5px 5px
</style>
