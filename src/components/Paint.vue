<template>
  <div class="paint">
    <canvas id="canvas" v-bind:style="canvasStyle" v-on:click="click" />
    <div class="tool-bar">
      <div id="back-btn" v-on:click="backward" />
      <div id="done-btn" v-on:click="next" />
      <div id="forward-btn" v-on:click="forward" />
    </div>
    <div class="picker-container" v-if="!pickerHidden" >
      <div id="unfold-btn" v-on:click="pickerHidden = true" />
      <color-picker ref="picker" v-bind:colors="$route.params.colors" selection />
    </div>
    <div class="picker-container transparent" v-else >
      <div id="fold-btn" v-on:click="pickerHidden = false" />
    </div>
  </div>
</template>

<script>
import ColorPicker from './ColorPicker'
import sprintf from 'sprintf'
import floodfill from 'floodfill' // eslint-disable-line
import Hammer from 'hammerjs'

export default {
  name: 'paint',
  data () {
    return {
      pickerHidden: false,
      steps: [
        // {x: 0, y: 0, color: '#ff5800'}
      ],
      stepIndex: 0,
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

    this.loadImage(() => {
      console.log('loadImage', {x: this.canvas.width, y: this.canvas.height})
      this.canvas.hidden = false

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
      this.scale = maxScale

      // TODO: bounce效果
      // TODO: 初始化缩放动画

      this.HammerInit()
    })
    this.canvas.hidden = true
  },

  methods: {
    loadImage (complete) {
      let img = new Image()
      img.onload = () => {
        // 画布大小
        this.canvas.width = img.width
        this.canvas.height = img.height

        this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)

        if (complete) {
          complete()
        }
      }
      img.crossOrigin = 'Anonymous'
      img.src = this.$route.params.img
    },

    HammerInit () {
      var offset = {}

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
        offset.scale = this.scale * ev.scale
        console.log('pinchstart', offset.scale)
      })
      mc.on('pinch', (ev) => {
        this.scale = offset.scale * ev.scale
        this.scale = Math.min(this.scale, this.maxScale)
        this.scale = Math.max(this.minScale, this.scale)
      })

      // mc.on('tap', (ev) => {
      //   let point = {x: ev.center.x - this.translate.x, y: ev.center.y - this.translate.y}
      //   console.log('tap', point)
      //   this.fill(point.x, point.y, this.$refs.picker.color)
      // })
    },

    click (event) {
      let x = event.offsetX
      let y = event.offsetY
      console.log('click', {x: x, y: y})

      let data = this.ctx.getImageData(x, y, 1, 1).data
      console.log(data)
      if (data[0] < 0x30 && data[1] < 0x30 && data[2] < 0x30 && data[3] !== 0) {
        console.log('skip the line')
        return
      }

      this.fill(x, y, this.$refs.picker.color)
      this.steps = this.steps.slice(0, this.stepIndex++)
      this.steps.push({x: x, y: y, color: this.$refs.picker.color})
    },

    fill (x, y, color) {
      this.ctx.fillStyle = color
      this.ctx.fillFlood(x, y, 32)
    },

    backward () {
      if (this.stepIndex <= 0) {
        return
      }

      console.log('backward')
      this.stepIndex --
      this.loadImage(() => {
        for (var i = 0; i < this.stepIndex && i < this.steps.length; i++) {
          let {x, y, color} = this.steps[i]
          this.fill(x, y, color)
        }
      })
    },

    forward () {
      if (this.stepIndex >= this.steps.length) {
        return
      }

      console.log('forward')
      let {x, y, color} = this.steps[this.stepIndex ++]
      this.fill(x, y, color)
    },

    next () {
      let params = this.$route.params
      params.img = this.canvas.toDataURL('image/png')
      params.steps = this.steps.slice(0, this.stepIndex)
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
.transparent {
  background: transparent;
}
#unfold-btn {
  width: 5vw;
  height: 10vw;
  background: url(../assets/unfold.svg) no-repeat center;
}
#fold-btn {
  width: 15vw;
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

  /*background-color: rgba(0, 0, 0, 0.1);*/
}
.tool-bar div {
  width: 24vw;
  height: 8vw;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  /*background-color: white;*/
}
#back-btn {
  background-image: url(../assets/backward-btn.png);
}
#done-btn {
  background-image: url(../assets/done-btn.png);
}
#forward-btn {
  background-image: url(../assets/forward-btn.png);
}
</style>
