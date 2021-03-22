<template>
  <div class="main-container">
    <div class="content-wrap">
      <div class="charge-wrap">
        <div class="charge-block" @click="monitorChargingStatus">
          <div class="block">
            <img src="../assets/images/charge.svg" alt="">
          </div>
          <div class="desc">充电状态监视</div>
        </div>
      </div>
      <div class="order-wrap">
        <div class="order-block" @click="queryOrder">
          <div class="mini-block">
            <img src="../assets/images/order.svg" alt="">
          </div>
          <div class="desc">订单查询</div>
        </div>
      </div>
      <div class="message-wrap">
        <div class="message-block">
          <div class="mini-block">
            <img src="../assets/images/message.svg" alt="">
          </div>
          <div class="desc">报文查看</div>
        </div>
      </div>
      <div class="document-wrap">
        <div class="document-block">
          <div class="block">
            <img src="../assets/images/doc.svg" alt="">
          </div>
          <div class="desc">开发资料</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {

    }
  },
  computed: {
    userName() {
      return Cookies.get('userName');
    }
  },
  mounted() {
  },
  methods: {
    // 报文查看
    queryMessage(){
      this.$router.push({ name: 'Message' });
    },
    // 充电桩状态监视
    monitorChargingStatus(){
      this.$router.push({ name: 'ChargeMonitoring' });
    },
    // 订单查询
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
  background-image: url('../assets/images/mainbg.png');
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-wrap {
  width: 810px;
  height: 610px;
  display: flex;
  flex-wrap: wrap;
}

.charge-wrap {
  width: 500px;
  height: 300px;
  background-image: url('../assets/images/chargebg.svg');
  margin-right: 10px;
  margin-bottom: 10px;
}

.charge-block {
  margin: 54px 264px 73px 74px;

  & > .desc {
    margin-top: 20px;
  }
}

.order-wrap {
  width: 300px;
  height: 300px;
  background-image: url('../assets/images/orderbg.svg');
  margin-bottom: 10px;
}

.order-block {
  margin: 70px 133px 73px 57px;

  & > .desc {
    margin-top: 38px;
  }
}

.message-wrap {
  width: 300px;
  height: 300px;
  background-image: url('../assets/images/messagebg.svg');
  margin-right: 10px;
}

.message-block {
  margin: 80px 91px 62px 74px;

  & > .desc {
    margin-top: 37px;
  }
}

.document-wrap {
  width: 500px;
  height: 300px;
  background-image: url('../assets/images/docbg.svg');
}

.document-block {
  margin: 65px 141px 62px 245px;

  & > .desc {
    margin-top: 21px;
  }
}

.block {
  width: 120px;
  height: 120px;
  background: #FFFFFF;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.mini-block {
  width: 90px;
  height: 90px;
  background: #FFFFFF;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.desc {
  font-family: PingFang-SC-Bold;
  font-size: 24px;
  color: #333333;
  letter-spacing: 3px;
  cursor: pointer;
}
</style>