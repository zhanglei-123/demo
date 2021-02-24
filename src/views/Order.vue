<template>
  <div class="order-container" v-loading="tableLoading">
    <div class="operation-bar">
      <div class="operation-item">
        <span>充电设备地址：</span>
        <el-input 
          class="custom-input" 
          v-model="addr" 
          placeholder="请输入充电设备地址" 
          clearable
          size="mini">
        </el-input>
      </div>
      <div class="operation-item">
        <span>订单号：</span>
        <el-input
          class="custom-input"
          v-model="no"
          placeholder="请输入订单号"
          clearable
          size="mini">
        </el-input>
      </div>
      <div class="operation-item">
        <span>开始时间：</span>
        <el-date-picker
          v-model="begin_time"
          type="datetime"
          placeholder="选择开始时间"
          size="mini">
        </el-date-picker>
      </div>
      <div class="operation-item">
        <span>结束时间：</span>
        <el-date-picker
          v-model="end_time"
          type="datetime"
          placeholder="选择结束时间"
          size="mini">
        </el-date-picker>
      </div>
      <el-button type="primary" size="mini" class="custom-btn" @click="queryOrderList">查询</el-button>
    </div>
    <div class="order-content">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column type="index" label="序号" align="center" width="100px"></el-table-column>
        <el-table-column label="订单编号" prop="devBillCode" align="center">
          <template slot-scope="scope">
            <span @click="handleCellClick(scope.row)" class="order_code"> {{ scope.row.devBillCode }} </span>
          </template>
        </el-table-column>
        <el-table-column label="充电设备地址" prop="terminalAddr" align="center">
          <template slot-scope="scope">
            <span> {{ scope.row.terminalAddr || '--' }} </span>
          </template>
        </el-table-column>
        <el-table-column label="设备类型" prop="terminalType" align="center">
          <template slot-scope="scope">
            <span> {{ devTypeOptions[scope.row.terminalType - 1] || '--' }} </span>
          </template>
        </el-table-column>
        <el-table-column label="充电枪口号" prop="shortCode" align="center">
          <template slot-scope="scope">
            <span> {{ scope.row.shortCode + '号枪口' || '--' }} </span>
          </template>
        </el-table-column>
        <el-table-column label="充电电量" prop="chargingPower" align="center">
          <template slot-scope="scope">
            <span> {{ scope.row.chargingPower || '--'}} </span>
          </template>
        </el-table-column>
        <el-table-column label="启动充电方式" prop="chargingType" align="center">
          <template slot-scope="scope">
            <span> {{ startTypeOptions[scope.row.chargingType] || '--' }} </span>
          </template>
        </el-table-column>
        <el-table-column label="充电开始时间" prop="beginTime" align="center">
          <template slot-scope="scope">
            <span> {{ scope.row.beginTime || '--' }} </span>
          </template>
        </el-table-column>
        <el-table-column label="充电结束时间" prop="endTime" align="center">
          <template slot-scope="scope">
            <span> {{ scope.row.endTime || '--' }} </span>
          </template>
        </el-table-column>
        <el-table-column label="结束原因" prop="stopReason" align="center">
          <template slot-scope="scope">
            <span> {{ scope.row.stopReason || '--' }} </span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" prop="bill_type" align="center">
          <template slot-scope="scope">
            <span> {{ billStatusOptions[scope.row.billStatus] || '--' }} </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { queryOrderList } from '../service';

export default {
  data () {
    return {
      addr: '1101011119101', // 地址
      no: '', // 订单编号
      begin_time: '', // 开始时间
      end_time: '', // 结束时间
      tableData: [], // 数据
      tableLoading: false,
      devTypeOptions: ['直流', '单相交流', '三相交流'], // 设备类型
      startTypeOptions: [
        '未知', 
        '后台APP启动', 
        '在线刷卡启动', 
        '在线VIN启动', 
        '本地离线卡鉴权启动', 
        '本地VIN鉴权启动', 
        '本地离线卡无鉴权启动', 
        '本地离线VIN无鉴权启动', 
        '本地按钮、屏幕启动'
      ], // 启动方式
      billStatusOptions: [ '充电中', '订单完成', '订单启动失败', '订单处理失败'] // 订单状态
    }
  },
  created() {
    this.queryOrderList();
  },
  methods: {
    // 查询订单列表
    async queryOrderList() {
      let params = {
        beginTime: this.begin_time, // 开始时间
        endTime: this.end_time, // 结束时间
        billCode: this.no, // 订单号
        terminalAddr: this.addr // 充电终端地址
      };
      this.tableLoading = true;
      let data = await queryOrderList(params);
      if(data.code == 1) {
        this.tableData = data.data;
        this.tableLoading = false;
      } else {
        this.$message.error('数据获取失败');
        this.tableLoading = false;
      }
    },
    // 跳转到订单详情页
    handleCellClick(row) {
      this.$router.push({ name: 'OrderDetail', params: { devBillCode : row.devBillCode } });
    }
  }
};
</script>

<style scoped lang="scss">
.order-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.order-content {
  margin: 20px 0;
}

.order_code {
  text-decoration: underline;
  cursor: pointer;
}
</style>