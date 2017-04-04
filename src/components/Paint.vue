<template>
  <div class="paint">
    <canvas id="canvas" v-on:click="click"></canvas>
    <color-picker ref="picker"></color-picker>
    <button id="done-btn" v-on:click="next">✅</button>
  </div>
</template>

<script>
import 'floodfill'
import PinchZoom from 'pinch-zoom'
import ColorPicker from './ColorPicker'

export default {
  name: 'paint',
  data () {
    return {

    }
  },

  computed: {
    canvas () {
      return document.getElementById('canvas')
    },
    ctx () {
      return this.canvas.getContext('2d')
    }
  },

  mounted () {
    if (!CanvasRenderingContext2D.prototype.fillFlood) {
      alert('CanvasRenderingContext2D.fillFlood() not supported')
      return
    }

    this.loadImage()
  },

  methods: {
    loadImage () {
      let img = new Image()
      img.src = this.$route.params.img
      img.onload = () => {
        this.canvas.width = img.width
        this.canvas.height = img.height

        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)

        this.pinchZoomInit()
      }
    },

    pinchZoomInit () {
      PinchZoom(this.canvas, {
        draggable: true,
        maxScale: 5
      })
    },

    click (event) {
      let x = event.offsetX
      let y = event.offsetY
      console.log('click: ' + [x, y])

      let data = this.ctx.getImageData(x, y, 1, 1).data
      if (data[0] === 0 && data[1] === 0 && data[2] === 0 && data[3] === 255) {
        console.log('skip the line')
        return
      }

      this.ctx.fillStyle = this.$refs.picker.color
      this.ctx.fillFlood(x, y, 32)
    },

    next () {
      let params = this.$route.params
      params.img = this.canvas.toDataURL('image/png')
      this.$router.push({
        name: 'Submit',
        params: params
      })
    }
  },

  components: {
    ColorPicker
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.paint {
  width: 100vw;
  height: 100vh;
  /*overflow: scroll;*/
}
#canvas {
  background: #ffffff;
}
#done-btn {
  width: 10vw;
  height: 10vw;
  background: #303030;
  border-width: 0;

  position: absolute;
  right: 5vw;
  bottom: 5vh;
}
</style>
