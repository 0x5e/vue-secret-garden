<template>
  <div class="paint">
    <canvas id="canvas" v-on:click="click" />
    <div class="btn" id="back-btn" v-on:click="backward" />
    <div class="btn" id="done-btn" v-on:click="next" />
    <div class="btn" id="forward-btn" v-on:click="forward" />
    <div class="picker-container" v-if="!picker_hidden" >
      <img id="fold-btn" src="../assets/unfold.svg" v-on:click="fold" />
      <color-picker ref="picker" v-bind:colors="$route.params.colors" selection="true" />
    </div>
    <div class="picker-container" v-else >
      <img id="fold-btn" src="../assets/fold.svg" v-on:click="fold" />
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
      picker_hidden: false
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
      PinchZoom(this.canvas, {
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
      this.picker_hidden = !this.picker_hidden
    },

    backward () {

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
  background: rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: row;
  align-items: center;

  border-radius: 5vw;
  padding: 2vw;
}
#fold-btn {
  width: 5vw;
  height: 20vw;
  padding-top: 5vw;
  padding-bottom: 5vw; 
}
#canvas {
  background: #ffffff;
}
.btn {
  width: 6vw;
  height: 6vw;
  margin: 2vw;
  /*padding: 2vw;*/
  /*background: rgba(0, 0, 0, 0.1);*/

  position: fixed;
  top: 5vw;

}
#back-btn {
  left: 15vw;
  background: url(../assets/backward-btn.svg) no-repeat center;
}
#done-btn {
  left: 45vw;
  background: url(../assets/done-btn.svg) no-repeat center;
}
#forward-btn {
  right: 15vw;
  background: url(../assets/forward-btn.svg) no-repeat center;
}
</style>
