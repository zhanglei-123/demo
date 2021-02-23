<template>
  <div class="charge-container flex">
    <div class="title">特来电第三方接入辅助工具</div>
    <div class="charge-content flex">
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
          <span>枪口号：</span>
          <el-select 
            class="custom-select" 
            v-model="gun_number" 
            placeholder="请选择" 
            clearable
            size="mini">
            <el-option 
              v-for="item in 5" 
              :key="item"
              :label="item" 
              :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="operation-item">
          <span>工作状态：</span>
          <el-select 
            class="custom-select" 
            v-model="status" 
            placeholder="请选择" 
            clearable
            size="mini">
            <el-option 
              v-for="item in statusOptions" 
              :key="item.value"
              :label="item.label" 
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="operation-item">
          <span>设备类型：</span>
          <el-select 
            class="custom-select" 
            v-model="devType" 
            placeholder="请选择" 
            clearable
            size="mini">
            <el-option 
              v-for="item in devTypeOptions" 
              :key="item.value"
              :label="item.label" 
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <el-button size="mini" class="custom-btn" @click="queryDevStatus">查询</el-button>
        <el-button size="mini" class="custom-btn" @click="refresh">刷新</el-button>
      </div>
      <div class="bottom-warp" v-loading="dataLoading">
        <el-scrollbar>
          <div class="charge-wrapper flex">
            <div class="charge-info" v-for="item in devList">
              <div>
                <div class="charge-title">
                  <span class="status-color"></span>
                  <span>{{ statusOptions[item.devStatus].label || '--' }}</span>
                </div>
                <div class="status-line">
                  <div>
                    <div>
                      <span>充电枪口号：</span>
                      <span> {{ item.gunCode || '--' }} </span>
                    </div>
                  </div>
                  <div>
                    <div>
                    <span>充电枪类型：</span>
                    <span> {{ devTypeOptions[item.devType - 1].label || '--' }} </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="status-line">
                <div>
                  <div>
                    <span>当前SOC：</span>
                    <span> {{ item.currentSoc + '%' || '--' }} </span>
                  </div>
                  <div>
                    <span>VIN号：</span>
                    <span>{{ item.vin || '--' }}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>初始SOC：</span>
                    <span> {{ item.beginSoc + '%' || '--' }} </span>
                  </div>
                  <div>
                    <span>卡号：</span>
                    <span> {{ item.cardCode || '--' }} </span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>电量：</span>
                    <span> {{ item.charged + 'kwh' || '--' }} </span>
                  </div>
                  <div>
                    <span>辅助类型：</span>
                    <span> {{ item.auxiliaryType | fmtAuxiliaryType }}</span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>电压：</span>
                    <span> {{ item.currentV + 'V' || '--'}} </span>
                  </div>
                  <div>
                    <span>订单号：</span>
                    <span> {{ item.billCode || '--'}} </span>
                  </div>
                </div>
              </div>
              <div class="status-line">
                <div>
                  <div>
                    <span>开始充电时间：</span>
                    <span> {{ item.beginTime | fmtDateTime }} </span>
                  </div>
                  <div>
                    <span>预计剩余时间：</span>
                    <span> {{ item.remainTime + 'min' || '--' }} </span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>当前电表读数：</span>
                    <span> {{ item.currentMeterKwh + 'kwh' || '--' }} </span>
                  </div>
                </div>
              </div>
              <div class="status-line">
                <div>
                  <div>
                    <span>当前功率：</span>
                    <span> {{ item.currentKw + 'kw' || '--' }} </span>
                  </div>
                  <div>
                    <span>当前电流：</span>
                    <span> {{ item.currentI + 'A' || '--' }} </span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>电池最高温度：</span>
                    <span> {{ item.tmax + '℃' || '--' }} </span>
                  </div>
                  <div>
                    <span>电池最低温度：</span>
                    <span> {{ item.tmin + '℃' || '--' }} </span>
                  </div>
                </div>
                <div>
                  <div>
                    <span>电池单体最高电压：</span>
                    <span> {{ item.vmax + 'V' || '--' }} </span>
                  </div>
                  <div>
                    <span>电池单体最低电压：</span>
                    <span> {{ item.vmin + 'V' || '--' }} </span>
                  </div>
                </div>
              </div>
              <div class="charge-btn" @click="handleBtnClick()"> {{ btnNameOptions[item.devStatus] }} </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import { queryDevStatus } from '../service';
import dayjs from 'dayjs';

export default {
  data() {
    return {
      addr: '11010111194', // 充电设备地址
      gun_number: '', // 枪口号
      status: '', // 工作状态
      devType: '1', // 设备类型
      statusOptions: [
        {
          label: '未知状态',
          value: '0'
        },
        {
          label: '空闲状态',
          value: '1'
        },
        {
          label: '已插抢',
          value: '2'
        },
        {
          label: '暂停充电',
          value: '3'
        },
        {
          label: '充电中',
          value: '4'
        },
        {
          label: '已充满',
          value: '5'
        },
        {
          label: '离网',
          value: '6'
        },
        {
          label: '故障',
          value: '7'
        }
      ], // 状态列表
      devTypeOptions: [
        {
          label: '直流',
          value: '1'
        },
        {
          label: '单相交流',
          value: '2'
        },
        {
          label: '三相交流',
          value: '3'
        }
      ], // 类型列表
      btnNameOptions: [ '请插枪', '开始充电', '停止充电', '暂停服务', '检查故障', '恢复充电'],
      dataLoading: false, 
      devList: [], // 数据
    }
  },
  filters: {
    fmtAuxiliaryType(val) {
      if(val || val == 0) {
        return ['12V', '24V'][val];
      } else {
        return '--';
      }
    },
    fmtDateTime(val) {
      if(!val) {
        return '--';
      } else {
        return dayjs(val).format('YYYY-MM-DD hh:mm:ss');
      }
    }
  },
  created() {
    this.queryDevStatus();
  },
  methods: {
    // 查询
    async queryDevStatus() {
      let params = {
        ctrlAddr: this.addr,
        devType: this.devType,
        gunCode: this.gun_number || "0",
        workStatus: this.status || "0"
      }
      this.dataLoading = true;
      let data = await queryDevStatus(params);
      if(data.code == 1) {
        this.devList = data.data;
        this.dataLoading = false;
      } else {
        this.$message.error('获取数据失败');
        this.dataLoading = false;
      }
    },
    // 刷新
    refresh() {
      this.queryDevStatus();
    },
    // 按钮点击事件
    handleBtnClick(btnName) {
      switch(btnName){
        case '':
          break;
        case '':
          break;
        case '':
          break;
        case '':
          break;
        case '':
          break;
        case '':
          break;
      }
    }
  },
};
</script>

<style scoped lang="scss">
.charge-container {
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.title {
  width: 100%;
  font-size: 20px;
  padding: 15px 0 15px 10px;
  box-sizing: border-box;
  font-weight: 100;
}

.charge-content {
  height: calc(100vh - 60px);
  flex-direction: column;
}

.bottom-warp {
  width: 100%;
  height: calc(100% - 60px);
  padding: 10px 20px;
  box-sizing: border-box;

  .el-scrollbar{
    height: 100%;
  }
}

.charge-wrapper {
  width: 100%;
  height: 100%;
  flex-wrap: wrap;
}

.charge-info {
  width: 350px;
  height: 460px;
  margin: 10px;
  border: 1px solid #ccc;

  & > div:not(.charge-btn) {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    box-sizing: border-box;
    font-size: 13px;

    .status-color {
      display: inline-block;
      width: 20px;
      height: 20px;
      background: green;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
}

.charge-title {
  font-size: 16px;
  margin: 10px 0;
  font-weight: bold;
}

.status-line {
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}

.charge-btn {
  text-align: center;
  border: 1px solid #000;
  padding: 7px 0;
  box-sizing: border-box;
  cursor: pointer;
}
</style>