<template>
  <div class="member">
    <memberHeader :userInfo="userInfo"></memberHeader>
    <memberMenu></memberMenu>
  </div>
</template>
<script>
  import memberHeader from '@/components/memberHeader'
  import memberMenu from '@/components/memberMenu'
  export default {
    name: 'member',
    components: {
      memberHeader,
      memberMenu
    },
    data () {
      return {
        userInfo: {headimg: ''}
      }
    },
    created () {
      this.$store.commit('setSelected', '4')
      this.userInfo = this.$store.state.userInfo
    }
  }
</script>

<style lang="stylus" rel='stylesheet/stylus'>
  .member
    flex 1
    display flex
    flex-direction column
</style>
