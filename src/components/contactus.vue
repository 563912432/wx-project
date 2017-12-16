<template>
  <div class="contact">
    <div class="mask">
      <div class="main-content">
        <div class="title">联系我们</div>
        <div class="info">
          <span><i class="icon iconfont icon-qq"></i>　306932830（售后）</span>
          <span><i class="icon iconfont icon-dianhua"></i>　4006587060  </span>
        </div>
        <div class="close" @click="close">
          <i class="icon iconfont icon-guanbi1"></i>
        </div>
      </div>

    </div>

  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    name: 'contactus',
    methods: {
      close () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .contact
    position absolute
    width 100%
    height 100%
    top: 0
    left: 0
    z-index 10
    background #000
    .mask
      position relative
      width 100%
      height 100%
      background url('/static/img/world_map.jpg')
      background-size contain
      .main-content
        background rgba(0, 0, 0, 0.8)
        width 100%
        height 100%
        display flex
        flex-direction column
        align-items center
        color #ddd
        .title
          font-size 10vw
          height 250px
          display flex
          align-items center
        .info
          flex 1
          display flex
          flex-direction column
          justify-content flex-start
          .icon
            font-size 20px
          span
            font-size 18px
            padding 10px
        .close
          height 80px
          .icon
            font-size 30px
            bottom 0
</style>
