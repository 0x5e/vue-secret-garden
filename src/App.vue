<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import AV from 'leancloud-storage'
AV.init({
  appId: process.env.LEANCLOUD_APPID,
  appKey: process.env.LEANCLOUD_APPKEY
})

export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  /*-webkit-overflow-scrolling: touch;*/
}
body {
  margin: 0;
}
html {
  /*background: #f0f0f0;*/
}
* {
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s;
  position: absolute;
  width: 100vw;
  height: 100vh;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 1.5s ease;
  position: absolute;
  width: 100vw;
  height: 100vh;
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: translateX(10px);
  opacity: 0;
}
</style>
