<template>
  <div>
    <el-tooltip 
      class="item"
      effect="dark"
      :content="content"
      placement="bottom">
      <i class="el-icon-warning"></i>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    content: String
  }
};
</script>

<style lang='scss' scoped>

</style>