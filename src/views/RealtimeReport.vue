<template>
  <div class="container">
    <div class="content"></div>
    <div class="clear-btn flex a-c j-c">
      <span>清</span>
      <span>屏</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      websock: null
    }
  },
  created() {
    this.initWebSocket();
  },
  destroyed() {
    this.websock.close();
  },
  methods: {
    initWebSocket() { // 初始化 websocket
      const wsurl = '';
      this.websock = new WebSocket(wsurl);
      console.log(this.websock);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websockonopen;
      this.websock.onerror = this.websockonerror;
      this.websock.onclose = this.websockclose;
    },
    websockonopen() { // 连接建立后执行send方法发送数据
      const actions = 'Hello'
      this.websocketsend(actions);
    },
    websockonerror() { // 连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) { // 数据接收
      const redata = e.data;
      console.log(redata);
    },
    websocketsend(Data){ //数据发送
      this.websock.send(Data);
    },
    websockclose(e){ // 关闭
      console.log(e)
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
}

.clear-btn {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  padding: 30px 15px;
  border: 2px solid #000;
  border-radius: 5px;
  cursor: pointer;
  flex-direction: column;
}
</style>