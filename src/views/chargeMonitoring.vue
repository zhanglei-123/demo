<template>
  <div class="charge-container flex">
    <div class="title">特来电第三方接入辅助工具</div>
    <div class="charge-content flex">
      <div class="operation-bar">
        <div class="operation-item">
          <span>充电设备地址：</span>
          <el-input 
            class="custom-input" 
            v-model="address" 
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
        <el-button size="mini" class="custom-btn" @click="query">查询</el-button>
        <el-button size="mini" class="custom-btn" @click="refresh">刷新</el-button>
      </div>
      <div class="charge-wrapper flex">
        <div class="charge-info">
          <div>
            <div class="charge-title">
               <span class="status-color"></span>
               <span>空闲</span>
            </div>
            <div class="status-line">
              <div>
                <div>
                  <span>充电枪口号：</span>
                  <span> {{ | fmtEmptyText}} </span>
                </div>
              </div>
              <div>
                <div>
                 <span>充电枪类型：</span>
                 <span> {{ | fmtEmptyText}} </span>
                </div>
              </div>
            </div>
          </div>
          <div class="status-line">
            <div>
              <div>
                <span>当前SOC：</span>
                <span> {{ | fmtEmptyText }} </span>
              </div>
              <div>
                <span>VIN号：</span>
                <span>{{ | fmtEmptyText }}</span>
              </div>
            </div>
            <div>
              <div>
                <span>初始SOC：</span>
                <span> {{ | fmtEmptyText }} </span>
              </div>
              <div>
                <span>卡号：</span>
                <span> {{ | fmtEmptyText }} </span>
              </div>
            </div>
            <div>
              <div>
                <span>电量：</span>
                <span> {{ | fmtEmptyText }} </span>
              </div>
              <div>
                <span>辅助类型：</span>
                <span> {{ | fmtEmptyText }}</span>
              </div>
            </div>
            <div>
              <div>
                <span>电压：</span>
                <span> {{ | fmtEmptyText }} </span>
              </div>
              <div>
                <span>订单号：</span>
                <span> {{ | fmtEmptyText }} </span>
              </div>
            </div>
          </div>
          <div class="status-line">
            <div>
              <div>
                <span>开始充电时间：</span>
                <span> {{ | fmtEmptyText }} </span>
              </div>
              <div>
                <span>预计剩余时间：</span>
                <span> {{ | fmtEmptyText }} </span>
              </div>
            </div>
            <div>
              <div>
                <span>当前电表读数：</span>
                <span> {{ | fmtEmptyText }} </span>
              </div>
            </div>
          </div>
          <div class="status-line">
            <div>
              <div>
                <span>当前功率：</span>
                <span> {{ | fmtEmptyText }} </span>
              </div>
              <div>
                <span>当前电流：</span>
                <span> {{ | fmtEmptyText }} </span>
              </div>
            </div>
            <div>
              <div>
                <span>电池最高温度：</span>
                <span> {{ | fmtEmptyText }} </span>
              </div>
              <div>
                <span>电池最低温度：</span>
                <span> {{ | fmtEmptyText }} </span>
              </div>
            </div>
            <div>
              <div>
                <span>电池单体最高电压：</span>
                <span> {{ | fmtEmptyText }} </span>
              </div>
              <div>
                <span>电池单体最低电压：</span>
                <span> {{ | fmtEmptyText }} </span>
              </div>
            </div>
          </div>
          <div class="charge-btn" @click="handleBtnClick()">请插枪</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const btnNameMap = {
  '空闲': '请插枪',
  '已插抢': '开始充电',
  '充电中': '停止充电',
  '离网': '暂停服务',
  '故障': '检查故障',
  '已暂停': '恢复充电'
};

export default {
  data() {
    return {
      address: '',
      gun_number: '',
      status: '',
      devType: '0',
      statusOptions: [
        {
          label: '空闲',
          value: '0'
        },
        {
          label: '已插抢',
          value: '1'
        },
        {
          label: '暂停中',
          value: '2'
        },
        {
          label: '充电中',
          value: '3'
        },
        {
          label: '已充满',
          value: '4'
        },
        {
          label: '离网',
          value: '5'
        },
        {
          label: '故障',
          value: '6'
        }
      ],
      devTypeOptions: [
        {
          label: '直流',
          value: '0'
        },
        {
          label: '交流',
          value: '1'
        },
        {
          label: '三相交流',
          value: '2'
        }
      ]
    }
  },
  filters: {
    fmtStatus: function(val) {
      return ['空闲', '已插抢', '已暂停', '充电中', '离网', '故障'][val];
    },
    fmtEmptyText: function(val) {
      if(!val) {
        return '--';
      }
      return val;
    }
  },
  created() {},
  methods: {
    // 查询
    query() {},
    // 刷新
    refresh() {},
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
  flex: 1;
  flex-direction: column;
}

.charge-wrapper {
  flex: 1;
  padding: 10px 20px;
  box-sizing: border-box;
}

.charge-info {
  width: 300px;
  height: 460px;
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