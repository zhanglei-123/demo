<template>
  <div class="main-container flex a-c">
    <div class="title">
      <span>特来电第三方接入辅助工具</span>
    </div>
    <div class="content flex">
      <div class="item flex j-c a-c" @click="monitorChargingStatus">充电桩状态监视</div>
      <div class="item flex j-c a-c" @click="queryOrder">订单查询</div>
      <div class="item flex j-c a-c" @click="queryMessage">报文查看</div>
      <div class="item flex j-c a-c">开发资料</div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {

    }
  },
  methods: {
    queryMessage(){
      this.$router.push({ name: 'Message' });
    },
    monitorChargingStatus(){
      this.$router.push({ name: 'ChargeMonitoring' });
    },
    queryOrder(){
      this.$router.push({ name: 'Order' });
    }
  }
};
</script>

<style scoped lang="scss">
.main-container {
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.title {
  width: 100%;
  font-size: 20px;
  padding: 15px 0 15px 10px;
  box-sizing: border-box;
  font-weight: 100;
}

.content {
  width: 80%;
  height: calc(100% - 100px);
  padding: 80px 40px;
  box-sizing: border-box;
}

.item {
  width: 200px;
  height: 90px;
  background: #798093;
  color: #fff;
  margin: 20px 30px;
  cursor: pointer;

  &:focus, &:hover {
    background: #979dad;
  }
}
</style>