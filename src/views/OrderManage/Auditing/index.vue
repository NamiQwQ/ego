<template>
  <div class="aduiting">
    <Breadcrumb></Breadcrumb>
    <div class="main">
      <div>
        订单合同：
        <el-button @click="look">查看合同</el-button>
      </div>
    </div>
    <!-- 弹框展示pdf内容 -->
    <Vuepdf :dialogVisible="dialogVisible" @changeDialog="changeDialog"></Vuepdf>

  </div>
</template>

<script>
import Vuepdf from './Vuepdf.vue'
export default {
  data(){
    return {
      dialogVisible:false
    }
  },  
  components: {
    Vuepdf
  },
  methods: {
    look() {
      this.dialogVisible=true;
    },
    //关闭弹框
    changeDialog(){
      this.dialogVisible = false;
    }
  }
}
</script>

<style lang="less" scoped>
.aduiting {
  margin: 10px;

  .main {
    background: #fff;
    padding: 20px;
    margin-top: 20px;
  }
}
</style>