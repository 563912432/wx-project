<template>
  <div class="bianxi">
    <div class="title">
      <mt-badge size="small">题目</mt-badge>
      <span v-html="exam.title"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Badge, Radio, Toast} from 'mint-ui'
  export default {
    name: 'bianxi',
    components: {
      Badge,
      Radio,
      Toast
    },
    props: {
      exam: {
        type: Object,
        require: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .bianxi
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
