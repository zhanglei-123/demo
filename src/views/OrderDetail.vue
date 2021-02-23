<template>
  <div class="detail-container" v-loading="loading">
    <el-scrollbar style="height: 100%">
      <div class="top">
        <div class="flex a-c j-s">
          <div>
            <span>订单编号</span>
            <span> {{ info.devBillCode | fmtEmptyText }} </span>
          </div>
          <div>
            <span>开始充电时电表读数</span>
            <span> {{ info.beginMeterReading | fmtEmptyText }} </span>
          </div>
        </div>
        <div class="flex a-c j-s">
          <div>
            <span>充电方式</span>
            <span> {{ chargingTypeOptions[info.chargingType] | fmtEmptyText }} </span>
          </div>
          <div>
            <span>结束充电时电表读数</span>
            <span> {{ info.endMeterReading | fmtEmptyText }} </span>
          </div>
        </div>
        <div class="flex a-c j-s">
          <div>
            <span>充电电量</span>
            <span> {{ info.chargingPower | fmtEmptyText }} </span>
          </div>
          <div>
            <span>订单上传时间</span>
            <span> {{ info.uploadTime	| fmtEmptyText }} </span>
          </div>
        </div>
        <div class="flex a-c j-s">
          <div>
            <span>充电开始时间</span>
            <span> {{ info.beginTime | fmtEmptyText }} </span>
          </div>
          <div>
            <span>订单处理状态</span>
            <span> {{ billStatusOptions[info.billStatus] | fmtEmptyText }} </span>
          </div>
        </div>
        <div class="flex a-c j-s">
          <div>
            <span>充电结束时间</span>
            <span> {{ info.endTime | fmtEmptyText }} </span>
          </div>
          <div>
            <span>VIN号</span>
            <span> {{ info.vin | fmtEmptyText }} </span>
          </div>
        </div>
        <div class="flex a-c j-s">
          <div>
            <span>开始充电SOC</span>
            <span> {{ info.beginSoc + '%' || '--' }} </span>
          </div>
          <div>
            <span>充电卡卡号</span>
            <span> {{ info.cardCode | fmtEmptyText }} </span>
          </div>
        </div>
        <div class="flex a-c j-s">
          <div>
            <span>结束充电SOC</span>
            <span> {{ info.endSoc + '%' || '--' }} </span>
          </div>
          <div>
            <span>结束原因</span>
            <span> {{ info.stopReason | fmtEmptyText }} </span>
          </div>
        </div>
        <div class="flex a-c j-s">
          <div>
            <span>开始充电时枪数</span>
            <span> {{ info.beginGunNum | fmtEmptyText }} </span>
          </div>
        </div>
      </div>
      <el-table :class=" {'custom-table': isCollapse }" :data="powerList" style="width: 100%">
        <el-table-column prop="time" label="时段" align="center" width="600"></el-table-column>
        <el-table-column prop="power" label="电量" align="center" width="600"></el-table-column>
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <i :class="[ isCollapse ? 'el-icon-arrow-down': 'el-icon-arrow-right']" style="font-size: 20px; cursor: pointer;" @click="unfold"></i>
          </template>
        </el-table-column>
      </el-table>
      <div class="bottom">
        <div class="message">订单原始报文</div>
        <el-scrollbar style="border: 1px solid #ccc">
          <div class="bottom-info">
            <div v-for="item in originalMessage">
              <span> {{ item[0] }} : {{ item[1] }} </span>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import { queryOrderDetail } from '../service';
import { createDateList } from '../common';
import dayjs from 'dayjs';

export default {
  data() {
    return {
      info: {}, // 订单详情
      loading: false, 
      isCollapse: false, // 展开折叠
      chargingTypeOptions: [
        '未知',
        '后台APP启动',
        '在线刷卡启动',
        '在线VIN启动',
        '本地离线卡鉴权启动',
        '本地VIN鉴权启动',
        '本地离线卡无鉴权启动',
        '本地离线VIN无鉴权启动',
        '本地按钮、屏幕启动'
      ], // 充电方式
      billStatusOptions: [ '充电中', '订单完成', '订单启动失败', '订单处理失败' ], // 订单状态
      devTypeOptions: ['直流', '单相交流', '三相交流'], // 设备类型
      powerList: [], //电量
      originalMessage: [], // 报文
    }
  },
  filters: {
    fmtEmptyText: function(val) {
      if(val || val == 0) {
        return val;
      } else {
        return '--';
      }
    }
  },
  created() {
    this.queryOrderDetail();
  },
  methods: {
    // 查询订单详情
    async queryOrderDetail() {
      const params = {
        billCode: this.$route.params.devBillCode
      };
      this.loading = true;
      let data = await queryOrderDetail(params);
      if(data.code == 1) {
        this.info = data.data || {};
        this.originalMessage = this.processOriginMessage(data.data.originalMessage); // 报文
        this.powerSegment = data.data.powerSegment.substr(0, data.data.powerSegment.length - 1).split(','); // 数据
        let params = [];
        let date = this.processDateList();
        for(let key in this.powerSegment) {
          params.push({
            time: date[key],
            power: this.powerSegment[key]
          })
        }
        if(this.powerSegment.length <= 1) {
          this.powerList = [];
        } else {
          this.powerList = params;
        }
        this.loading = false;
      } else {
        this.$message.error('获取数据失败');
        this.loading = false;
      }
    },
    // 处理日期列表
    processDateList(){
      let rs = createDateList();
      const rsFirst = JSON.parse(JSON.stringify(rs[0])); // 第一项
      rs.map((item, i) => {
        if(i != (rs.length - 1)) {
          rs[i] = `${rs[i]}-${rs[i+1]}`;
        }
      })
      rs[rs.length - 1] = `${rs[rs.length - 1]}-${rsFirst}`;
      return rs;
    },
    // 处理报文格式
    processOriginMessage(v){
      let message = Object.entries(JSON.parse(v));
      message.map(item => {
        if (item[0] == '启动方式') {
          item[1] = this.chargingTypeOptions[item[1]];
        } else if (item[0] == '充电枪类型') {
          item[1] = this.devTypeOptions[item[1] - 1];
        } else if (item[0] == '充电开始时间' || item[0] == '充电结束时间') {
          item[1] = item[1] ? dayjs(item[1]).format('YYYY-MM-DD hh:mm:ss') : '--';
        } else {
          item[1] ? item[1] : '--';
        }
      })
      return message;
    },
    // 展开折叠
    unfold() {
      this.isCollapse = !this.isCollapse;
    }
  },
};
</script>

<style scoped lang="scss">
.detail-container {
  width: 100%;
  height: 100%;
  padding: 10px 300px;
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

.el-table {
  position: relative;
  
  /deep/.el-table__body-wrapper {
    display: none;
  }
}

.custom-table.el-table {
  /deep/.el-table__body-wrapper {
    display: block;
  }
}

</style>