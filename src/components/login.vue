<template>
  <div class="login">
    <div class="mask">
      <div class="main-content">
        <div class="head">
          <div class="left" @click="goBack">
            <i class="icon iconfont icon-fanhui1"></i>
          </div>
          <div class="title">登录</div>
          <div class="right"></div>
        </div>
        <div class="form">
          <form>
            <mt-field v-model.trim="tel" type="tel" :state="validate.tel"
                      placeholder="请输入账号"></mt-field>
            <mt-field v-model.trim="pwd" type="password" :state="validate.pwd"
                      placeholder="请输入密码"></mt-field>
            <div style="margin-top: 20px">
              <mt-button style="display: block;width: 95%;margin: 5px auto" type="primary"
                         @click.native.prevent="login">登 录
              </mt-button>
              <!--<mt-button style="display: block;width: 95%;margin: 0 auto" @click.native.prevent="goRegister"-->
                         <!--type="default">没有账号？立即注册-->
              <!--</mt-button>-->
            </div>
          </form>
          <div class="forgetpwd" @click="forget">
            忘记密码？
          </div>
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
      Indicator,
      Field,
      Toast,
      'v-button': Button
    },
    data () {
      return {
        redirect: null,
        tel: '',
        pwd: '',
        validate: {
          tel: '',
          pwd: ''
        }
      }
    },
    created () {
      // 检测是否登陆，如果已经登陆，则向后跳转
      if (this.$store.state.isLogin) {
        this.$router.push({path: '/member'})
      } else {
        let userInfo = this.$cookie.get('user')
        if (userInfo) {
          userInfo = JSON.parse(userInfo)
          this.tel = userInfo.tel
          this.pwd = userInfo.pwd
        }
      }
    },
    methods: {
      goBack () {
        this.$router.push({path: '/'})
      },
      forget () {
        this.$router.push({path: '/forget'})
      },
      goRegister () {
        this.$router.push({path: '/reg'})
      },
      login () {
        this.checkTel(this.tel)
        this.checkPwd(this.pwd)
        if (this.validate.tel === this.validate.pwd && this.validate.pwd === 'success') {
          Indicator.open({
            text: '加载中...',
            spinnerType: 'snake'
          })
          var that = this
          var obj = {
            data: {
              tel: this.tel,
              pwd: this.pwd
            },
            failed: function (info) {
              Indicator.close()
              let instance = Toast({
                message: info,
                iconClass: 'mint-toast-icon mintui mintui-field-warning'
              })
              setTimeout(function () {
                instance.close()
              }, 1500)
            },
            success: function () {
              Indicator.close()
              if (that.redirect) {
                that.$router.push({path: that.redirect})
              } else {
                that.$router.push({path: '/member'})
              }
            }
          }
          this.$store.dispatch('handleLogin', obj)
        } else {
          let instance = Toast({
            message: '账号或密码不得为空',
            iconClass: 'mint-toast-icon mintui mintui-field-warning'
          })
          setTimeout(function () {
            instance.close()
          }, 1500)
        }
      },
      checkTel (tel) {
        /* if (/1[345678](\d){9}/g.exec(tel)) {
          this.validate.tel = 'success'
        } else {
          this.validate.tel = 'error'
        } */
        this.validate.tel = tel ? 'success' : 'error'
      },
      checkPwd (pwd) {
        this.validate.pwd = pwd ? 'success' : 'error'
      }
    },
    watch: {
      tel (newValue) {
        this.checkTel(newValue)
      },
      pwd (newValue) {
        this.checkPwd(newValue)
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
          .forgetpwd
            font-size 16px
            text-align center
            color #0086b3
            padding 10px
</style>
