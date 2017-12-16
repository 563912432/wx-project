<template>
  <div class="single">
    <div class="title">
      <mt-badge size="small">题目</mt-badge>
      <span v-html="exam.title"></span>
    </div>
    <div class="choice">
      <mt-radio v-model="value" :options='options'></mt-radio>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Badge, Radio} from 'mint-ui'
  export default {
    name: 'single',
    components: {
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
      options () {
        let az = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
        let opt = []
        for (let i = 0; i < this.exam.option.length; i++) {
          opt.push({
            label: this.exam.option[i],
            value: az[i],
            disabled: true
          })
        }
        return opt
      }
    },
    data () {
      return {
        value: ''
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
