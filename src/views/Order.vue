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
      <el-button type="primary" size="mini" class="custom-btn">查询</el-button>
    </div>
    <div class="order-content">
      <el-table
        :data="tableData"
        style="width: 100%"
        border>
        <el-table-column type="index" label="序号" align="center" width="100px"></el-table-column>
        <el-table-column label="订单编号" prop="" align="center">
          <template slot-scope="scope">
            <span @click="handleCellClick"></span>
          </template>
        </el-table-column>
        <el-table-column label="充电设备地址" prop="" align="center">
          <template slot-scope="scope">
            <span> {{ | fmtEmptyText}} </span>
          </template>
        </el-table-column>
        <el-table-column label="设备类型" prop="" align="center">
          <template slot-scope="scope">
            <span> {{ | fmtEmptyText }} </span>
          </template>
        </el-table-column>
        <el-table-column label="充电枪口号" prop="" align="center">
          <template slot-scope="scope">
            <span> {{ | fmtEmptyText }} </span>
          </template>
        </el-table-column>
        <el-table-column label="充电电量" prop="" align="center">
          <template slot-scope="scope">
            <span> {{ | fmtEmptyText }} </span>
          </template>
        </el-table-column>
        <el-table-column label="启动充电方式" prop="" align="center">
          <template slot-scope="scope">
            <span> {{ | fmtEmptyText }} </span>
          </template>
        </el-table-column>
        <el-table-column label="充电开始时间" prop="" align="center" :formatter="startTimeFormat"></el-table-column>
        <el-table-column label="充电结束时间" prop="" align="center" :formatter="endTimeFormat"></el-table-column>
        <el-table-column label="结束原因" prop="" align="center">
          <template slot-scope="scope">
            <span> {{ | fmtEmptyText }} </span>
          </template>
        </el-table-column>
        <el-table-column label="订单状态" prop="" align="center">
          <template slot-scope="scope">
            <span> {{ | fmtEmptyText }} </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { convertDate } from '../common';
import { queryOrderList } from '../service';
import dayjs from 'dayjs';

export default {
  data () {
    return {
      addr: '11010111194',
      no: '',
      begin_time: '',
      end_time: '',
      tableData: []
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
    this.begin_time = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss');
    this.end_time = dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss');
    this.queryOrderList();
  },
  methods: {
    startTimeFormat(row) {
      if(row.start_time) {
        return convertDate(row.start_time, 'yyyy-MM-dd hh:mm:ss');
      } else {
        return '--';
      }
    },
    endTimeFormat(row) {
      if(row.end_time) {
        return convertDate(row.end_time, 'yyyy-MM-dd hh:mm:ss');
      } else {
        return '--';
      }
    },
    // 查询订单列表
    async queryOrderList() {
      const params = {
        // beginTime: this.begin_time,
        // endTime: this.end_time,
        // billCode: this.no,
        terminalAddr: this.addr
      };
      let data = await queryOrderList(params);
      console.log(data);
    },
    handleCellClick() {
      this.$router.push({ name: 'OrderDetail' });
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
</style>