<template>
  <div class="msg">
    <div class="head">
      <div class="left" @click="goBack">
        <i class="icon iconfont icon-fanhui1"></i>
      </div>
      <div class="title">{{msg.msg.title}}</div>
      <div class="right"></div>
    </div>
    <div class="info">
      <span v-html="msg.msg.content"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {COMMON} from '../mixins'
  export default {
    mixins: [COMMON],
    name: 'messageDetail',
    created () {
      this.$store.commit('setSelected', '4')
    },
    computed: {
      ...mapGetters(['memberMsg']),
      msg () {
        for (let i = 0; i < this.memberMsg.length; i++) {
          if (this.memberMsg[i].msg_id === this.$route.params.id) {
            return this.memberMsg[i]
          }
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .msg
    flex 1
    display flex
    flex-direction column
    position absolute
    z-index 1
    top 0
    width 100%
    height 100%
    background #fff
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
      .title
        flex 1
        text-align center
    .info
      flex 1
      display flex
      flex-direction column
      padding 20px 10px 0
      color #999999
      font-size 14px
      line-height 28px

</style>
