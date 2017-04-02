<template>
  <div class="color-picker">
    <table cellpadding="10" cellspacing="0">
      <td v-for="color in colors"
        v-bind:class="{active: (color === picked)}"
        v-bind:style="{ background: color }"
        v-bind:title="color"
        v-on:click="select"/>
    </table>
  </div>
</template>

<script>
export default {
  name: 'color-picker',
  data () {
    let colors = ['#247ba0', '#70c1b3', '#b2dbbf', '#f3ffbd', '#ff1654']
    return {
      picked: colors[0],
      colors: colors
    }
  },
  computed: {
    color () {
      return this.picked
    }
  },
  methods: {
    select (event) {
      this.picked = event.toElement.title
      console.log('select: ' + this.picked)
    }
  }
}
</script>

<style scoped>
.active {
  border: thin solid black;
}
</style>
