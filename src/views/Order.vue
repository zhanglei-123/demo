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
          size="mini"
          :picker-options="pickerOptionsStart">
        </el-date-picker>
      </div>
      <div class="operation-item">
        <span>结束时间：</span>
        <el-date-picker
          v-model="end_time"
          type="datetime"
          placeholder="选择结束时间"
          size="mini"
          :picker-options="pickerOptionsEnd">
        </el-date-picker>
      </div>
      <el-button type="primary" size="mini" class="custom-btn" @click="queryOrderList">查询</el-button>
    </div>
    <el-scrollbar style="height: 100%;">
      <div class="order-content">
        <el-table :data="tableData" style="width: 100%" class="custom-table">
          <el-table-column type="index" label="序号" align="center" width="100px">
            <template slot-scope="scope">
              {{ (currentPage - 1) * pageSize + scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column label="订单编号" prop="devBillCode" align="center">
            <template slot-scope="scope">
              <span @click="handleCellClick(scope.row)" class="order_code"> {{ scope.row.devBillCode }} </span>
            </template>
          </el-table-column>
          <el-table-column label="充电设备地址" prop="terminalAddr" align="center">
            <template slot-scope="scope">
              <span> {{ scope.row.terminalAddr | fmtEmptyText }} </span>
            </template>
          </el-table-column>
          <el-table-column label="设备类型" prop="terminalType" align="center">
            <template slot-scope="scope">
              <span> {{ devTypeOptions[scope.row.terminalType - 1] | fmtEmptyText }} </span>
            </template>
          </el-table-column>
          <el-table-column label="充电枪口号" prop="shortCode" align="center">
            <template slot-scope="scope">
              <span> {{ scope.row.shortCode | fmtEmptyText }} </span>
            </template>
          </el-table-column>
          <el-table-column label="充电电量" prop="chargingPower" align="center">
            <template slot-scope="scope">
              <span> {{ scope.row.chargingPower | fmtEmptyText }} </span>
            </template>
          </el-table-column>
          <el-table-column label="启动充电方式" prop="chargingType" align="center">
            <template slot-scope="scope">
              <span> {{ startTypeOptions[scope.row.chargingType] | fmtEmptyText }} </span>
            </template>
          </el-table-column>
          <el-table-column label="充电开始时间" prop="beginTime" align="center">
            <template slot-scope="scope">
              <span> {{ scope.row.beginTime | fmtEmptyText }} </span>
            </template>
          </el-table-column>
          <el-table-column label="充电结束时间" prop="endTime" align="center">
            <template slot-scope="scope">
              <span> {{ scope.row.endTime | fmtEmptyText }} </span>
            </template>
          </el-table-column>
          <el-table-column label="结束原因" prop="stopReasonDesc" align="center">
            <template slot-scope="scope">
              <span> {{ scope.row.stopReasonDesc | fmtEmptyText }} </span>
            </template>
          </el-table-column>
          <el-table-column label="订单状态" prop="bill_type" align="center">
            <template slot-scope="scope">
              <span> {{ billStatusOptions[scope.row.billStatus - 1] | fmtEmptyText }} </span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="custom-pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size.sync="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, slot, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-scrollbar>

    <!-- 弹窗 订单详情 -->
    <el-dialog title="订单详情" :visible.sync="dialogVisible" class="custom-dialog">
      <el-scrollbar style="width: 100%; height: 100%;">
        <div class="detail-container" v-loading="loading">
          <div class="left">
            <div class="detail-block">
              <div class="detail-desc">
                <div class="error-check">
                  <tooltip :content="errorCheck.devBillCode"></tooltip>
                </div>
                <span>订单编号：</span>
              </div>
              <div class="detail-label">
                {{ detailInfo.devBillCode | fmtEmptyText }}
              </div>
            </div>
            <div class="detail-block">
              <div class="detail-desc">
                <div class="error-check">
                  <tooltip :content="errorCheck.chargingType"></tooltip>
                </div>
                <span>充电方式：</span>
              </div>
              <div class="detail-label">
                {{ startTypeOptions[detailInfo.chargingType] | fmtEmptyText }}
              </div>
            </div>
            <div class="detail-block">
              <div class="detail-desc">
                <div class="error-check">
                  <tooltip :content="errorCheck.chargingPower"></tooltip>
                </div>
                <span>充电电量：</span>
              </div>
              <div class="detail-label">
                {{ detailInfo.chargingPower | fmtEmptyText }}
              </div>
            </div>
            <div class="detail-block">
              <div class="detail-desc">
                <div class="error-check">
                  <tooltip :content="errorCheck.beginTime"></tooltip>
                </div>
                <span>充电开始时间：</span>
              </div>
              <div class="detail-label">
                {{ detailInfo.beginTime | fmtEmptyText }}
              </div>
            </div>
            <div class="detail-block">
              <div class="detail-desc">
                <div class="error-check">
                  <tooltip :content="errorCheck.endTime"></tooltip>
                </div>
                <span>充电结束时间：</span>
              </div>
              <div class="detail-label">
                {{ detailInfo.endTime | fmtEmptyText }}
              </div>
            </div>
            <div class="detail-block">
              <div class="detail-desc">
                <div class="error-check">
                  <tooltip :content="errorCheck.beginSoc"></tooltip>
                </div>
                <span>开始充电时SOC：</span>
              </div>
              <div class="detail-label">
                {{ detailInfo.beginSoc | fmtEmptyText }}
              </div>
            </div>
            <div class="detail-block">
              <div class="detail-desc">
                <div class="error-check">
                  <tooltip :content="errorCheck.endSoc"></tooltip>
                </div>
                <span>结束充电时SOC：</span>
              </div>
              <div class="detail-label">
                {{ detailInfo.endSoc | fmtEmptyText }}
              </div>
            </div>
            <div class="detail-block">
              <div class="detail-desc">
                <div class="error-check">
                  <tooltip :content="errorCheck.beginGunNum"></tooltip>
                </div>
                <span>开始充电时枪数：</span>
              </div>
              <div class="detail-label">
                {{ detailInfo.beginGunNum | fmtEmptyText }}
              </div>
            </div>
            <div class="detail-block">
              <div class="detail-desc">
                <div class="error-check">
                  <tooltip :content="errorCheck.beginMeterReading"></tooltip>
                </div>
                <span>开始充电时电表读数：</span>
              </div>
              <div class="detail-label">
                {{ detailInfo.beginMeterReading | fmtEmptyText }}
              </div>
            </div>
            <div class="detail-block">
              <div class="detail-desc">
                <div class="error-check">
                  <tooltip :content="errorCheck.endMeterReading"></tooltip>
                </div>
                <span>充电结束时电表读数：</span>
              </div>
              <div class="detail-label">
                {{ detailInfo.endMeterReading | fmtEmptyText }}
              </div>
            </div>
            <div class="detail-block">
              <div class="detail-desc">
                <div class="error-check">
                  <tooltip :content="errorCheck.uploadTime"></tooltip>
                </div>
                <span>订单上传时间：</span>
              </div>
              <div class="detail-label">
                {{ detailInfo.uploadTime | fmtEmptyText }}
              </div>
            </div>
            <div class="detail-block">
              <div class="detail-desc">
                <div class="error-check">
                  <tooltip :content="errorCheck.billStatus"></tooltip>
                </div>
                <span>订单处理状态：</span>
              </div>
              <div class="detail-label">
                {{ billStatusOptions[detailInfo.billStatus - 1] | fmtEmptyText }}
              </div>
            </div>
            <div class="detail-block">
              <div class="detail-desc">
                <div class="error-check">
                  <tooltip :content="errorCheck.vin"></tooltip>
                </div>
                <span>VIN号：</span>
              </div>
              <div class="detail-label">
                {{ detailInfo.vin | fmtEmptyText }}
              </div>
            </div>
            <div class="detail-block">
              <div class="detail-desc">
                <div class="error-check">
                  <tooltip :content="errorCheck.cardCode"></tooltip>
                </div>
                <span>充电卡卡号：</span>
              </div>
              <div class="detail-label">
                {{ detailInfo.cardCode | fmtEmptyText }}
              </div>
            </div>
            <div class="detail-block">
              <div class="detail-desc">
                <div class="error-check">
                  <tooltip :content="errorCheck.stopReason"></tooltip>
                </div>
                <span>结束原因：</span>
              </div>
              <div class="detail-label">
                {{ detailInfo.stopReasonDesc | fmtEmptyText }}
              </div>
            </div>
          </div>
          <div class="right">
            <div class="top-right">
              <div class="right-desc">时段充电量</div>
              <el-table :data="powerList" class="dialog-table" height="200">
                <el-table-column prop="time" label="时段" align="center"></el-table-column>
                <el-table-column prop="power" label="电量/kwh" align="center"></el-table-column>
              </el-table>
            </div>
            <div class="bottom-right">
              <div class="right-desc">原始报文</div>
              <el-scrollbar style="background: #F8F8F8;height: calc(100% - 30px);">
                <div class="bottom-wrapper">
                  <div v-for="item in originalMessage">
                    <span> {{ item[0] }} : {{ item[1] }} </span>
                  </div>
                </div>
              </el-scrollbar>
            </div>
          </div>
        </div>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script>
import tooltip from '../components/tooltip';
import { queryOrderList, queryOrderDetail } from '../service';
import { createDateList } from '../common';
import dayjs from 'dayjs';

export default {
  components: {
    tooltip
  },
  data () {
    return {
      addr: '', // 地址
      no: '', // 订单编号
      begin_time: '', // 开始时间
      end_time: '', // 结束时间
      tableData: [], // 数据
      tableLoading: false,
      devTypeOptions: ['直流', '单相交流', '三相交流'], // 设备类型
      startTypeOptions: [
        '缺省值', 
        '后台APP启动', 
        '在线刷卡启动', 
        '在线VIN启动', 
        '本地离线卡鉴权启动', 
        '本地离线VIN鉴权启动', 
        '本地离线卡无鉴权启动', 
        '本地离线VIN无鉴权启动', 
        '本地按钮、屏幕等启动'
      ], // 启动方式
      billStatusOptions: ['充电中', '订单完成', '订单启动失败', '订单处理失败'], // 订单状态
      dialogVisible: false, // 弹窗可见
      loading: false,
      detailInfo: {}, // 订单详情
      billCode: '', // 订单编号(参数)
      powerList: [], // 电量数据
      originalMessage: [], // 报文
      errorCheck: {}, // 错误校验
      currentPage: 1, // 当前页
      pageSize: 10,
      total: 0, 
      pickerOptionsStart: {
        disabledDate: time => {
          if(this.end_time) {
            return time.getTime() > new Date(this.end_time).getTime();
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          if(this.begin_time) {
            return time.getTime() < new Date(this.begin_time).getTime();
          }
        }
      }
    }
  },
  filters: {
    fmtEmptyText(val) {
      if(!val) {
        return '--';
      } else {
        return val;
      }
    }
  },
  created() {
    this.queryOrderList();
  },
  methods: {
    // 查询订单列表
    async queryOrderList() {
      let params = {
        billCode: this.no, // 订单号
        terminalAddr: this.addr, // 充电终端地址
        pageCount: this.currentPage, // 当前页
        pageSize: this.pageSize,
        beginTime: this.begin_time,
        endTime: this.end_time
      };
      if(this.begin_time) {
        params.beginTime = dayjs(this.begin_time).format('YYYY-MM-DD HH:mm:ss');
      }
      if(this.end_time) {
        params.endTime = dayjs(this.end_time).format('YYYY-MM-DD HH:mm:ss');
      }
      if(this.begin_time && this.end_time) {
        if(this.begin_time >= this.end_time) {
          this.$message.warning('结束时间不能小于开始时间');
          return;
        }
      }
      this.tableLoading = true;
      if(this.addr) {
        let resp = await queryOrderList(params);
        if(resp.code == 1) {
          this.tableData = resp.data.data;
          this.total = resp.data.totalCount;
          this.tableLoading = false;
        } else {
          this.$message.error('数据获取失败');
          this.tableLoading = false;
        }
      } else {
        this.$message.warning('请输入充电设备地址');
        this.tableLoading = false;
      }
    },
    handleCellClick(row) {
      this.dialogVisible = true;
      this.billCode = row.devBillCode;
      this.queryOrderDetail();
    },
    // 查询订单详情
    async queryOrderDetail() {
      const params = {
        billCode: this.billCode // 订单编号
      };
      this.loading = true;
      let data = await queryOrderDetail(params);
      if(data.code == 1) {
        this.detailInfo = data.data || {}; 
        this.errorCheck = JSON.parse(data.data.errorCheck); // 错误校验
        this.originalMessage = Object.entries(JSON.parse(data.data.originalMessage)); // 报文
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
    handleSizeChange(val) {
      this.queryOrderList();
    },
    handleCurrentChange() {
      this.queryOrderList();
    }
  }
};
</script>

<style scoped lang="scss">
.order-container {
  width: 100%;
  height: 100%;
}

.order-content {
  padding: 0 70px;
  box-sizing: border-box;
}

.order_code {
  text-decoration: underline;
  cursor: pointer;
}

.detail-container {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;

  .left {
    width: 400px;
    height: 100%;
  }

  .right {
    flex: 1;
    height: 100%;
    padding-left: 50px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }
}

.detail-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0;

  .detail-desc {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #666666;
    display: flex;
  }

  .detail-label {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #333333;
  }
}

.right-desc {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #666666;
  margin: 15px 0;
}

.top-right {
  height: 45%;
}

.bottom-right {
  width: 100%;
  height: 50%;
}

.bottom-wrapper {
  width: 100%;
  height: calc(100% - 40px);
  padding: 10px;
  box-sizing: border-box;
}

.error-check {
  width: 46px;
  height: 21px;
}
</style>