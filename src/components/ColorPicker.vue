<template>
  <div class="color-picker">
    <div class="circle"
      v-for="(color, idx) in colors"
      v-bind:class="{ first: (idx == 0), active: (selection === 'true') && (idx === index) }"
      v-bind:style="{ background: color }"
      v-bind:title="idx"
      v-on:click="select"/>
  </div>
</template>

<script>
export default {
  name: 'color-picker',
  props: ['colors', 'selection'],

  data () {
    return {
      index: 0
    }
  },

  computed: {
    color () {
      return this.colors ? this.colors[this.index] : ''
    }
  },

  methods: {
    select (event) {
      this.index = parseInt(event.toElement.title)
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
  display: flex;
  flex-flow: row wrap;
  width: 54vw;
}
.circle {
  width: 9vw;
  height: 9vw;
  display: inline-block;
  margin: 1.5vw;

  border-radius: 50%;
  box-shadow: 0px 0px 1px #B0B0B0;
}
.first {
  margin-left: 7.5vw;
}
.active {
  /*box-shadow: 0px 0px 1px #FFFFFF;*/
  border: 0.5vw solid black;
}
</style>
