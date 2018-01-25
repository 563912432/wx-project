<template>
  <div class="forget">
    <div class="mask">
      <div class="main-content">
        <div class="head">
          <div class="left" @click="goBack">
            <i class="icon iconfont icon-fanhui1"></i>
          </div>
          <div class="title">修改密码</div>
          <div class="right"></div>
        </div>
        <div class="form">
          <mt-field v-model.trim="tel" type="tel"
                    placeholder="请输入手机号"></mt-field>
          <mt-field v-model.trim="pwd" placeholder="请输入新密码" type="password"></mt-field>
          <mt-field v-model.trim="code" placeholder="请输入手机验证码">
            <mt-button type="primary" size="small" v-bind:disabled='send' @click.native.prevent="sendVerifyCode">
              {{sendBtnText}}
            </mt-button>
          </mt-field>
          <div style="margin-top: 20px">
            <mt-button style="display: block;width: 95%;margin: 5px auto" type="primary"
                       @click.native="modifyPwd">修改密码
            </mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Field, Button, Toast, Indicator} from 'mint-ui'
  export default {
    name: 'forget',
    components: {
      Field,
      Toast,
      Indicator,
      'v-button': Button
    },
    data () {
      return {
        // 发送验证码按钮点击后的文字
        sendBtnText: '发送验证码',
        send: false,
        tel: '',
        pwd: '',
        code: ''
      }
    },
    methods: {
      sendVerifyCode () {
        // 进行验证
        let that = this
        let obj = {
          param: {
            nocheck: 1,
            tel: this.tel,
            uuid: this.$store.getters.createUUID
          },
          success: function () {
            that.send = true
            let i = 120
            var timer = setInterval(function () {
              if (i > 0) {
                i--
                that.sendBtnText = i + '秒后可重发'
              } else {
                that.send = false
                that.sendBtnText = '点击发送验证码'
                clearInterval(timer)
              }
            }, 1000)
          },
          error: function (info) {
            Toast({
              message: info,
              iconClass: 'mint-toast-icon mintui mintui-field-warning',
              duration: 1500
            })
          }
        }
        this.$store.dispatch('sendVerifyCode', obj)
      },
      modifyPwd () {
        let that = this
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        })
        let data = {
          param: {
            tel: this.tel,
            new_pwd: this.pwd,
            code: this.code,
            uuid: this.$store.getters.createUUID
          },
          error: function (msg) {
            if (!msg) {
              msg = '操作失败'
            }
            Indicator.close()
            Toast({
              message: msg,
              iconClass: 'mint-toast-icon mintui mintui-field-warning',
              duration: 1500
            })
          },
          success: function () {
            Indicator.close()
            let instance = Toast({
              message: '密码修改成功',
              iconClass: 'mint-toast-icon mintui mintui-success'
            })
            setTimeout(function () {
              instance.close()
              that.$router.push({path: '/login'})
            }, 1000)
          }
        }
        this.$store.dispatch('modifyPwd', data)
      },
      goBack () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .forget
    position absolute
    width 100%
    height 100%
    top: 0
    left: 0
    z-index 10
    background #000
    .mask
      width 100%
      height 100%
      background #f3f3f3
      display flex
      .main-content
        flex 1
        display flex
        flex-direction column
        .head
          height 50px
          display flex
          flex-direction row
          align-items center
          font-size 18px
          margin-bottom 5vw
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
        .form
          flex 1
</style>
