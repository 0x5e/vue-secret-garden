<template>
  <div class="main">
    <div class="item" 
      v-for="(item, idx) in list"
      v-bind:style="{ borderColor: item.border, color: item.border }"
      :key="idx">
      <div class="text">{{item.desc}}</div>
      <router-link :to="{name: 'SelectCanvas', params: item}">
        <img class="pic" v-bind:src="item.imgs[0]"></img>
      </router-link>
    </div>
  </div>
</template>

<script>
// import config from '../config'
import AV from 'leancloud-storage'

export default {
  data () {
    return {
      list: []
    }
  },

  mounted () {
    // console.log(JSON.stringify(config))
    // this.list = config.items

    new AV.Query('config').first().then((object) => {
      console.log(object)
      let config = object.attributes.data
      this.list = config.items
    }, (error) => {
      console.error(error)
      alert(error)
    })
  }
}
</script>

<style scoped>
.main {
  /*margin: 5vw;*/
}
.item {
  position: relative;
  /*margin: 2vw;*/
  margin-top: 3vw;
  margin-bottom: 3vw;
  margin-left: 5vw;
  margin-right: 5vw;

  border: 1.5px solid;
  border-radius: 5vw;
  /*border-color: #ff5800;*/
}
.pic {
  height: 34vw;
  width: 90vw;
  object-fit: cover;
  opacity: 0.5;
  border-radius: 5vw;
}
.text {
  position: absolute;
  font-size: 4.5vw;

  width: 100%;
  line-height: 34vw;
  text-align: center;
}
</style>
