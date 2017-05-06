<template>
  <div class="color-picker">
    <div class="circle"
      v-for="(color, idx) in colors"
      v-bind:class="{ first: (idx == 0), active: selection != null && (idx === index) }"
      v-bind:style="{ background: color }"
      v-bind:title="idx"
      v-on:click="select"/>
  </div>
</template>

<script>
export default {
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
  width: 72vw; /* (circle.width + circle.margin * 2) * (count + 0.5) */
}
.circle {
  width: 8vw;
  height: 8vw;
  display: inline-block;
  margin-left: 1.5vw;
  margin-right: 1.5vw;
  margin-top: 0.75vw;
  margin-bottom: 0.75vw;

  border-radius: 50%;
  box-shadow: 0px 0px 1px #B0B0B0;
}
.first {
  margin-left: 7.5vw; /* circle.width * 0.5 + circle.margin * 2 */
}
.active {
  /*box-shadow: 0px 0px 1px #FFFFFF;*/
  border: 0.5vw solid black;
}
</style>
