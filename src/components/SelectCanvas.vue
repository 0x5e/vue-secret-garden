<template>
  <div class="select-canvas">
    <div class="item" 
      v-for="(img, idx) in $route.params.imgs"
      :key="idx">
      <div class="index"
        v-bind:style="{ background: $route.params.border }">{{idx+1}}</div>
      <router-link :to="{name: 'SelectColor', params: {img: img, border: $route.params.border, colors: $route.params.colors } }">
        <img class="pic"
          v-bind:src="img"
          v-bind:style="{ borderColor: $route.params.border }"></img>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  beforeCreate () {
    if (!this.$route.params.imgs) {
      this.$router.replace('/')
    }
  },

  mounted () {
    document.title = this.$route.params.name
  }
}
</script>

<style scoped>
.select {
  /*margin: 5vw;*/
}
.item {
  position: relative;
  margin: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.index {
  /*background: #ff5800;*/
  color: #ffffff;
  width: 5vw;
  height: 5vw;
  line-height: 5vw;
  border-radius: 50%;
  font-size: 3vw;
  margin: 2vw;
  /*vertical-align: middle;*/
}
.pic {
  height: 40vw;
  width: 95vw;
  object-fit: cover;

  border: 1.5px solid;
  border-radius: 5vw;
  /*border-color: #ff5800;*/
}
</style>
