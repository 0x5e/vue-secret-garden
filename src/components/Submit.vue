<template>
  <div class="submit">
  <img class="pic" v-bind:src="$route.params.img"></img>
  <div class="name">杯中语</div>
  <div class="text">{{$route.params.text}}</div>
  <textarea id="msg" placeholder="我要留言"></textarea>
  <button id="submit" v-on:click="submit">提交</button>
  </div>
</template>

<script>
import AV from 'leancloud-storage'

export default {
  name: 'submit',
  data () {
    return {

    }
  },

  computed: {
    msg () {
      return document.getElementById('msg').value
    },
    author () {
      return ''
    }
  },

  methods: {
    submit () {
      let b64data = this.$route.params.img.replace(/^data:image\/(png|jpg);base64,/, '')
      let data = {base64: b64data}
      let file = new AV.File('canvas.png', data)
      file.metaData('author', this.author)
      file.metaData('msg', this.msg)

      let btn = document.getElementById('submit')
      btn.disabled = true
      file.save({
        onprogress: (e) => {
          if (e.direction === 'upload') { return }
          console.log('progress: ' + e.progress)
        }
      }, {}).then((file) => {
        console.log(file.attributes)
        alert('上传成功！')
        // this.queryCounter()
      }, (error) => {
        console.error(error)
        alert('上传失败！')
        btn.disabled = false
      })
    },

    queryCounter () {
      var query = new AV.Query('_File')
      query.count().then((count) => {
        alert('count: ' + count)
      }, (error) => {
        console.log(error)
      })
    }
  },

  watch: {

  }
}
</script>

<style scoped>
.submit {
  margin: 5vw;
}
.pic {
  /*width: 80vw;*/
  height: 40vh;
  width: auto;
  background: #ffffff;
}
.name {
  font-size: 6vw;
  text-align: left;
  margin-top: 5vw;
}
.text {
  font-size: 4.5vw;
  text-align: left;
  margin-top: 2vw;
  margin-bottom: 5vw;
}
#msg {
  width: 80vw;
  height: 15vh;
  padding: 3vw;
  font-size: 5vw;
}
#submit {
  width: 30vw;
  font-size: 5vw;
  margin-top: 2vw;
}
</style>
