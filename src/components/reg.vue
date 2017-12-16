<template xmlns="http://www.w3.org/1999/html">
  <div class="login">
    <div class="mask">
      <div class="main-content">
        <div class="head">
          <div class="left" @click="goBack">
            <i class="icon iconfont icon-fanhui1"></i>
          </div>
          <div class="title">注册</div>
          <div class="right"></div>
        </div>
        <div class="form">
          <form>
            <mt-field v-model.trim="tel" type="tel" :state="validate.tel"
                      placeholder="请输入手机号"></mt-field>
            <mt-field v-model.trim="pwd" type="password" :state="validate.pwd"
                      placeholder="请输入密码"></mt-field>
            <mt-field v-model.trim="notpwd" :state="validate.notpwd" type="password"
                      placeholder="请再次输入密码"></mt-field>
            <mt-field v-model.trim="truename" :state="validate.truename" type="text"
                      placeholder="请填写真实姓名，填写后不可修改"></mt-field>
            <mt-field v-model.trim="code" name="code" placeholder="请输入手机验证码">
              <mt-button size="small" type="primary" v-bind:disabled='send' @click.native.prevent="sendVerifyCode">
                {{sendBtnText}}
              </mt-button>
            </mt-field>
            <div style="margin-top: 20px">
              <mt-button style="display: block;width: 95%;margin: 5px auto" type="primary"
                         @click.native.prevent="register">立即注册
              </mt-button>
              <mt-button style="display: block;width: 95%;margin: 0 auto" @click.native.prevent="goLogin"
                         type="default">已有账号？立即登陆
              </mt-button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Field, Button, Indicator, Toast} from 'mint-ui'
  export default {
    name: 'login',
    components: {
      Field,
      Toast,
      'v-button': Button
    },
    data () {
      return {
        // 发送验证码按钮点击后的文字
        sendBtnText: '发送验证码',
        tel: '',
        pwd: '',
        notpwd: '',
        truename: '',
        code: '',
        send: false,
        validate: {
          tel: '',
          pwd: '',
          notpwd: '',
          truename: ''
        }
      }
    },
    methods: {
      goBack () {
        this.$router.go(-2)
      },
      forget () {
        this.$router.push({path: '/forget'})
      },
      goLogin () {
        this.$router.push({path: '/login'})
      },
      sendVerifyCode () {
        // 进行验证
        let that = this
        let obj = {
          param: {
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
      register () {
        let that = this
        Indicator.open({
          text: '加载中...',
          spinnerType: 'snake'
        })
        this.$store.dispatch('handleReg', {
          param: {
            tel: this.tel,
            pwd: this.pwd,
            code: this.code,
            truename: this.truename,
            uuid: this.$store.getters.createUUID
          },
          error: function (msg) {
            if (!msg) {
              msg = '注册失败'
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
              message: '恭喜，注册成功',
              iconClass: 'mint-toast-icon mintui mintui-success'
            })
            setTimeout(() => {
              instance.close()
              that.$router.push({path: '/login'})
            }, 1500)
          }
        })
      }
    },
    watch: {
      tel (newValue) {
        if (/1[345678](\d){9}/g.exec(newValue)) {
          this.validate.tel = 'success'
        } else {
          this.validate.tel = 'error'
        }
      },
      pwd (newValue) {
        this.validate.pwd = newValue ? 'success' : 'error'
      },
      notpwd (newValue) {
        this.validate.notpwd = (this.pwd === newValue) ? 'success' : 'error'
      },
      truename (newValue) {
        this.validate.truename = this.truename ? 'success' : 'error'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .login
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
          font-size 18px
          display flex
          flex-direction row
          align-items center
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
