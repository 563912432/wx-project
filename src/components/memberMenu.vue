<template>
  <div class="menu">
    <div class="menu-list">
      <!--<div class="list-item" @click="bindWx" v-show="isWxBrowser">-->
        <!--<i class="icon iconfont icon-bangding" style="color: #87c38f"></i>-->
        <!--<span>{{ bind ? '解绑微信' : '绑定微信' }}</span>-->
      <!--</div>-->
      <div class="list-item" @click="kCode()">
        <i class="icon iconfont icon-k" style="color: #87c38f"></i>
        <span>K码通道</span>
      </div>
      <div class="list-item" @click="modifyPwd">
        <i class="icon iconfont icon-lock_fill" style="color: #87c38f"></i>
        <span>修改密码</span>
      </div>
      <!--<div class="list-item" @click="goRouter('contactus')">-->
        <!--<i class="icon iconfont icon-coordinates_fill" style="color: #87c38f"></i>-->
        <!--<span>联系我们</span>-->
      <!--</div>-->
      <div class="list-item" @click="logout">
        <i class="icon iconfont icon-close" style="color: #87c38f"></i>
        <span>退出登录</span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import {MessageBox, Indicator, Toast} from 'mint-ui'
  import {mapGetters} from 'vuex'
  export default {
    name: 'memberMenu',
    components: {
      Toast,
      MessageBox,
      Indicator
    },
    data () {
      return {
        bind: false,
        isWxBrowser: this.$store.getters.isWxBrowser
      }
    },
    computed: {
      ...mapGetters(['createSignature'])
    },
    methods: {
      goRouter (path) {
        this.$router.push({path: path})
      },
      logout () {
        this.$store.commit('logout')
        this.$router.push({path: '/login'})
      },
      kCode () {
        let that = this
        MessageBox.prompt('请输入您的K码', 'K码通道', {inputType: 'text'}).then(({value}) => {
          if (value) {
            Indicator.open({
              text: '加载中...',
              spinnerType: 'snake'
            })
            let signatureObj = this.createSignature
            var obj = {
              param: {
                random: signatureObj.random,
                signature: signatureObj.signature,
                uid: this.$store.state.userInfo.id,
                code: value
              },
              callback: function (res) {
                Indicator.close()
                let instance = null
                switch (res.status) {
                  case 1:
                    instance = Toast({
                      message: '课程开通成功',
                      iconClass: 'mint-toast-icon mintui mintui-success'
                    })
                    setTimeout(function () {
                      instance.close()
                      that.$router.push({path: '/mycourse'})
                    }, 1000)
                    break
                  case -1:
                    instance = Toast({
                      message: res.info,
                      iconClass: 'mint-toast-icon mintui mintui-field-warning'
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
                      error = '开通失败'
                    }
                    Toast({
                      message: error,
                      duration: 1000
                    })
                    break
                  default:
                    Toast({
                      message: '操作失败',
                      duration: 1000
                    })
                    break
                }
              }
            }
            this.$store.dispatch('useKCode', obj)
          }
        })
      },
      bindWx () {
        this.bind = !this.bind
        if (this.bind) {
          Toast({
            message: '绑定成功',
            iconClass: 'mint-toast-icon mintui mintui-success',
            duration: 1500
          })
        } else {
          Toast({
            message: '解绑成功',
            iconClass: 'mint-toast-icon mintui mintui-success',
            duration: 1500
          })
        }
      },
      modifyPwd () {
        MessageBox.prompt('请输入新密码', '修改密码', {inputType: 'password'}).then(({value}) => {
          if (value) {
            Indicator.open({
              text: '加载中...',
              spinnerType: 'snake'
            })
            let _this = this
            let signatureObj = this.createSignature
            var obj = {
              param: {
                random: signatureObj.random,
                signature: signatureObj.signature,
                uid: this.$store.state.userInfo.id,
                new_pwd: value
              },
              callback: function (res) {
                Indicator.close()
                switch (res.status) {
                  case 1:
                    Toast({
                      message: res.info,
                      iconClass: 'mint-toast-icon mintui mintui-success',
                      duration: 1500
                    })
                    break
                  case -1:
                    let instance = Toast({
                      message: res.info,
                      iconClass: 'mint-toast-icon mintui mintui-field-warning',
                      duration: 1500
                    })
                    setTimeout(function () {
                      _this.$store.commit('logout')
                      instance.close()
                      _this.$router.push({path: '/login'})
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
                      message: '操作失败',
                      iconClass: 'mint-toast-icon mintui mintui-field-warning',
                      duration: 1500
                    })
                    break
                }
              }
            }
            this.$store.dispatch('updatePwd', obj)
          }
        }
      )
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .mint-msgbox-confirm, .mint-msgbox-cancel
    font-size 4vw

  .menu
    background: #f3f3f3
    padding-top: 5px
    .menu-list
      background #fff
      display flex
      flex-direction column
      .list-item
        display flex
        flex-flow row nowrap
        align-items center
        border-bottom 1px solid #eee
        padding 15px
        .icon
          font-size: 20px
          margin-right 10px
        span
          font-size: 16px
</style>
