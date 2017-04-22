<template>
  <div class="select_color">
    <div class="head"></div>
    <div class="item" 
      v-for="(item, idx) in list"
      :key="idx">
      <router-link :to="{name: 'Paint', params: {'img': $route.params.img, 'color': $route.params.color, 'colors': item.colors } }">
        <div class="circle_container">
          <div class="start"></div>
          <div class="circle" v-for="color in item.colors" v-bind:style="{ background: color }"></div>
        </div>
      </router-link>
      <div class="desc">{{item.desc}}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'select_color',
  data () {
    return {
      list: [{
        'desc': '山谷上的繁星点点',
        'colors': ['#F2DED2', '#E6BFC0', '#CD919D', '#DE868A', '#673650', '#332C4B', '#797894', '#C6C9D7']
      },
      {
        'desc': '黑白无常',
        'colors': ['#F4F6F0', '#D4CEC8', '#D4C8D1', '#A86676', '#3A4141', '#2D2C30', '#554349', '#827A7F']
      },
      {
        'desc': '雪后初霁',
        'colors': ['#E0E0DE', '#BAA7AD', '#70495E', '#41374A', '#6C869B', '#888C9B', '#C2C8CF', '#D3DCDD']
      }]
    }
  },

  beforeCreate () {
    if (!this.$route.params.img) {
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped>
.head {
  height: 10vw;
}
.item {
  position: relative;
  margin: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.circle_container {
  display: flex;
  flex-flow: row wrap;
  width: 60vw;
  margin-left: 6vw;
}
.start {
  position: relative;
  display: inline-block;
  width: 4.5vw;
  margin: 1.5vw;
}
.circle {
  width: 9vw;
  height: 9vw;
  display: inline-block;
  margin: 1.5vw;

  border-radius: 50%;
  box-shadow: 0px 0px 1px #B0B0B0;
}
.desc {
  margin: 5vw;
  color: #303030;
  font-size: 4vw;
}
</style>
