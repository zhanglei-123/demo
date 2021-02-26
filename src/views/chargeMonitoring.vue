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
        <el-button 
          size="mini" 
          class="custom-btn" 
          @click="queryDevStatus">
          查询
        </el-button>
        <el-button 
          size="mini" 
          class="custom-btn" 
          @click="refresh">
          刷新
        </el-button>
      </div>
      <div class="bottom-warp" v-loading="dataLoading">
        <el-scrollbar>
          <div class="charge-wrapper flex">
            <el-card 
              class="charge-info" shadow="always"
              v-for="item in devList" :key="item.gunCode"
              v-loading="startLoading[item.gunCode]"
              :element-loading-text="loadingText"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0,0,0,0.8)">
              <div slot="header">
                <span class="status-color"></span>
                <span class="charge-title"> {{ statusOptions[item.devStatus].label || '--' }} </span>
              </div>
              <div class="body-content">
                <div class="item-block">
                  <div class="item-miniblock">
                    <span> 充电枪口号：</span>
                    <span> {{ item.gunCode || '--' }} </span>
                  </div>
                </div>
                <div class="item-block divider-line">
                  <div class="item-miniblock">
                    <span> 充电枪类型：</span>
                    <span> {{ devTypeOptions[item.devType - 1].label || '--' }} </span>
                  </div>
                </div>
                <div class="item-block">
                  <div class="item-miniblock">
                    <span> 当前SOC：</span>
                    <span> {{ item.currentSoc + '%' || '--' }} </span>
                  </div>
                  <div class="item-miniblock">
                    <span> VIN号：</span>
                    <span> {{ item.vin || '--' }} </span>
                  </div>
                </div>
                <div class="item-block">
                  <div class="item-miniblock">
                    <span> 初始SOC：</span>
                    <span> {{ item.beginSoc || '--' }} </span>
                  </div>
                  <div class="item-miniblock">
                    <span> 卡号：</span>
                    <span> {{ item.cardCode || '--'}} </span>
                  </div>
                </div>
                <div class="item-block">
                  <div class="item-miniblock">
                    <span> 电量：</span>
                    <span> {{ item.charged + 'kwh' || '--' }}</span>
                  </div>
                  <div class="item-miniblock">
                    <span> 辅助类型：</span>
                    <span> {{ item.auxiliaryType | fmtAuxiliaryType}} </span>
                  </div>
                </div>
                <div class="item-block divider-line">
                  <div class="item-miniblock">
                    <span> 电压：</span>
                    <span> {{ item.currentV + 'V' || '--' }} </span>
                  </div>
                  <div class="item-miniblock">
                    <span> 订单号：</span>
                    <span> {{ item.billCode || '--' }} </span>
                  </div>
                </div>
                <div class="item-block">
                  <div class="item-miniblock">
                    <span> 开始充电时间：</span>
                    <span> {{ item.beginTime | fmtDateTime }} </span>
                  </div>
                  <div class="item-miniblock">
                    <span> 预计剩余时间：</span>
                    <span> {{ item.remainTime + 'min' || '--' }} </span>
                  </div>
                </div>
                <div class="item-block divider-line">
                  <div class="item-miniblock">
                    <span> 当前电表读数：</span>
                    <span> {{ item.currentMeterKwh + 'kwh' || '--' }} </span>
                  </div>
                </div>
                <div class="item-block">
                  <div class="item-miniblock">
                    <span> 当前功率：</span>
                    <span> {{ item.currentKw + 'kw' || '--' }} </span>
                  </div>
                  <div class="item-miniblock">
                    <span> 当前电流：</span>
                    <span> {{ item.currentI + 'A' || '--' }} </span>
                  </div>
                </div>
                <div class="item-block">
                  <div class="item-miniblock">
                    <span> 电池最高温度：</span>
                    <span> {{ item.tmax + '℃' || '--' }} </span>
                  </div>
                  <div class="item-miniblock">
                    <span> 电池最低温度：</span>
                    <span> {{ item.tmin + '℃' || '--' }} </span>
                  </div>
                </div>
                <div class="item-block">
                  <div class="item-miniblock">
                    <span> 电池单体最高电压：</span>
                    <span> {{ item.vmax + 'V' || '--' }} </span>
                  </div>
                  <div class="item-miniblock">
                    <span> 电池单体最低电压：</span>
                    <span> {{ item.vmin + 'V' || '--'}} </span>
                  </div>
                </div>
                <div class="charge-btn">
                  <el-button 
                    type="text"
                    @click="handleBtnClick(item, btnNameOptions[item.devStatus])"
                    :disabled="![2,4].includes(item.devStatus)">
                    {{ btnNameOptions[item.devStatus] }}
                  </el-button>
                </div>
              </div>
            </el-card>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import { queryDevStatus, ctrlCharge } from '../service';
import { confirm } from '../common';
import dayjs from 'dayjs';

export default {
  data() {
    return {
      addr: '11010111191', // 充电设备地址
      gun_number: '', // 枪口号
      status: '', // 工作状态
      devType: '1', // 设备类型
      dataLoading: false, 
      devList: [], // 数据
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
      btnNameOptions: ['未知状态', '请插枪', '开始充电', '恢复充电', '停止充电', '请拔枪', '暂停服务', '检查故障'],
      operationTypeOptions: [
        {
          label: '开始充电',
          value: 1
        },
        {
          label: '停止充电',
          value: 2
        }
      ],
      startLoading: {},
      loadingText: ''
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
    // 刷新
    refresh() {
      this.queryDevStatus();
    },
    // 查询设备状态
    async queryDevStatus() {
      let params = {
        ctrlAddr: this.addr, // 充电设备地址
        devType: parseInt(this.devType), // 充电设备类型
        gunCode: parseInt(this.gun_number) || 0, // 充电枪口号
        workStatus: parseInt(this.status) || 0 // 工作状态
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
    // 充电控制
    ctrlCharge(item, btnName) {
      const rs = this.operationTypeOptions.find(v => v.label == btnName);
      let params = {
        ctrlAddr: item.ctrlAddr, // 充电设备地址
        devType: item.devType, // 充电设备类型
        gunCode: item.gunCode, // 充电枪口号
        billCode: item.billCode, // 订单号 
        // chargeType: item.startType, // 启动充电类型
        operationType: '', // 操作类型
      }
      if(rs) {
        params.operationType = rs.value; 
        this.loadingText = ['正在开启...', '正在结束...'][rs.value - 1];
      }
      confirm(`确认${btnName}吗？`).then(() => {
        this.$set(this.startLoading, item.gunCode, true);
        if(this.timer) {
          clearTimeout(this.timer);
        } else {
          this.timer = setTimeout(async () => {
            let data = await ctrlCharge(params);
            this.$set(this.startLoading, item.gunCode, false);
            if(data.code == 1) {
              this.$message.success('操作成功');
              this.queryDevStatus();
            } else {
              this.$message.error('操作失败')
            }
          }, 5000)
        }
      }).catch(() => {
        this.$message.info(`已取消该操作`);
      })
    },
    // 按钮点击事件
    handleBtnClick(item, btnName) {
      this.ctrlCharge(item, btnName);
    }
  },
  destroyed() {
    clearTimeout(this.timer);
  }
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
  width: 360px;
  margin: 10px;
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

.charge-title {
  font-size: 18px;
  margin: 10px 0;
  font-weight: bold;
}

.charge-btn {
  margin-top: 10px;
  width: 100%;
  text-align: center;
  border: 1px solid #000;
  color: #000;
  box-sizing: border-box;
}

.item-block {
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.item-block.divider-line {
  border-bottom: 1px solid #cccccc;
  padding-bottom: 10px;
  box-sizing: border-box;
}
</style>