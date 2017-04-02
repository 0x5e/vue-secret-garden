<template>
  <div class="paint">
    <div class="top">
      <table cellpadding="10" cellspacing="0">
        <td v-for="color in colors"
          v-bind:class="{active: (color === picked)}"
          v-bind:style="{ background: color }"
          v-bind:title="color"
          v-on:click="select"/>
      </table>
    </div>
    <div class="canvas-container">
      <canvas id="canvas" v-on:click="click"></canvas>  
    </div>
    <div class="bottom">
      <span>
        联系方式:
        <input type="phone" v-model="phone" placeholder="手机号/邮箱">
        <button v-on:click="submit">上传</button>
      </span>
    </div>
  </div>
</template>

<script>
import AV from 'leancloud-storage'
import 'floodfill'
import pinchZoom from 'pinch-zoom'

export default {
  name: 'paint',
  data () {
    let colors = [
      '#247ba0',
      '#70c1b3',
      '#b2dbbf',
      '#f3ffbd',
      '#ff1654'
      // '#50514f',
      // '#f25f5c',
      // '#ffe066',
      // '#247ba0',
      // '#70c1b3'
    ]

    return {
      msg: 'Secret Garden',
      picked: colors[0],
      colors: colors,
      imgSrc: 'static/gezi1.1.png',
      phone: ''
    }
  },

  mounted () {
    if (!CanvasRenderingContext2D.prototype.fillFlood) {
      alert('CanvasRenderingContext2D.fillFlood() not supported')
      return
    }

    this.AVInit()
    this.loadImage()
  },

  methods: {
    AVInit () {
      AV.init({
        appId: process.env.LEANCLOUD_APPID,
        appKey: process.env.LEANCLOUD_APPKEY
      })
    },

    loadImage () {
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')

      let img = new Image()
      img.src = this.imgSrc
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        // this.pinchZoomInit()
      }
    },

    pinchZoomInit () {
      let canvas = document.querySelector('#canvas')
      pinchZoom(canvas, {
        draggable: true,
        maxScale: 4
      })
    },

    select (event) {
      this.picked = event.toElement.title
      console.log('select: ' + this.picked)
    },

    click (event) {
      let {offsetX, offsetY} = event
      console.log('click: ' + [offsetX, offsetY])

      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')

      ctx.fillStyle = this.picked
      ctx.fillFlood(offsetX, offsetY, 32)
    },

    submit (event) {
      console.log(event)
      if (!this.phone) {
        alert('请输入联系方式')
        return
      }

      let canvas = document.getElementById('canvas')
      let url = canvas.toDataURL('image/jpeg')
      let data = {base64: url.split(',')[1]}
      let file = new AV.File('canvas.jpg', data)
      file.metaData('owner', this.phone)

      let btn = event.toElement
      btn.disabled = true
      file.save({
        onprogress: (e) => {
          if (e.direction === 'upload') { return }
          console.log('progress: ' + e.progress)
        }
      }, {}).then((file) => {
        console.log(file.attributes)
        alert('上传成功！')
      }, (error) => {
        console.error(error)
        alert('上传失败！')
        btn.disabled = false
      })
    }
  }

}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.canvas-container {
  width: 90vw;
  height: 90vw;
  margin: 5vw;
  background: #f0f0f0;
  border: thin solid black;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
#canvas {
  margin: 5vw;
}
.active {
  border: thin solid black;
}
</style>
