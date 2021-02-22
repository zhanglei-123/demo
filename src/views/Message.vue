<template>
  <!-- 报文查看页面 -->
  <div class="file-container">
    <div class="operation-bar">
      <div class="btn-block-left">
        <el-input 
          v-model="address"
          type="text" 
          class="custom-input margin" 
          placeholder="请输入桩地址" 
          clearable 
          size="mini">
        </el-input>
        <el-date-picker 
          v-model="timerange"
          type="datetimerange" 
          class="custom-date-picker margin"
          start-placeholder="开始时间" 
          end-placeholder="结束时间"
          size="mini">
        </el-date-picker>
        <el-select 
          v-model="protocol"
          class="custom-select margin"
          placeholder="请选择协议"
          clearable  
          size="mini">
          <el-option></el-option>
        </el-select>
        <el-button class="custom-btn margin" size="mini">查询</el-button>
        <el-button class="custom-btn margin" size="mini">重置</el-button>
      </div>
      <div class="btn-block-right">
        <el-button class="custom-btn margin" size="mini"  @click="start">开启报文实时查看</el-button>
        <el-button class="custom-btn margin" size="mini">报文文件导出</el-button>
      </div>
    </div> 
    <div class="file-content flex">
      <div class="file-list">
        <el-table 
          :data="tableData"
          v-loading="tableLoading"
        ></el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
      <div class="file-display flex">
        <div class="file-info">
          <div class="file-info-title">协议报文详情</div>
        </div>
        <div class="message-box">
          <div class="message-title  flex a-c j-s">
            <span>原始报文</span>
            <span>
              <el-button plain size="mini">复制原始报文</el-button>
              <el-button plain size="mini">校验原始报文</el-button>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [], // 查询出来的报文列表
        tableLoading: false,
        address: '',
        timerange: '',
        protocol: ''
      }
    },
    created() {},
    methods: {
      start() {
        this.$router.push({ name: 'RealtimeReport' });
      }
    }
  };
</script>

<style scoped lang="scss">
.file-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.file-content {
  height: calc(100% - 80px);
  border: 5px solid #798093;
  margin: 20px 0;
}

.file-list {
  width: 45%;
  height: 100%;
  border-right: 5px solid #798093;
}

.file-display {
  flex: 1;
  height: 100%;
  flex-direction: column;

  .file-info {
    width: 100%;
    height: 60%;
  }

  .message-box {
    flex: 1;
    width: 100%;
  }
}

.file-info-title {
  padding: 8px 10px;
  background: #798093;
  color: #fff;
}

.message-title {
  padding: 10px;
  background: #798093;
  color: #fff;
}

</style>