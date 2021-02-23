<template>
  <div class="order-container">
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
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        v-loading="tableLoading">
        <el-table-column type="index" label="序号" align="center" width="100px"></el-table-column>
        <el-table-column label="订单编号" prop="bill_code" align="center">
          <template slot-scope="scope">
            <span @click="handleCellClick(scope.row)" class="order_code"> {{ scope.row.bill_code }} </span>
          </template>
        </el-table-column>
        <el-table-column label="充电设备地址" prop="terminal_addr" align="center">
          <template slot-scope="scope">
            <span> {{ scope.row.terminal_addr || '--' }} </span>
          </template>
        </el-table-column>
        <el-table-column label="设备类型" prop="terminal_type" align="center">
          <template slot-scope="scope">
            <span> {{ devTypeOptions[scope.row.terminal_type] || '--' }} </span>
          </template>
        </el-table-column>
        <el-table-column label="充电枪口号" prop="gun_code" align="center">
          <template slot-scope="scope">
            <span> {{ scope.row.gun_code || '--' }} </span>
          </template>
        </el-table-column>
        <el-table-column label="充电电量" prop="charging_power" align="center">
          <template slot-scope="scope">
            <span> {{ scope.row.charging_power || '--'}} </span>
          </template>
        </el-table-column>
        <el-table-column label="启动充电方式" prop="charging_type" align="center">
          <template slot-scope="scope">
            <span> {{ startTypeOptions[scope.row.charging_type] || '--' }} </span>
          </template>
        </el-table-column>
        <el-table-column label="充电开始时间" prop="begin_time" align="center" :formatter="startTimeFormat"></el-table-column>
        <el-table-column label="充电结束时间" prop="end_time" align="center" :formatter="endTimeFormat"></el-table-column>
        <el-table-column label="结束原因" prop="stop_reason" align="center">
          <template slot-scope="scope">
            <span> {{ scope.row.stop_reason || '--' }} </span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" prop="bill_type" align="center">
          <template slot-scope="scope">
            <span> {{ scope.row.bill_status || '--' }} </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { queryOrderList } from '../service';
import dayjs from 'dayjs';

export default {
  data () {
    return {
      addr: '98879855', // 地址
      no: '', // 订单编号
      begin_time: '',
      end_time: '',
      tableData: [],
      tableLoading: false,
      devTypeOptions: ['直流', '单相交流', '三相交流'],
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
      ],
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
    this.queryOrderList();
  },
  methods: {
    // 时间格式化
    startTimeFormat(row) {
      if(row.begin_time) {
        return dayjs(row.begin_time).format('YYYY-MM-DD hh:mm:ss');
      } else {
        return '--';
      }
    },
    endTimeFormat(row) {
      if(row.end_time) {
        return dayjs(row.end_time).format('YYYY-MM-DD hh:mm:ss');
      } else {
        return '--';
      }
    },
    // 查询订单列表
    async queryOrderList() {
      let params = {
        // beginTime: this.begin_time,
        // endTime: this.end_time,
        // billCode: this.no,
        terminalAddr: this.addr
      };
      if(this.begin_time) {
        params['beginTime'] = this.begin_time;
      }
      if(this.end_time) {
        params['endTime'] = this.end_time;
      }
      if(this.no) {
        params['billCode'] = this.no;
      }
      this.tableLoading = true;
      let data = await queryOrderList(params);
      if(data.code == 1) {
        this.tableData = data.data;
        this.tableLoading = false
      } else {
        this.$message.error('数据获取失败');
        this.tableLoading = false;
      }
    },
    // 跳转到详情页
    handleCellClick(row) {
      this.$router.push({ name: 'OrderDetail', params: { billCode : row.bill_code } });
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