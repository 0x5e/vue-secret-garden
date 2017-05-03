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
import ColorPicker from './ColorPicker'

export default {
  name: 'select_color',
  data () {
    return {
      list: [{
        'desc': '少女的第一盘眼影',
        'colors': ['#6F0051', '#971B40', '#FAB3AF', '#FCC584', '#F0D6E3', '#E2DEF0', '#EF766D', '#F2A6B3', '#FECFBB', '#FDE3B2', '#E97585', '#E95166']
      },
      {
        'desc': '凌晨六点窗沿有雾气',
        'colors': ['#C8D3F3', '#F3F8ED', '#DCECF2', '#C1D9EA', '#97B9D8', '#A1C0EE', '#42576A', '#717D9B', '#A7748A', '#C1B6B0', '#ECCE90', '#E0D6A3']
      },
      {
        'desc': '小河边上浮萍初现',
        'colors': ['#8BB297', '#8F8373', '#D8907A', '#C2D3A6', '#D3E28D', '#93D9F2', '#1E8B88', '#CAE37B', '#8D9C1F', '#6D7A66', '#CED8D9', '#B3C8BA']
      }]
    }
  },

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
