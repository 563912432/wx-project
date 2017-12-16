<template>
  <div class="tp-material">
    <div class="material">
      <mt-badge size="small">材料</mt-badge>
      <span v-html="exam.material"></span>
    </div>
    <div class="title">
      <mt-badge size="small">题目{{index+1}}</mt-badge>
      <span v-html="exam.title[index]"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Badge, Toast} from 'mint-ui'
  export default {
    name: 'material',
    components: {
      Badge,
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
    watch: {
      exam () {
        if (this.orientation) {
          this.index = this.exam['title'].length - 1
        } else {
          this.index = 0
        }
        this.len = this.exam['title'].length
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .tp-material
    flex: 1
    padding 5px
    font-size 14px
    .mint-checklist-label
      display flex
      flex-direction row
      align-items center
      line-height 20px
      padding 10px 0
      font-size 14px
    .title, .choice
      padding 5px
</style>
