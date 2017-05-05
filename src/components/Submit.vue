<template>
  <div class="submit">
    <div id="loading" v-if="loading" />
    <div class="title">您的佳作</div>
    <img class="pic" v-bind:style="borderStyle" v-bind:src="$route.params.img"></img>
    <img id="tips" src="../assets/submit_tips.svg"/>
    <div id="tips2" >请留下您的联系方式，方便工作人员与您联系。</div>
    <input type="number" id="phone" placeholder="手机号" v-bind:style="borderStyle" v-model="phone" />
    <img id="submit" src="../assets/submit.svg" v-on:click="submit"/>
  </div>
</template>

<script>
import AV from 'leancloud-storage'

export default {
  name: 'submit',
  data () {
    return {
      loading: false,
      phone: '',
      borderStyle: {
        borderColor: this.$route.params.color
      }
    }
  },

  beforeCreate () {
    if (!this.$route.params.img) {
      this.$router.replace('/')
    }
  },

  methods: {
    submit () {
      if (this.phone.length === 0) {
        alert('请输入联系方式')
        return
      }

      let b64data = this.$route.params.img.replace(/^data:image\/(png|jpg);base64,/, '')
      let data = {base64: b64data}
      let file = new AV.File('canvas.png', data)

      let imgObject = new (AV.Object.extend('canvas'))()
      imgObject.set('phone', this.phone)
      imgObject.set('steps', this.$route.params.steps)
      imgObject.set('url', file)

      this.loading = true
      imgObject.save({}, {fetchWhenSave: true}).then((object) => {
        console.log(object)
        this.$router.push({
          path: 'feedback',
          query: {
            'objectId': object.id,
            'count': object.attributes.index
          }
        })
      }, (error) => {
        this.loading = false
        console.error(error)
        alert(error)
      })
    }
  },

  watch: {

  }
}
</script>

<style scoped>
.submit {
  /*width: 90vw;*/
  /*margin: 0 auto;*/
}
.title {
  font-size: 5vw;
  text-align: center;
  padding: 3vw;
}
.pic {
  height: 80vw;
  width: 90vw;
  object-fit: cover;
  /*object-fit: contain;*/

  border: 1.5px solid;
  border-radius: 5vw;
  /*border-color: #ff5800;*/
}
#tips {
  width: 50vw;
  height: auto;
  display: block;
  margin: 3vw;
  margin-left: 6vw;
}
#tips2 {
  font-size: 3.5vw;
  margin: 3vw;
}
#phone {
  width: 75vw;
  padding: 2vw;
  font-size: 3.5vw;

  border: 1.5px solid;
  border-radius: 5vw;
  /*border-color: #ff5800;*/
  padding-left: 3vw;
}
#submit {
  width: 45vw;
  height: auto;
  margin: 5vw;
}
#loading {
  position: fixed;
  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.2);
}
</style>
