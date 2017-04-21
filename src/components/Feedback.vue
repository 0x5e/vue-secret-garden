<template>
  <div class="feedback">
    <div>您的马克杯正在孕育</div>
    <div>它将成为第0位马克宝宝</div>
    <div>请在接收到手机短信之后</div>
    <div>前往月牙楼525认领哦~</div>
  </div>
</template>

<script>
export default {
  name: 'feedback',
  data () {
    return {
    }
  },

  mounted () {

  }
}
</script>

<style scoped>
.feedback {
  /*margin: 5vw;*/
}
.item {
  position: relative;
  margin: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.index {
  /*background: #ff5800;*/
  color: #ffffff;
  width: 5vw;
  height: 5vw;
  border-radius: 50%;
  font-size: 3vw;
  margin: 2vw;
  vertical-align: middle;
}
.pic {
  height: 40vw;
  width: 95vw;
  object-fit: cover;

  border: 0.6vw solid;
  border-radius: 5vw;
  /*border-color: #ff5800;*/
}
</style>
