<template>
  <div class="color-picker">
    <div class="block-container" v-bind:hidden="hidden">
      <div class="block"
        v-for="(item, idx) in colors"
        v-bind:style="{ background: item }"
        v-bind:class="{ active: idx === index }"
        v-bind:title="idx"
        v-on:click="select">
      </div>
    </div>
    <button class="tool-btn"
      v-bind:style="{ background: color }"
      v-on:click="hidden = !hidden"
      v-bind:hidden="!hidden">
      ✏
    </button>
  </div>
</template>

<script>
export default {
  name: 'color-picker',
  data () {
    return {
      index: 0,
      colors: [
        '#247ba0',
        '#70c1b3',
        '#b2dbbf',
        '#f3ffbd',
        '#50514f',
        '#ff1654',
        '#f25f5c',
        '#ffe066',
        '#ffffff'
      ],
      hidden: true
    }
  },

  computed: {
    color () {
      return this.colors[this.index]
    }
  },

  methods: {
    select (event) {
      this.index = parseInt(event.toElement.title)
      this.hidden = true
      console.log('select: ' + this.color)
    }
  },

  watch: {
    hidden: (newValue, oldValue) => {
      // let vm = this
      // TODO 动画
    }
  }
}
</script>

<style scoped>
.color-picker {
  /*position: absolute;*/
}
.tool-btn {
  width: 10vw;
  height: 10vw;
  border-width: 0;

  position: absolute;
  left: 5vw;
  bottom: 5vh;
}
.block-container {
  width: 25vw;
  height: 25vw;
  padding: 5vw;

  position: absolute;
  left: 5vw;
  bottom: 5vh;
  background: #b0b0b0;
}
.block {
  width: 5vw;
  height: 5vw;
  float: left;
  border: 0.5vw solid rgba(0, 0, 0, 0);
}
.active {
  border: 0.5vw solid black;
}
</style>
