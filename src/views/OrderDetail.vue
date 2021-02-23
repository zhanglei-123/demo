<template>
  <div class="detail-container" v-loading="loading">
    <div class="top">
      <div class="flex a-c j-s">
        <div>
          <span>订单编号</span>
          <span> {{ info.billCode | fmtEmptyText}} </span>
        </div>
        <div>
          <span>开始充电时电表读数</span>
          <span> {{ info.beginMeterReading | fmtEmptyText}} </span>
        </div>
      </div>
      <div class="flex a-c j-s">
        <div>
          <span>充电方式</span>
          <span> {{ info.chargingType | fmtEmptyText}} </span>
        </div>
        <div>
          <span>结束充电时电表读数</span>
          <span> {{ info.endMeterReading | fmtEmptyText}} </span>
        </div>
      </div>
      <div class="flex a-c j-s">
        <div>
          <span>充电电量</span>
          <span> {{ info.chargingPower | fmtEmptyText}} </span>
        </div>
        <div>
          <span>订单上传时间</span>
          <span> {{ info.uploadTime	| fmtEmptyText}} </span>
        </div>
      </div>
      <div class="flex a-c j-s">
        <div>
          <span>充电开始时间</span>
          <span> {{ info.beginTime | fmtEmptyText}} </span>
        </div>
        <div>
          <span>订单处理状态</span>
          <span> {{ info.billStatus | fmtEmptyText}} </span>
        </div>
      </div>
      <div class="flex a-c j-s">
        <div>
          <span>充电结束时间</span>
          <span> {{ info.endTime | fmtEmptyText}} </span>
        </div>
        <div>
          <span>VIN号</span>
          <span> {{ info.vin | fmtEmptyText}} </span>
        </div>
      </div>
      <div class="flex a-c j-s">
        <div>
          <span>开始充电SOC</span>
          <span> {{ info.beginSoc | fmtEmptyText}} </span>
        </div>
        <div>
          <span>充电卡卡号</span>
          <span> {{ info.cardCode | fmtEmptyText}} </span>
        </div>
      </div>
      <div class="flex a-c j-s">
        <div>
          <span>结束充电SOC</span>
          <span> {{ info.endSoc | fmtEmptyText}} </span>
        </div>
        <div>
          <span>结束原因</span>
          <span> {{ info.stopReason | fmtEmptyText}} </span>
        </div>
      </div>
      <div class="flex a-c j-s">
        <div>
          <span>开始充电时枪数</span>
          <span> {{ info.beginGunNum | fmtEmptyText}} </span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="message">订单原始报文</div>
      <el-scrollbar style="border: 1px solid #ccc">
        <div class="bottom-info">
          {{ info.originalMessage }}
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { queryOrderDetail } from '../service';

export default {
  data() {
    return {
      info: {}, // 订单详情
      loading: false,
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
  created() {
    this.queryOrderDetail();
  },
  methods: {
    async queryOrderDetail() {
      const params = {
        billCode: this.$route.params.billCode
      };
      this.loading = true;
      let data = await queryOrderDetail(params);
      if(data.code == 1) {
        this.info = data.data || {};
        this.loading = false;
      } else {
        this.$message.error('获取数据失败');
        this.loading = false;
      }
    }
  },
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