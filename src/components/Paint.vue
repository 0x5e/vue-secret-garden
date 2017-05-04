<template>
  <div class="paint">
    <canvas id="canvas" v-bind:style="canvasStyle" v-on:click="click" />
    <div class="tool-bar">
      <div id="back-btn" v-on:click="backward" />
      <div id="done-btn" v-on:click="next" />
      <div id="forward-btn" v-on:click="forward" />
    </div>
    <div class="picker-container" v-if="!pickerHidden" >
      <div id="unfold-btn" v-on:click="pickerHidden = !pickerHidden" />
      <color-picker ref="picker" v-bind:colors="$route.params.colors" selection="true" />
    </div>
    <div class="picker-container" v-else >
      <div id="fold-btn" v-on:click="pickerHidden = !pickerHidden" />
    </div>
  </div>
</template>

<script>
import ColorPicker from './ColorPicker'
import sprintf from 'sprintf' // eslint-disable-line
import floodfill from 'floodfill' // eslint-disable-line
import Hammer from 'hammerjs' // eslint-disable-line

export default {
  name: 'paint',
  data () {
    return {
      pickerHidden: false,
      offset: {x: 0, y: 0},
      translate: {x: 0, y: 0},
      scale: 1,
      minScale: 1,
      maxScale: 1
    }
  },

  computed: {
    canvas () {
      return document.getElementById('canvas')
    },
    ctx () {
      return this.canvas.getContext('2d')
    },
    canvasStyle () {
      return {
        marginLeft: this.offset.x + 'px',
        marginTop: this.offset.y + 'px',
        transform: sprintf('translate(%dpx, %dpx) scale(%f, %f)', this.translate.x, this.translate.y, this.scale, this.scale)
      }
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
      img.onload = () => {
        console.log('canvas loaded')
        this.canvas.hidden = false

        // 画布大小
        this.canvas.width = img.width
        this.canvas.height = img.height

        // 画布居中
        this.offset = {x: (window.innerWidth - this.canvas.width) / 2, y: (window.innerHeight - this.canvas.height) / 2}

        // 缩放范围
        let scaleX = window.innerWidth / this.canvas.width
        let scaleY = window.innerHeight / this.canvas.height
        console.log('scale', scaleX, scaleY)

        let minScale = Math.min(scaleX, scaleY)
        let maxScale = Math.max(scaleX, scaleY)

        this.minScale = minScale
        this.maxScale = maxScale * 4.0
        // this.scale = maxScale

        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)

        this.HammerInit()
      }
      this.canvas.hidden = true
      img.src = this.$route.params.img
    },

    HammerInit () {
      var offset = {}
      var scale = 1.0

      let mc = new Hammer(this.canvas)

      // 画布偏移量
      mc.get('pan').set({direction: Hammer.DIRECTION_ALL})
      mc.on('panstart', (ev) => {
        offset = {x: this.translate.x, y: this.translate.y}
        console.log('panstart', offset)
      })
      mc.on('panmove', (ev) => {
        this.translate = {x: offset.x + ev.deltaX, y: offset.y + ev.deltaY}
      })

      // 画布缩放
      mc.get('pinch').set({enable: true})
      mc.on('pinchstart', (ev) => {
        scale = this.scale
        console.log('pinchstart', scale)
      })
      mc.on('pinch', (ev) => {
        this.scale = scale * ev.scale
        this.scale = Math.min(this.scale, this.maxScale)
        this.scale = Math.max(this.minScale, this.scale)
      })

      // mc.on('tap', (ev) => {
      //   console.log(ev)
      //   let point = {x: ev.center.x - this.translate.x, y: ev.center.y - this.translate.y}
      //   console.log('tap', point)

      //   let data = this.ctx.getImageData(point.x, point.y, 1, 1).data
      //   if (data[0] === 0 && data[1] === 0 && data[2] === 0 && data[3] === 255) {
      //     console.log('skip the line')
      //     return
      //   }

      //   this.ctx.fillStyle = this.$refs.picker.color
      //   this.ctx.fillFlood(point.x, point.y, 32)
      // })
    },

    click (event) {
      let x = event.offsetX
      let y = event.offsetY
      console.log('click', {x: x, y: y})

      let data = this.ctx.getImageData(x, y, 1, 1).data
      if (data[0] === 0 && data[1] === 0 && data[2] === 0 && data[3] === 255) {
        console.log('skip the line')
        return
      }

      this.ctx.fillStyle = this.$refs.picker.color
      this.ctx.fillFlood(x, y, 32)
    },

    backward () {
      this.offset = {x: 0, y: 0}
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
  overflow: overlay;
  background-color: #f0f0f0;
}
#canvas {
  background-color: white;
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
