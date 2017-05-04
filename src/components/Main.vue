<template>
  <div class="main">
    <div class="item" 
      v-for="(item, idx) in list"
      v-bind:style="{ borderColor: item.color, color: item.color }"
      :key="idx">
      <div class="text">{{item.desc}}</div>
      <router-link :to="{name: 'Select', params: item}">
        <img class="pic" v-bind:src="item.imgs[0]"></img>
      </router-link>
    </div>
  </div>
</template>

<script>
import AV from 'leancloud-storage'

export default {
  name: 'main',
  data () {
    return {
      list: []
    }
  },
  mounted () {
    new AV.Query('item').find().then((items) => {
      this.list = items.map((item) => { return item.attributes })
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
