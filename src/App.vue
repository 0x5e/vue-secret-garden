<template>
  <div id="app">
    <router-view></router-view>
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
</style>
