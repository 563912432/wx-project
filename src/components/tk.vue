<template>
  <div class="tk">
    <div class="wrapper">
      <div class="list" v-for="course in courseList">
        <h3>{{course.title}}</h3>
        <div class="list-items">
          <div class="item" v-for="item in course._" @click="goRouter(item.id)">
            <img :src="uploadPath + item.thumb" :alt="item.title">
            <strong>{{item.title}}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast, Indicator} from 'mint-ui'
  import {mapGetters} from 'vuex'
  export default {
    name: 'tk',
    components: {
      Toast,
      Indicator
    },
    computed: {
      ...mapGetters(['uploadPath', 'myCourses'])
    },
    data () {
      return {
        courseList: []
      }
    },
    methods: {
      goRouter (index) {
        this.$router.push({path: '/tk/' + index})
      },
      getList () {
        Indicator.open({
          text: '列表获取中...',
          spinnerType: 'snake'
        })
        let that = this
        let callBack = {
          id: 0,
          success: function (list) {
            that.courseList = list
            that.$store.commit('setCourseList', list)
            Indicator.close()
          },
          error: function (error) {
            if (!error) {
              error = '课程列表获取失败'
            }
            Indicator.close()
            Toast({
              message: error,
              iconClass: 'mint-toast-icon mintui mintui-field-warning',
              duration: 1500
            })
          }
        }
        this.$store.dispatch('getCourseCateList', callBack)
      }
    },
    created () {
      this.$store.commit('setSelected', '2')
      if (this.$store.state.courseList.length <= 0) {
        this.getList()
      } else {
        this.courseList = this.$store.state.courseList
      }
    }
  }
</script>

<style lang="stylus" rel='stylesheet/stylus'>
  .tk
    flex 1
    display flex
    flex-direction column
    overflow hidden
    background #f3f3f3
    .icon
      font-size 40px
    .wrapper
      flex 1
      overflow auto
      .list
        display flex
        flex-direction column
        background #fff
        margin-bottom 5px
        h3
          padding 15px 0 10px 15px
          color #666
          font-size 14px
        .list-items
          display flex
          flex-flow row wrap
          .item
            flex 0 0 33.3%
            display flex
            padding 10px
            flex-direction column
            justify-content center
            align-items center
            img
              width 40px
              height 40px
              border 1px solid #eee
              border-radius 20px
              margin-bottom 10px
          strong
            font-size 12px
</style>
