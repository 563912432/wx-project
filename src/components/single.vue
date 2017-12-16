<template>
  <div class="single">
    <div class="title">
      <mt-badge size="small">题目</mt-badge>
      <span v-html="exam.title"></span>
    </div>
    <div class="choice">
      <mt-radio title="请选择" v-model="value" :options='options'></mt-radio>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Toast, Badge, Radio} from 'mint-ui'
  import {mapGetters} from 'vuex'
  export default {
    name: 'single',
    components: {
      Toast,
      Badge,
      Radio
    },
    props: {
      exam: {
        type: Object,
        require: true
      }
    },
    computed: {
      ...mapGetters(['createSignature']),
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
        value: ''
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
          this.value = ''
        }
      }
    },
    watch: {
      exam () {
        this.watchExam()
      },
      value (newValue) {
        if (newValue) {
          let that = this
          if (this.$route.name === 'chapter_exam' || this.$route.name === 'error_exam') {
            // 验证是否答对了
            if (this.value === this.exam.right_answer) {
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
                let signatureObj = this.createSignature
                let data = {
                  param: {
                    random: signatureObj.random,
                    signature: signatureObj.signature,
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

<style scoped lang="stylus" rel="stylesheet/stylus">
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
