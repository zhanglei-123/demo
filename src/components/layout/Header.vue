<template>
  <div class="header">
    <div class="title" @click="linkTo">特来电第三方接入辅助工具</div>
    <div class="user-info"> 用户 {{ userName }} </div>
  </div>
</template>

<script>
export default {
  computed: {
    userName() {
      return Cookies.get('userName');
    }
  },
  methods: {
    linkTo() {
      this.$router.push({ name: 'Index' });
    }
  }
};
</script>

<style lang='scss' scoped>
.header {
  width: 100%;
  height: 70px;
  background-image: url('../../assets/images/header.png');
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 74px;
  box-sizing: border-box;
}

.title {
  font-family: PingFang-SC-Heavy;
  font-size: 30px;
  color: #FFFFFF;
  cursor: pointer;
}

.user-info {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: 0;
}
</style>