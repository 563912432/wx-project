<template>
  <div>
    <mt-popup v-model="isShow" position="bottom" :closeOnClickModal="false">
      <span class="close" @click="setVisible"><i class="icon iconfont icon-close"></i> </span>
      <div class="parse-info">
        <h2>我要提问</h2>
        <div class="info">
          <mt-field class="textarea" @input='desc' @change="setAsk()" placeholder="我的提问" type="textarea" rows="7" :attr="{ maxlength: 250 }" v-model="askInfo">
            <span style="position: absolute;top: 70px;right: 0">{{ remnant }}/250</span>
          </mt-field>
          <div style="padding-top: 10px">
            <mt-button type="primary" size="small" style="float: right" @click="submit">提交</mt-button>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Popup, Field, Button, Indicator, Toast} from 'mint-ui'
  import { mapGetters } from 'vuex'
  export default {
    name: 'myAsk',
    data () {
      return {
        remnant: 250,
        askInfo: ''
      }
    },
    components: {
      Popup,
      Field,
      Button,
      Indicator,
      Toast
    },
    props: ['number'],
    computed: {
      ...mapGetters(['createSignature']),
      isShow: {
        get: function () {
          return this.$store.state.examState.examAsk
        },
        set: function (newValue) {
          this.$store.state.examState.examAsk = newValue
        }
      }
    },
    methods: {
      setVisible () {
        this.$store.commit('setExamAsk', false)
        this.askInfo = ''
      },
      desc () {
        let length = this.askInfo.length
        this.remnant = 250 - length
      },
      setAsk () {
        this.$store.commit('setAsk', this.askInfo)
      },
      submit () {
        if (this.askInfo === '') {
          Toast({
            message: '请输入内容',
            duration: 1500
          })
        } else {
          Indicator.open('正在处理')
          let that = this
          let signatureObj = this.createSignature
          let data = {
            params: {
              random: signatureObj.random,
              signature: signatureObj.signature,
              ti_num: this.number,
              uid: this.$store.state.userInfo.id,
              course_id: this.$route.params.tid,
              ask: this.$store.state.askContent
            },
            callback: function (res) {
              Indicator.close()
              let instance = null
              switch (res.status) {
                case 1:
                  Toast({
                    message: res.info,
                    duration: 1500
                  })
                  setTimeout(function () {
                    that.setVisible()
                  }, 1500)
                  break
                case -1:
                  instance = Toast({
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
                  Toast({
                    message: res.info,
                    iconClass: 'mint-toast-icon mintui mintui-field-warning',
                    duration: 1500
                  })
                  break
                default:
                  Toast({
                    message: '保存失败',
                    iconClass: 'mint-toast-icon mintui mintui-field-warning',
                    duration: 1500
                  })
                  break
              }
            }
          }
          this.$store.dispatch('submitAsk', data)
          this.askInfo = ''
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .mint-popup
    width 100%
    height 50%
    overflow auto
    flex 1
    display flex
    flex-direction column
    .close
      position absolute
      z-index 5
      right 10px
      top 10px
      width 20px
      height 20px
      color #fff
    .parse-info
      flex 1
      display flex
      flex-direction column
      overflow auto
      h2
        position fixed
        width 100%
        font-size 14px
        padding 10px 5px
        color #fff
        background #3f5977
        .icon
          font-size 18px
      .info
        padding 50px 20px 0 20px
        color #35495e
        font-size 14px
        line-height 25px
        letter-spacing 1px
        .textarea
          border solid 1px #ddd
</style>
