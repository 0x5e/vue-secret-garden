<template>
  <div class="paint">
    <canvas id="canvas" width="100vw" height="100vh" v-on:click="click" />
    <div class="tool-bar">
      <div id="back-btn" v-on:click="backward" />
      <div id="done-btn" v-on:click="next" />
      <div id="forward-btn" v-on:click="forward" />
    </div>
    <div class="picker-container" v-if="!pickerHidden" >
      <div id="unfold-btn" v-on:click="fold" />
      <color-picker ref="picker" v-bind:colors="$route.params.colors" selection="true" />
    </div>
    <div class="picker-container" v-else >
      <div id="fold-btn" v-on:click="fold" />
    </div>
  </div>
</template>

<script>
import 'floodfill'
import PinchZoom from 'pinch-zoom'
import ColorPicker from './ColorPicker'
import $ from 'jquery' // eslint-disable-line
import Panzoom from 'jquery.panzoom' // eslint-disable-line

export default {
  name: 'paint',
  data () {
    return {
      pickerHidden: false,
      pinchZoom: null
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

  beforeCreate () {
    if (!this.$route.params.img) {
      this.$router.replace('/')
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

      this.canvas.hidden = true
      img.onload = () => {
        this.canvas.hidden = false
        this.canvas.width = img.width
        this.canvas.height = img.height

        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)

        // todo 性能优化
        this.pinchZoomInit()

        // this.PanzoomInit()
      }
    },

    pinchZoomInit () {
      this.pinchZoom = PinchZoom(this.canvas, {
        draggable: true,
        maxScale: 5
      })
    },

    PanzoomInit () {
      $('#canvas').panzoom()
      $('#canvas').panzoom('option', {
        increment: 1,
        minScale: 0.2,
        maxScale: 5,
        duration: 500
      })
      $('#canvas').on('mousedown touchstart', (e) => {
        e.stopImmediatePropagation()
      })
      // $('#canvas').on('touchstart', this.click)
      // $('#canvas').click(this.click)
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

    fold () {
      this.pickerHidden = !this.pickerHidden
    },

    backward () {
      this.pinchZoom.reset()
    },

    forward () {

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
  overflow: scroll;
}
.picker-container {
  position: fixed;
  left: 5vw;
  bottom: 5vh;
  background: rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: row;
  align-items: center;

  border-radius: 5vw;
  padding: 2vw;

  height: 25vw;
}
#unfold-btn {
  width: 5vw;
  height: 10vw;
  background: url(../assets/unfold.svg) no-repeat center;
}
#fold-btn {
  width: 5vw;
  height: 10vw;
  background: url(../assets/fold.svg) no-repeat center;
}
#canvas {
  background: #ffffff;
}
.tool-bar {
  position: fixed;
  top: 0vw;
  width: 100vw;
  height: 15vw;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  background-color: rgba(0, 0, 0, 0.1); 
}
.tool-bar div {
  width: 10vw;
  height: 10vw;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 60% 60%;
}
#back-btn {
  background-image: url(../assets/backward-btn.svg);
}
#done-btn {
  background-image: url(../assets/done-btn.svg);
}
#forward-btn {
  background-image: url(../assets/forward-btn.svg);
}
</style>
