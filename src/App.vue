<template>
  <div id="app">
    <!--<transition name="slide-fade">-->
      <router-view></router-view>
    <!--</transition>-->
    <v-footer></v-footer>
  </div>
</template>

<script>
  import footer from '@/components/footer'
  export default {
    name: 'App',
    components: {
      'v-footer': footer
    }
  }
</script>

<style lang='stylus' rel='stylesheet/stylus'>
  html, body
    width 100%
    height 100%
    overflow hidden
    display flex
    color: #2c3e50;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    #app
      flex 1
      overflow hidden
      display flex
      flex-direction column
      .footer
        height 56px
    .slide-fade-enter-active {
        transition: all .3s ease;
      }
    .slide-fade-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-active {
      transform: translateX(10px);
      opacity: 0;
    }
</style>
