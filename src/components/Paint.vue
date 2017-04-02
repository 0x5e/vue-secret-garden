<template>
  <div class="paint">
    <h1>{{ msg }}</h1>
    <table cellpadding="20">
      <td rowspan="5" valign="top" v-for="option in options" v-bind:style="{ background: option }" v-bind:title="option" v-on:click="select">
      </td>
    </table>
    <span>
      <a>联系方式:</a>
      <input type="phone" v-model="phone" placeholder="手机号/邮箱">
      <button v-on:click="submit">上传</button>
    </span>
    <p/>
    <canvas id="canvas" width="800" height="800" v-on:click="click"></canvas>
  </div>
</template>

<script>
import AV from 'leancloud-storage'
import 'floodfill'

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
      // '#70c1b3',
    ]

    return {
      msg: 'Secret Garden',
      picked: colors[0],
      options: colors,
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
      img.src = 'static/bg.jpeg'
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      }
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
#canvas {
  /*width: 80%;*/
  /*height: 80%;*/
},
#paint {
  /*width: 100%;*/
  /*height: 100%;*/
  /*background: #f0f0f0;*/
}
</style>
