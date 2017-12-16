<template>
  <div class="header">
    <div class="top">
      <div class="avatar">
        <img :src="uploadPath + userInfo.headimg" width="80" height="80">
      </div>
      <div class="info">
        <span>{{userInfo.tel}}   <i class="icon iconfont icon-vip"></i></span>
        <small>{{userInfo.wisdom}}</small>
      </div>
    </div>
    <div class="bg">
      <img :src="uploadPath + userInfo.headimg">
    </div>
    <div class="nav">
      <div class="nav-item" @click="goMyCourse">
        <i class="icon iconfont icon-manage_fill"></i>
        <span>我的课程</span>
      </div>
      <!--<div class="nav-item">-->
        <!--<i class="icon iconfont icon-huizhimobangaoqingtubiaosvgfuzhi" style="color: #87c38f"></i>-->
        <!--<span>笔记</span>-->
      <!--</div>-->
      <!--<div class="nav-item">-->
        <!--<i class="icon iconfont icon-fuwu-copy" style="color: #d4237a"></i>-->
        <!--<span>服务</span>-->
      <!--</div>-->
      <div class="nav-item" @click="goSpendLog">
        <i class="icon iconfont icon-coupons_fill"></i>
        <span>我的账单</span>
      </div>
    </div>
    <div class="msg-box" @click='goMsgCenter'>
      <div class="has-msg"></div>
      <i class="icon iconfont icon-xinxi"></i>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'memberHeader',
    computed: {
      ...mapGetters(['uploadPath'])
    },
    props: {
      userInfo: {
        type: Object
      }
    },
    methods: {
      goMsgCenter () {
        this.$router.push({'path': '/message'})
      },
      goSpendLog () {
        this.$router.push({'path': '/spendlog'})
      },
      goMyCourse () {
        this.$router.push({'path': '/mycourse'})
      }
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  .header
    position relative
    background rgba(0,0,0,0.5)
    .top
      height 120px
      display flex
      flex-direction row
      align-items center
      overflow hidden
      .avatar
        margin 15px
        width 82px
        height 82px
        border-radius 41px
        border 1px solid #eee
        display flex
        justify-content center
        align-items center
        img
          border-radius 40px
          width 80px
          height 80px
      .info
        display flex
        flex-direction column
        color #fff
        flex 1
        padding-top 3px
        small
          font-size 12px
          color: #999
        span
          font-size 22px
          .icon-vip
            font-size 22px
            color orange
    .nav
      background #fff
      display flex
      flex-flow row wrap
      padding 10px
      border-bottom 1px solid #eee
      height 50px
      .nav-item
        flex 0 0 50%
        display flex
        flex-direction row
        justify-content center
        align-items center
        font-size 16px
        vertical-align baseline
        .icon
          color #4caf50
          vertical-align baseline
          font-size 18px
          margin-right 3px
      .nav-item:nth-child(1)
        border-right 1px solid #eee
    .bg
      position absolute
      width 100%
      height 120px
      top 0
      left 0
      z-index -1
      img
        width 100%
        height 100%
        filter blur(10px)
    .msg-box
      position absolute
      top 10px
      right 10px
      .icon
        font-size 25px
        color #999

</style>
