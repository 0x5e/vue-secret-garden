<template>
  <div class="select-color">
    <div class="item" 
      v-for="(item, idx) in $route.params.colors"
      :key="idx">
      <router-link :to="{name: 'Paint', params: {img: $route.params.img, border: $route.params.border, colors: item.colors } }">
        <color-picker v-bind:colors="item.colors" />
      </router-link>
      <div class="desc">{{item.desc}}</div>
    </div>
  </div>
</template>

<script>
import ColorPicker from './ColorPicker'

export default {
  beforeCreate () {
    if (!this.$route.params.img) {
      this.$router.replace('/')
    }
  },

  components: {
    ColorPicker
  }
}
</script>

<style scoped>
.select-color {
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
