<template>
  <div
    class="charge-container flex"
    v-loading="dataLoading"
  >
    <div class="operation-bar">
      <div class="operaion-item margin">
        <span>充电设备地址：</span>
        <el-input
          class="custom-input"
          v-model="addr"
          placeholder="请输入充电设备地址"
          clearable
          size="mini"
        >
        </el-input>
      </div>
      <div class="operation-item margin">
        <span>枪口号：</span>
        <el-select
          class="custom-select"
          v-model="gun_number"
          placeholder="请选择"
          clearable
          size="mini"
        >
          <el-option
            v-for="item in 5"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
      <div class="operation-item margin">
        <span>工作状态：</span>
        <el-select
          class="custom-select"
          v-model="status"
          placeholder="请选择"
          clearable
          size="mini"
        >
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="operation-item margin">
        <span>设备类型：</span>
        <el-select
          class="custom-select"
          v-model="devType"
          placeholder="请选择"
          size="mini"
        >
          <el-option
            v-for="item in devTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <el-button
        size="mini"
        class="custom-btn margin"
        @click="query"
      >
        查询
      </el-button>
    </div>
    <el-scrollbar style="height: 100%;">
      <div class="main-wrapper">
        <div
          class="main-block"
          v-for="item in devList"
          :key="item.gunCode"
        >
          <div class="top">
            <div class="top-left">
              <img :src="imgSrc[item.devStatus]" alt="">
            </div>
            <div class="top-right">
              <div class="charge-mini-block">
                <span class="desc">充电枪口号</span>
                <span class="number-label"> {{ item.gunCode | fmtEmptyText }} </span>
              </div>
              <div
                class="charge-mini-block"
                v-if="item.devStatus == 4"
              >
                <span class="desc">充电方式</span>
                <span class="number-label"> {{ startTypeOptions[item.startType] }} </span>
              </div>
              <div class="charge-mini-block">
                <span class="desc">充电枪类型</span>
                <span class="number-label"> {{ devTypeOptions[item.devType - 1].label | fmtEmptyText }} </span>
              </div>
            </div>
          </div>
          <div class="middle">
            <div class="soc-mini-block">
              <div class="desc">初始SOC</div>
              <div class="soc-bar">
                <ratio-bar
                  :value="item.beginSoc"
                  color="#4A90E2"
                ></ratio-bar>
              </div>
            </div>
            <div class="soc-mini-block current-soc-block">
              <div class="desc">当前SOC</div>
              <div class="soc-bar">
                <ratio-bar
                  :value="item.currentSoc"
                  color="#7ED321"
                ></ratio-bar>
              </div>
            </div>
            <div class="mini-block">
              <span class="desc">VIN号</span>
              <span class="number-label"> {{ item.vin | fmtEmptyText }} </span>
            </div>
            <div class="mini-block">
              <span class="desc">卡号</span>
              <span class="number-label"> {{ item.cardCode | fmtEmptyText }} </span>
            </div>
            <div class="mini-block">
              <span class="desc">电量/kwh</span>
              <span class="number-label"> {{ item.currentMeterKwh | fmtEmptyText }} </span>
            </div>
            <div class="mini-block">
              <span class="desc">电压/V</span>
              <span class="number-label"> {{ item.currentV | fmtEmptyText }} </span>
            </div>
            <div class="mini-block">
              <span class="desc">辅助类型/V</span>
              <span class="number-label"> {{ item.auxiliaryType | fmtAuxiliaryType}} </span>
            </div>
            <div class="mini-block">
              <span class="desc">订单号</span>
              <span class="number-label"> {{ item.billCode | fmtEmptyText }} </span>
            </div>
            <div class="mini-block">
              <span class="desc">开始充电时间</span>
              <span class="number-label"> {{ item.beginTime | fmtDateTime }} </span>
            </div>
            <div class="mini-block">
              <span class="desc">预计剩余时间</span>
              <span class="number-label"> {{ item.remainTime | fmtEmptyText }} </span>
            </div>
            <div class="mini-block">
              <span class="desc">当前电表读数/kwh</span>
              <span class="number-label"> {{ item.currentMeterKwh | fmtEmptyText }} </span>
            </div>
          </div>
          <div class="bottom">
            <div class="bottom-block">
              <div class="bottom-mini-block">
                <span class="desc">当前功率/kw</span>
                <span class="number-label"> {{ item.currentKw | fmtEmptyText }} </span>
              </div>
              <div class="bottom-mini-block">
                <span class="desc">当前电流/A</span>
                <span class="number-label"> {{ item.currentI | fmtEmptyText }} </span>
              </div>
            </div>
            <div class="bottom-block">
              <div class="bottom-mini-block">
                <span class="desc">电池最高温度/℃</span>
                <span class="number-label"> {{ item.tmax | fmtEmptyText }} </span>
              </div>
              <div class="bottom-mini-block">
                <span class="desc">电池最低温度/℃</span>
                <span class="number-label"> {{ item.tmin | fmtEmptyText }} </span>
              </div>
            </div>
            <div class="mini-block">
              <span class="desc">电池单体最高电压/V</span>
              <span class="number-label"> {{ item.vmax | fmtEmptyText }} </span>
            </div>
            <div class="mini-block">
              <span class="desc">电池单体最低电压/V</span>
              <span class="number-label"> {{ item.vmin | fmtEmptyText }} </span>
            </div>
          </div>
          <div class="charge-btn-block">
            <el-button
              class="charge-btn"
              @click="handleBtnClick(item, btnNameOptions[item.devStatus])"
              :disabled="![2,4].includes(item.devStatus)"
              :loading="startLoading[item.gunCode]"
            >
              {{ startLoading[item.gunCode] ? loadText : btnNameOptions[item.devStatus] }}
            </el-button>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>



<script>
import { queryDevStatus, ctrlCharge } from "../service";
import { confirm } from "../common";
import dayjs from "dayjs";
import RatioBar from "../components/RatioBar.vue";

export default {
  components: { RatioBar },
  data() {
    return {
      addr: "11010111191", // 充电设备地址
      gun_number: "", // 枪口号
      status: "", // 工作状态
      devType: "1", // 设备类型
      dataLoading: false,
      devList: [], // 数据
      statusOptions: [
        {
          label: "未知状态",
          value: "0",
        },
        {
          label: "空闲状态",
          value: "1",
        },
        {
          label: "已插抢",
          value: "2",
        },
        {
          label: "暂停充电",
          value: "3",
        },
        {
          label: "充电中",
          value: "4",
        },
        {
          label: "已充满",
          value: "5",
        },
        {
          label: "离网",
          value: "6",
        },
        {
          label: "故障",
          value: "7",
        },
      ], // 状态列表
      devTypeOptions: [
        {
          label: "直流",
          value: "1",
        },
        {
          label: "单相交流",
          value: "2",
        },
        {
          label: "三相交流",
          value: "3",
        },
      ], // 类型列表
      btnNameOptions: [
        "未知状态",
        "请插枪",
        "开始充电",
        "恢复充电",
        "停止充电",
        "请拔枪",
        "暂停服务",
        "检查故障",
      ],
      startTypeOptions: [
        "缺省值",
        "后台APP启动",
        "在线刷卡启动",
        "在线VIN启动",
        "本地离线卡鉴权启动",
        "本地离线VIN鉴权启动",
        "本地离线卡无鉴权启动",
        "本地离线VIN无鉴权启动",
        "本地按钮、屏幕等启动",
      ], // 启动方式
      operationTypeOptions: [
        {
          label: "开始充电",
          value: 1,
        },
        {
          label: "停止充电",
          value: 2,
        },
      ],
      imgSrc: [
        "",
        "./images/free.svg",
        "./images/gun.svg",
        "./images/pause.svg",
        "./images/charging.svg",
        "./images/charged.svg",
        "./images/off.svg",
        "./images/fault.svg",
      ],
      startLoading: {},
      loadText: "",
      timer: {}, // 定时器
    };
  },
  filters: {
    fmtAuxiliaryType(val) {
      if (val || val == 0) {
        return ["12V", "24V"][val];
      } else {
        return "--";
      }
    },
    fmtDateTime(val) {
      if (!val) {
        return "--";
      } else {
        return dayjs(val).format("YYYY-MM-DD HH:mm:ss");
      }
    },
    fmtEmptyText(val) {
      if (!val) {
        return "--";
      } else {
        return val;
      }
    },
  },
  mounted() {
    this.queryDevStatus();
  },
  methods: {
    // 查询
    query() {
      this.queryDevStatus();
      // 每隔5秒重新刷新页面
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.query();
      }, 5000);
    },
    // 查询设备状态
    async queryDevStatus() {
      let params = {
        ctrlAddr: this.addr, // 充电设备地址
        devType: parseInt(this.devType), // 充电设备类型
        gunCode: parseInt(this.gun_number) || 0, // 充电枪口号
        workStatus: parseInt(this.status) || 0, // 工作状态
      };
      this.dataLoading = true;
      if (this.addr) {
        let data = await queryDevStatus(params);
        if (data.code == 1) {
          this.devList = data.data.map((item, index) => {
            return {
              idx: index,
              ...item,
            };
          });
          this.dataLoading = false;
        } else {
          this.$message.error("获取数据失败");
          this.dataLoading = false;
          this.devList = [];
        }
      } else {
        this.$message.warning("请输入充电设备地址");
        this.dataLoading = false;
        clearTimeout(this.timer);
      }
    },
    // 充电控制
    ctrlCharge(item, btnName) {
      clearTimeout(this.timer);
      const rs = this.operationTypeOptions.find((v) => v.label == btnName);
      let params = {
        ctrlAddr: item.ctrlAddr, // 充电设备地址
        devType: item.devType, // 充电设备类型
        gunCode: item.gunCode, // 充电枪口号
        billCode: item.billCode, // 订单号
        operationType: "", // 操作类型
      };
      if (rs) {
        params.operationType = rs.value;
      }
      const param2 = {
        ctrlAddr: this.addr,
        devType: parseInt(this.devType),
        gunCode: item.gunCode,
        workStatus: parseInt(this.status) || 0,
      };
      if (rs.value === 1) {
        confirm("确认开始充电吗？").then(async () => {
            this.$set(this.startLoading, item.gunCode, true);
            this.loadText = "正在开启...";
            let data = await ctrlCharge(params);
            //  clearTimeout(this.timer[item.gunCode]);
            const timeoutID = setTimeout(async () => {
              clearTimeout(timeoutID);
              this.$set(this.startLoading, item.gunCode, false);
              if (data.code == 1) {
                let resp = await queryDevStatus(param2);
                this.$set(this.devList, item.idx, resp.data[0]);
                this.$message.success("操作成功");
              } else {
                this.$message.error("操作失败");
              }
            }, 20000);
          }).catch();
      } else if (rs.value === 2) {
        confirm('确认结束充电吗？').then(async () => {
            this.$set(this.startLoading, item.gunCode, true);
            this.loadText = "正在结束...";
            let data = await ctrlCharge(params);
            // clearTimeout(this.timer[item.gunCode]);
            const timeoutID = setTimeout(() => {
              clearTimeout(timeoutID);
              this.$set(this.startLoading, item.gunCode, false);
              if (data.code == 1) {
                this.$message.success("操作成功");
                this.queryDevStatus();
              } else {
                this.$message.error("操作失败");
              }
            }, 5000);
          }).catch();
      }
    },
    // 按钮点击事件
    handleBtnClick(item, btnName) {
      this.ctrlCharge(item, btnName);
    },
  },
  beforeDestroy() {
    clearTimeout(this.timeoutID);
    clearTimeout(this.timer);
  },
};
</script>

<style scoped lang="scss">
.charge-container {
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.main-wrapper {
  flex: 1;
  padding: 0 160px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
}

.main-block {
  width: 360px;
  background: #ffffff;
  border-radius: 6px;
  margin: 10px 20px;

  .number-label {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #333333;
    letter-spacing: 0;
  }

  .desc {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    line-height: 14px;
  }
}

.top {
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 120px;
}

.top-right {
  flex: 1;
  padding-left: 20px;
  box-sizing: border-box;

  .charge-mini-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0;
  }
}

.mini-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin: 5px 0;
  box-sizing: border-box;
}

.middle {
  .soc-bar {
    flex: 1;
    margin-left: 20px;
  }

  .soc-mini-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    margin: 10px 0;
    box-sizing: border-box;
  }

  .current-soc-block.soc-mini-block {
    margin-bottom: 20px;
  }
}

.bottom {
  .bottom-block {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .bottom-block:first-of-type {
    margin-top: 20px;
  }

  .bottom-mini-block {
    width: 45%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.charge-btn-block {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  padding: 10px;
  box-sizing: border-box;
}

.charge-btn {
  width: 209px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: #4a90e2;
  box-shadow: 0 2px 4px 0 rgba(74, 144, 226, 0.5);
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    color: #fff;
    background: #4a90e2;
    box-shadow: 0 2px 4px 0 rgba(74, 144, 226, 0.5);
  }
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.8;
}
</style>