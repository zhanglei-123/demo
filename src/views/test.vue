<template>
  <div>
    <div style="width: 100%; height: 100%; background: #000000">
        <barrage 
          ref="barrage"
          class="barrage"
          :barrage-list="barrageList"
          :speed="speed"
          :loop="loop"
          :channels="channels"></barrage>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      barrageList: [],
      speed: 5,
      loop: true,
      channels: 4
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.barrageList = [
        {
          content: '测试数据测试数据测试数据测试数据1',
          color: 'white'
        },
        {
          content: '测试数据测试数据测试数据测试数据2',
          color: 'white'
        },
        {
          content: '测试数据测试数据测试数据测试数据3',
          color: 'white'
        },
        {
          content: '测试数据测试数据测试数据测试数据4',
          color: 'white'
        },
        {
          content: '测试数据测试数据测试数据测试数据5',
          color: 'white'
        },
        {
          content: '测试数据测试数据测试数据测试数据6',
          color: 'white'
        }
      ]
    }
  }
};
</script>

<style lang='scss' scoped>

</style>