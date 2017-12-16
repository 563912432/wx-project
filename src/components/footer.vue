<template>
  <div class="footer">
    <mt-tabbar v-model="selected">
      <mt-tab-item id="1" @click.native='goRouter(1)'>
        <i class="icon iconfont icon-homepage_fill"></i>
        <span>欢迎</span>
      </mt-tab-item>
      <mt-tab-item id="2" @click.native='goRouter(2)'>
        <i class="icon iconfont icon-manage_fill"></i>
        <span>课程</span>
      </mt-tab-item>
      <mt-tab-item id="3" @click.native='goRouter(3)'>
        <i class="icon iconfont icon-playon_fill"></i>
        <span>视频</span>
      </mt-tab-item>
      <mt-tab-item id="4" @click.native='goRouter(4)'>
        <i class="icon iconfont icon-mine_fill"></i>
        <span>我的</span>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabItem } from 'mint-ui'
import { mapState } from 'vuex'
export default {
  name: 'footer',
  computed: {
    ...mapState(['selected']),
    selected: {
      get: function () {
        return this.$store.state.setSelected
      },
      set: function (newValue) {
        this.$store.commit('setSelected', newValue)
      }
    }
  },
  components: {
    Tabbar,
    TabItem
  },
  methods: {
    goRouter (index) {
      this.$store.commit('setSelected', index)
      switch (index) {
        case 1:
          this.$router.push({path: '/'})
          break
        case 2:
          this.$router.push({path: '/tk'})
          break
        case 3:
          this.$router.push({path: '/video'})
          break
        case 4:
          this.$router.push({path: '/member'})
          break
      }
    }
  }
}
</script>

<style lang="stylus" rel='stylesheet/stylus'>
  .footer
    .icon
      font-size 25px
    .mint-tab-item-label
      display flex
      flex-direction column
</style>
