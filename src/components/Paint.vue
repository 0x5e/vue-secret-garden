<template>
  <div class="paint">
    <canvas id="canvas" v-on:click="click"></canvas>
    <color-picker ref="picker"></color-picker>
    <button id="done-btn" v-on:click="next">✅</button>
  </div>
</template>

<script>
import AV from 'leancloud-storage'
import 'floodfill'
import PinchZoom from 'pinch-zoom'
import ColorPicker from './ColorPicker.vue'

export default {
  name: 'paint',
  data () {
    return {
      imgSrc: 'static/gezi1.1.png'
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

        // Background
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

        this.pinchZoomInit()
      }
    },

    pinchZoomInit () {
      let canvas = document.querySelector('#canvas')
      PinchZoom(canvas, {
        draggable: true,
        maxScale: 5
      })
    },

    click (event) {
      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')

      let x = event.offsetX
      let y = event.offsetY
      console.log('click: ' + [x, y])

      let data = ctx.getImageData(x, y, 1, 1).data
      if (data[0] === 0 && data[1] === 0 && data[2] === 0) {
        console.log('skip the line')
        return
      }

      ctx.fillStyle = this.$refs.picker.color
      ctx.fillFlood(x, y, 32)
    },

    next () {
      alert('开发中。。。')
      // let canvas = document.getElementById('canvas')
      // let imgSrc = canvas.toDataURL('image/jpeg')
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
  background: #f0f0f0;
  /*overflow: scroll;*/
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
