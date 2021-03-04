<template>
  <div class="main-content">
    <el-scrollbar class="content-wrapper">
      <router-view></router-view>
    </el-scrollbar>
  </div>
</template>

<script>
export default {
};
</script>

<style lang='scss' scoped>
.main-content {
  width: 100%;
  height: calc(100% - 70px);
  background: #F8F8F8;
}

.content-wrapper.el-scrollbar{
  height: 100%;

  .el-scrollbar__view {
    height: 100%;
  }
}

</style>