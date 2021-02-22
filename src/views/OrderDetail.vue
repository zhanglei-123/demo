<template>
  <div class="detail-container">
    <div class="top">
      <div class="flex a-c j-s">
        <div>
          <span>订单编号</span>
          <span> {{  | fmtEmptyText}} </span>
        </div>
        <div>
          <span>开始充电时电表读数</span>
          <span> {{ | fmtEmptyText}} </span>
        </div>
      </div>
      <div class="flex a-c j-s">
        <div>
          <span>充电方式</span>
          <span> {{ | fmtEmptyText}} </span>
        </div>
        <div>
          <span>结束充电时电表读数</span>
          <span> {{ | fmtEmptyText}} </span>
        </div>
      </div>
      <div class="flex a-c j-s">
        <div>
          <span>充电电量</span>
          <span> {{ | fmtEmptyText}} </span>
        </div>
        <div>
          <span>订单上传时间</span>
          <span> {{ | fmtEmptyText}} </span>
        </div>
      </div>
      <div class="flex a-c j-s">
        <div>
          <span>充电开始时间</span>
          <span> {{ | fmtEmptyText}} </span>
        </div>
        <div>
          <span>订单处理状态</span>
          <span> {{ | fmtEmptyText}} </span>
        </div>
      </div>
      <div class="flex a-c j-s">
        <div>
          <span>充电结束时间</span>
          <span> {{ | fmtEmptyText}} </span>
        </div>
        <div>
          <span>VIN号</span>
          <span> {{ | fmtEmptyText}} </span>
        </div>
      </div>
      <div class="flex a-c j-s">
        <div>
          <span>开始充电SOC</span>
          <span> {{ | fmtEmptyText}} </span>
        </div>
        <div>
          <span>充电卡卡号</span>
          <span> {{ | fmtEmptyText}} </span>
        </div>
      </div>
      <div class="flex a-c j-s">
        <div>
          <span>结束充电SOC</span>
          <span> {{ | fmtEmptyText}} </span>
        </div>
        <div>
          <span>结束原因</span>
          <span> {{ | fmtEmptyText}} </span>
        </div>
      </div>
      <div class="flex a-c j-s">
        <div>
          <span>开始充电时枪数</span>
          <span> {{ | fmtEmptyText}} </span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="message">订单原始报文</div>
      <el-scrollbar style="border: 1px solid #ccc">
        <div class="bottom-info">
          <div>
            <span>CanIndex: </span>，
            <span>订单详情：订单号：</span>，
            <span>订单状态：</span>
          </div>
          <div>
            <span>订单生成的订单流水号：</span>
          </div>
          <div>
            <span>订单类型：</span>，
            <span>订单状态：</span>
          </div>
          <div>
            <span>结束原因：</span>，
            <span>原因码：</span>
          </div>
          <div>
            <span>开始时间：</span>
          </div>
          <div>
            <span>结束时间：</span>
          </div>
          <div>
            <span>充电开始时电表度数：</span>
          </div>
          <div>
            <span>充电结束时电表度数：</span>
          </div>
          <div>
            <span>开始充电时SOC：</span>
          </div>
          <div>
            <span>结束充电时SOC：</span>
          </div>
          <div>
            <span>充电类型：</span>
          </div>
          <div>
            <span>启动方式：</span>
          </div>
          <div>
            <span>订单开启时的枪数：</span>
          </div>
          <div>
            <span>充电冻结电量时间：</span>，
            <span>充电冻结电量：</span>
          </div>
          <div>
            <span>发送时间：</span>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  filters: {
    fmtEmptyText: function(val) {
      if(!val) {
        return '--';
      }
      return val;
    }
  },
  created() {},
  methods: {},
};
</script>

<style scoped lang="scss">
.detail-container {
  width: 100%;
  height: 100%;
  padding: 30px 300px;
  box-sizing: border-box;

  .top {
    & > div {
      margin: 20px 0;

      & > div {
        span {
          width: 180px;
          display: inline-block;
          margin: 0 20px;
          text-align: center;
        }

        span:nth-of-type(2) {
          width: 300px;
          display: inline-block;
          border: 1px solid #ccc;
        }
      }
    }
  }

  .bottom {
    margin-top: 40px;
    display: flex;
  }
}

.message {
  width: 180px;
  text-align: center;
}

.bottom-info {
  width: 800px;
  height: 500px;
  padding: 10px;
  box-sizing: border-box;

  & > div {
    margin: 10px 0;
  }
}
</style>