<template>
  <div class="select">
    <router-link class="list"
      v-for="(item, idx) in list"
      :to="{name: 'Paint', params: item}"
      :key="idx">
      <img class="pic" v-bind:src="item.img"></img>
      <span class="name">{{item.name}}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'select',
  data () {
    return {
      list: [
        {
          name: '猫·睡意',
          img: 'static/secret1.1.png',
          text: '愿你化作春日里的一只乳猫，徘徊，徜徉，追逐飞虫，品味阳光。享受手心的温暖，获得内心的宁和。'
        },
        {
          name: '猫·嬉戏',
          img: 'static/secret2.1.png',
          text: '愿你化作春日里的一只乳猫，徘徊，徜徉，追逐飞虫，品味阳光。享受手心的温暖，获得内心的宁和。'
        },
        {
          name: '鲤·争食',
          img: 'static/secret3.1.png',
          text: '愿你化作春日里的一只乳猫，徘徊，徜徉，追逐飞虫，品味阳光。享受手心的温暖，获得内心的宁和。'
        }
      ]
    }
  }
}
</script>

<style scoped>
.select {
  margin: 2vw;
}
.list {
  position: relative;
}
.pic {
  /*width: 80vw;*/
  height: 40vh;
  width: auto;
  margin: 2vw;
  background: #ffffff;
}
.name {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 5vw;
  color: black;
  background: white;
  margin: 2vw;
}
</style>
