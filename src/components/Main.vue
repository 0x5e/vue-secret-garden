<template>
  <div class="main">
    <div class="item" 
      v-for="(item, idx) in list"
      v-bind:style="{ borderColor: item.color, color: item.color }"
      :key="idx">
      <div class="text">{{item.desc}}</div>
      <router-link :to="{name: 'Select', params: item}">
        <img class="pic" v-bind:src="item.img"></img>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main',
  data () {
    return {
      list: [
        {
          name: '樱·猫咪',
          desc: '樱花树下橘猫清澈的眸子',
          color: '#EECA7D',
          img: 'static/tiane03.png',
          imgs: [
            'static/tiane03.png',
            'static/tiane03.png',
            'static/tiane03.png'
          ]
        },
        {
          name: '荷·锦鲤',
          desc: '立夏三日下荷塘与鱼嬉戏',
          color: '#85AE51',
          img: 'static/secret1.1.png',
          imgs: [
            'static/secret1.1.png',
            'static/secret1.1.png',
            'static/secret1.1.png'
          ]
        },
        {
          name: '葵·松鼠',
          desc: '黄昏向日葵看向松鼠尾巴',
          color: '#E87D5C',
          img: 'static/secret2.1.png',
          imgs: [
            'static/secret2.1.png',
            'static/secret2.1.png',
            'static/secret2.1.png'
          ]
        },
        {
          name: '梅·天鹅',
          desc: '倒映天空黑天鹅细嗅红梅',
          color: '#3E4C55',
          img: 'static/secret3.1.png',
          imgs: [
            'static/secret3.1.png',
            'static/secret3.1.png',
            'static/secret3.1.png'
          ]
        }
      ]
    }
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

  border: 0.6vw solid;
  border-radius: 5vw;
  /*border-color: #ff5800;*/
}
.pic {
  height: 35vw;
  width: 90vw;
  object-fit: cover;
  opacity: 0.25;
  border-radius: 5vw;
}
.text {
  position: absolute;
  vertical-align: middle;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 4vw;
}
</style>
