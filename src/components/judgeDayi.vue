<template>
  <div class="judge">
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
  import { Badge, Radio } from 'mint-ui'
  export default {
    name: 'judge',
    props: {
      exam: {
        type: Object,
        require: true
      }
    },
    components: {
      Badge,
      Radio
    },
    data () {
      return {
        options: [
          {label: '对', value: 'A', disabled: true},
          {label: '错', value: 'B', disabled: true}
        ],
        value: ''
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .judge
    display flex
    flex-direction column
    font-size 14px
    .mint-radiolist-label
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
