<template>
  <div class="progress">
    <div style="width:calc(100% - 60px)">
      <div class="progress-outer">
        <div class="progress-bar" :style="barStyle"></div>
      </div>
    </div>
    <div class="value-label" :style="textStyle">{{ value }}%</div>
  </div>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: '#ebeef5',
    },
    max: {
      type: Number,
      default: 100,
    },
    value: {
      type: Number,
      default: 50,
    },
  },
  computed: {
    barStyle() {
      const style = {};
      if (this.max === 0) {
        style.width = '0%';
      }
      const percent = (this.value / this.max) * 100;
      if(percent <= 0) {
        style.width = '0%';
      }
      if(percent >= 100) {
        style.width = '100%';
      }
      style.width = percent + '%';
      style.backgroundColor = this.color;
      return style;
    },
    textStyle() {
      const style = {};
      style.color = this.color;
      return style;
    }
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.progress {
  display: flex;
  align-items: center;
}

.progress > div {
  display: inline-block;
}

.progress-outer {
  height: 6px;
  position: relative;
  background: #ebeef5;
  overflow: hidden;
  vertical-align: middle;
}

.progress-bar {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  transition: width 0.6s ease;
}

.value-label {
  width: 45px;
  margin-left: 5px;
  font-size: 14px;
  letter-spacing: 0;
}
</style>
