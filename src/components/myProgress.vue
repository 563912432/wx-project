<template>
  <div class="progress">
    <div class="head">
      <div class="left" @click="goBack">
        <i class="icon iconfont icon-fanhui1"></i>
      </div>
      <div class="title">进度列表</div>
      <div class="right"></div>
    </div>
    <div class="list" v-if="list">
      <router-link class="item" v-for="item in list" key="item.id"
                   :to="(item.paper && (+item.paper.type === 1)) ? '/chapter_exam/'+$route.params.tid +'/'+ item.paper_id +'/'+item.id : '/exam/'+$route.params.tid +'/'+ item.paper_id +'/'+item.id ">
        <div class="p_title">
          <span>{{item.tag}}</span>
          <mt-progress :value="+(((item.do / (item.do+item.undo)) * 100).toFixed(2))" :barHeight=5>
            <div slot="end"></div>
          </mt-progress>
        </div>
        <div class="actions" @click.prevent="delRecord(item.id)"><i class="icon iconfont icon-trash_fill"></i></div>
      </router-link>
    </div>
    <div class="list" v-else
         style="display: flex;flex-direction: column;align-items: center;justify-content: center;color:#999">
      <i class="icon iconfont icon-meiyougengduo" style="font-size: 40vw; color: rgba(7,17,27,0.1)"></i>
      <small>哎呀，还没有记录呢</small>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Indicator, Toast, Progress} from 'mint-ui'
  import {mapGetters} from 'vuex'
  export default {
    name: 'progress',
    data () {
      return {
        list: null
      }
    },
    components: {
      Indicator,
      Toast,
      'v-progress': Progress
    },
    created () {
      // 清空上次的考试状态
      this.clearExamState()
      this.getProgressList()
    },
    computed: {
      ...mapGetters(['createSignature'])
    },
    methods: {
      goBack () {
        this.$router.go(-1)
      },
      clearExamState () {
        this.$store.commit('clearExamState')
      },
      getProgressList () {
        Indicator.open('处理中…')
        let that = this
        let signatureObj = this.createSignature
        let data = {
          param: {
            random: signatureObj.random,
            signature: signatureObj.signature,
            uid: this.$store.state.userInfo.id,
            cid: this.$route.params.tid
          },
          callback: function (res) {
            Indicator.close()
            switch (res.status) {
              case 1:
                let list = JSON.parse(res.info)
                that.list = list
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
                  error = '没有记录'
                }
                Toast({
                  message: error,
                  duration: 1000
                })
                this.list = null
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
        this.$store.dispatch('getProgressList', data)
      },
      delRecord (id) {
        Indicator.open('载入中…')
        let that = this
        let signatureObj = this.createSignature
        let data = {
          param: {
            random: signatureObj.random,
            signature: signatureObj.signature,
            id: id,
            uid: this.$store.state.userInfo.id,
            cid: this.$route.params.tid
          },
          callback: function (res) {
            Indicator.close()
            switch (res.status) {
              case 1:
                that.list = that.list.filter(v => {
                  return +v.id !== +id
                })
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
                  error = '删除失败'
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
        this.$store.dispatch('delProgressRecord', data)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .progress
    position absolute
    z-index: 1
    width 100%
    height 100%
    background #FBF9FE
    flex 1
    overflow auto
    display flex
    flex-direction column

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

  .list
    flex 1
    padding 0 0 0 5px
    .item
      border-bottom 1px solid #f3f3f3
      display flex
      flex-direction row
      align-items center
      .p_title
        border-right 1px dashed #f3f3f3
        padding 5px 0
        flex 1
        display flex
        flex-direction column
        span
          padding 10px 0 0 5px
        .mt-progress
          padding 3px 10px
      .actions
        color #999
        padding 5px 15px
        color #66ccff
    a
      color #666
</style>
