<template>
  <div class="feedback">
    <div class="text-container">
      <div>您的马克杯正在孕育</div>
      <div>它将成为<span class="index">第{{Number($route.query.count)}}位</span>马克宝宝</div>
      <div>请在接收到手机短信之后</div>
      <div>前往月牙楼525认领哦~</div>
    </div>
    <div class="bottom">
      <img class="qr" src="../assets/qr.png" />
    </div>
  </div>
</template>

<style scoped>
.feedback {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.text-container {
  width: 90vw;
  height: 50vh;

  margin: 0 auto;
  margin-top: 15vh;

  display: flex;
  flex-direction: column;
  justify-content: center;

  background: url(../assets/feedback_bg.svg) no-repeat center;

  font-size: 5vw;
  line-height: 8vw;
}
.index {
  color: #84AD4F;
  font-size: 6vw;
}
.bottom {
  width: 90vw;
  height: 50vw;
  background: url(../assets/feedback_bg2.svg) no-repeat center;

}
.qr {
  width: 18vw;
  height: 18vw;

  margin-left: 65vw;
  margin-top: 25vw;
}
</style>
