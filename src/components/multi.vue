<template>
  <div class="multi">
    <div class="title">
      <mt-badge size="small">题目</mt-badge>
      <span v-html="exam.title"></span>
    </div>
    <div class="choice">
      <mt-checklist title="请选择" v-model="value" :options='options'></mt-checklist>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Badge, Checklist, Toast} from 'mint-ui'
  export default {
    name: 'multi',
    props: {
      exam: {
        type: Object,
        require: true
      },
      random: {
        type: Number,
        require: true
      }
    },
    components: {
      Badge,
      Checklist,
      Toast
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
    data () {
      return {
        value: []
      }
    },
    mounted () {
      if (this.$route.params.progress_id) {
        this.watchExam()
      }
    },
    methods: {
      watchExam () {
        let data = this.$store.state.examState.userAnswer
        let bool = false
        for (let i = 0; i < data.length; i++) {
          if (data[i].no === this.exam.number) {
            this.value = data[i].val
            bool = true
          }
        }
        if (!bool) {
          this.value = []
        }
      }
    },
    watch: {
      random () {
        let rightAnswer = (this.value.sort()).toString()
        if (this.exam.right_answer.sort().toString() === rightAnswer) {
          let instance = Toast({
            message: '恭喜，答对了',
            iconClass: 'mint-toast-icon mintui mintui-success'
          })
          setTimeout(function () {
            instance.close()
          }, 800)
        } else {
          this.$store.state.examState.examParse = true
          if (this.$route.name === 'chapter_exam') {
            // 记录错题
            let data = {
              param: {
                cid: this.$route.params.tid,
                uid: this.$store.state.userInfo.id,
                pid: this.$route.params.pid,
                error: this.exam.number
              }
            }
            this.$store.dispatch('saveError', data)
          }
        }
      },
      exam () {
        this.watchExam()
      },
      value (newValue) {
        if (newValue) {
          let data = this.$store.state.examState.userAnswer
          let change = false
          for (let i = 0; i < data.length; i++) {
            if (data[i].no === this.exam.number) {
              data[i].val = newValue
              change = true
            }
          }
          if (change === false) {
            data.push({no: this.exam.number, val: newValue})
          }
          this.$store.commit('saveAnswer', data)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .multi
    display flex
    flex-direction column
    .mint-checklist-label
      display flex
      flex-direction row
      align-items center
      font-size 14px
      line-height 20px
      padding 10px 0
    .title, .choice
      font-size 14px
      padding 5px
</style>
