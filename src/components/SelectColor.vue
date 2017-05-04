<template>
  <div class="select_color">
    <div class="item" 
      v-for="(item, idx) in list"
      :key="idx">
      <router-link :to="{name: 'Paint', params: {'img': $route.params.img, 'color': $route.params.color, 'colors': item.colors } }">
        <color-picker v-bind:colors="item.colors" />
      </router-link>
      <div class="desc">{{item.desc}}</div>
    </div>
  </div>
</template>

<script>
import AV from 'leancloud-storage'
import ColorPicker from './ColorPicker'

export default {
  name: 'select_color',
  data () {
    return {
      list: []
    }
  },

  beforeCreate () {
    if (!this.$route.params.img) {
      this.$router.replace('/')
    }
  },

  mounted () {
    new AV.Query('color').find().then((colors) => {
      this.list = colors.map((color) => { return color.attributes })
    })
  },

  components: {
    ColorPicker
  }
}
</script>

<style scoped>
.select_color {
  padding-top: 10vw;
}
.item {
  position: relative;
  margin: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.desc {
  margin: 5vw;
  color: #303030;
  font-size: 4vw;
}
</style>
