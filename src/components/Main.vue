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
export default {
  name: 'main',
  data () {
    return {
      list: [
        {
          name: '樱·猫咪',
          desc: '樱花树下橘猫清澈的眸子',
          color: '#EECA7D',
          imgs: [
            'static/paints/猫被子.png',
            'static/paints/猫描边.svg',
            'static/paints/猫叶.svg',
            'static/paints/线条猫.svg'
          ]
        },
        {
          name: '荷·锦鲤',
          desc: '立夏三日下荷塘与鱼嬉戏',
          color: '#85AE51',
          imgs: [
            'static/paints/藕.svg'
          ]
        },
        {
          name: '葵·松鼠',
          desc: '黄昏向日葵看向松鼠尾巴',
          color: '#E87D5C',
          imgs: [
            'static/paints/松鼠穿裤子.svg',
            'static/paints/松鼠徽.svg'
          ]
        },
        {
          name: '梅·天鹅',
          desc: '倒映天空黑天鹅细嗅红梅',
          color: '#3E4C55',
          imgs: [
            'static/paints/爱心鹅.svg',
            'static/paints/羽毛飘飘.svg'
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
