<template>
  <div class="message">
    <div class="head">
      <div class="left" @click="goBack">
        <i class="icon iconfont icon-fanhui1"></i>
      </div>
      <div class="title">消息中心</div>
      <div class="right"></div>
    </div>
    <div class="list" v-if="message.length > 0">
      <div class="item" v-for="msg in message" @click="goDetail(msg.msg_id, msg.msg.content)">
        <div class="title">{{msg.msg.title}}</div>
        <div class="remark">
          {{ msg.msg.addtime }}
        </div>
      </div>
    </div>
    <div class="list" v-else style="text-align: center;padding-top: 15px; color:#999">
      暂无消息
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {COMMON} from '../mixins'
  import {Indicator, Toast} from 'mint-ui'
  import {mapGetters} from 'vuex'
  export default {
    mixins: [COMMON],
    name: 'message',
    components: {
      Indicator,
      Toast
    },
    computed: {
      ...mapGetters(['memberMsg'])
    },
    data () {
      return {
        message: []
      }
    },
    created () {
      this.$store.commit('setSelected', '4')
      this.getMessage()
    },
    methods: {
      goBack () {
        this.$router.push({path: '/member'})
      },
      goDetail (id, msg) {
        this.$router.push({path: '/message/' + id, content: msg})
      },
      getMessage () {
        if (this.memberMsg !== null) {
          this.message = this.memberMsg
          return
        }
        Indicator.open('Loading')
        let that = this
        let data = {
          uid: this.$store.state.userInfo.id,
          success: function (list) {
            Indicator.close()
            that.message = list
          },
          error: function () {
            Indicator.close()
          }
        }
        this.$store.dispatch('getMessage', data)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .message
    flex 1
    display flex
    flex-direction column
    position absolute
    z-index 1
    top 0
    width 100%
    height 100%
    background #FBF9FE
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
    .mint-header
      width: 100%
      font-size: 18px
    .list
      padding-bottom 10px
      flex 1
      overflow auto
      .item
        font-size 16px
        padding 10px
        overflow hidden
        border-bottom 1px solid #eee
        display flex
        flex-direction column
        .remark
          padding 5px 0 0 0
          font-size 12px
          color #999
          text-align right
</style>
