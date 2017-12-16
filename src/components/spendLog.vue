<template>
  <div class="mycourse">
    <div class="head">
      <div class="left" @click="goBack">
        <i class="icon iconfont icon-fanhui1"></i>
      </div>
      <div class="title">我的账单</div>
      <div class="right"></div>
    </div>
    <div class="list">
      <div class="item" v-for="log in logs">
        <div class="title" v-html="log.course_order.remark + log.course_order.course"></div>
        <div class="remark">
          消费时间：{{ log.create_time }}
        </div>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {COMMON} from '../mixins'
  import {Indicator, Toast, Button} from 'mint-ui'
  import {mapGetters} from 'vuex'
  export default {
    mixins: [COMMON],
    name: 'spendLog',
    components: {
      Indicator,
      Toast,
      'v-button': Button
    },
    computed: {
      ...mapGetters(['spendlog', 'createSignature'])
    },
    data () {
      return {
        logs: []
      }
    },
    created () {
      this.getSpendLog()
    },
    methods: {
      goBack () {
        this.$router.push({path: '/member'})
      },
      getSpendLog () {
        Indicator.open('请稍后…')
        let that = this
        let signatureObj = this.createSignature
        let data = {
          param: {
            random: signatureObj.random,
            signature: signatureObj.signature,
            uid: this.$store.state.userInfo.id,
            lastlogintime: this.$store.state.userInfo.lastlogintime
          },
          callback: function (res) {
            Indicator.close()
            switch (res.status) {
              case 1:
                let list = JSON.parse(res.info)
                that.logs = list
                break
              case -1:
                let instance = Toast({
                  message: res.info,
                  iconClass: 'mint-toast-icon mintui mintui-field-warning',
                  duration: 1500
                })
                setTimeout(function () {
                  that.$store.commit('logout')
                  instance.close()
                  that.$router.push({path: '/login'})
                }, 1500)
                break
              case 0:
                let error = res.info
                if (!error) {
                  error = '操作失败'
                }
                Toast({
                  message: error,
                  duration: 1000
                })
                break
              default:
                Toast({
                  message: '操作失败',
                  iconClass: 'mint-toast-icon mintui mintui-field-warning',
                  duration: 1500
                })
                break
            }
          }
        }
        this.$store.dispatch('getMySpendLog', data)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

  .mycourse
    flex 1
    display flex
    flex-direction column
    position absolute
    z-index 1
    top 0
    width 100%
    height 100%
    background #FBF9FE
    .mint-cell-wrapper
      padding 15px 0
    .head
      height 50px
      font-size 18px
      display flex
      flex-direction row
      align-items center
      border-bottom 1px solid #ddd
      box-shadow: 2px 2px 2px rgba(175, 209, 252, 0.5);
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
    .list
      padding-bottom 10px
      flex 1
      overflow auto
      .item
        font-size 12px
        padding 10px
        overflow hidden
        border-bottom 1px solid #eee
        display flex
        flex-direction column
        .remark
          padding 5px 0 0 0
          font-size 12px
          color #999
</style>
