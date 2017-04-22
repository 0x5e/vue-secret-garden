<template>
  <div class="feedback">
    <div class="text-container">
      <div class="text">您的马克杯正在孕育</div>
      <div class="text">它将成为<span class="index">第{{$route.query.count + 1}}位</span>马克宝宝</div>
      <div class="text">请在接收到手机短信之后</div>
      <div class="text">前往月牙楼525认领哦~</div>
    </div>
    <div class="bottom">
      <img src="../assets/feedback_bg2.svg" />
    </div>

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
.text-container {
  margin: 0 auto;
  margin-top: 15vh;
  width: 90vw;
  height: 50vh;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background: url(../assets/feedback_bg.svg) no-repeat center;
}
.text {
  font-size: 5vw;
  line-height: 8vw;
}
.index {
  color: #84AD4F;
  font-size: 6vw;
}
.bottom {
  margin: 0 auto;
  width: 90vw;
  height: auto;
}
</style>
