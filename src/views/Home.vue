<template>
  <div class="layout">
    <layout-header></layout-header>
    <layout-content></layout-content>
  </div>
</template>

<script>
import Header from '../components/layout/Header.vue';
import Content from '../components/layout/Content.vue';

export default {
  components: {
    LayoutHeader: Header,
    LayoutContent: Content
  }
};
</script>

<style lang='scss' scoped>
.layout {
  width: 100%;
  height: 100%;
}
</style>