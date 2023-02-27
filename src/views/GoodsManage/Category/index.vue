<template>
  <div class="category">
    <Breadcrumb></Breadcrumb>
    <div class="wrapper">
      <div class="title">产品类目管理</div>
      <div class="tree">
        <el-button @click="addCategory" type="warning" style="margin-bottom:20px;">新增一级导航类目</el-button>
        <!-- 
            :data="data" data	展示数据	array
            node-key	每个树节点用来作为唯一标识的属性，整棵树应该是唯一的	String
            default-expand-all	是否默认展开所有节点	boolean
            expand-on-click-node	是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。
            render-content	树节点的内容区的渲染 Function	Function(h, { node, data, store })
         -->
        <el-tree :data="data" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false"
          :render-content="renderContent">
        </el-tree>
      </div>
      <!-- 弹框--添加修改内容---弹框展示 -->
      <Dialog ref="myDialog" @updateViews="updateViews" :input="input" :cid="cid"></Dialog>

    </div>
  </div>
</template>

<script>
import Dialog from './Dialog.vue'
export default {
  components: {
    Dialog,
  },
  data() {
    return {
      input: '',
      cid:'',
      data: [
        {
          id: 1,
          name: '一级 1',
          children: [{
            id: 4,
            name: '二级 1-1'
          }]
        }
      ]
    }
  },

  methods: {
    //更新视图----
    updateViews() {
      this.itemCategory();
    },
    //新增一级目录---------insertCategory------
    addCategory() {
      //子组件弹框显示---dialogVisible
      //  console.log(this.$refs.myDialog);
      this.$refs.myDialog.dialogVisible = true;
      this.$refs.myDialog.title = '新增一级分类名称'
    },
    //新增子类---------------------------------
    append(data) {
      console.log('新增');
      this.$refs.myDialog.dialogVisible = true;
      this.$refs.myDialog.title = `新增${data.name}分类子类名称`;
      this.cid = data.cid;
    },
    //删除 deleteContentCategoryById
    remove(node, data) {
      console.log('删除');
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteContentCategoryById(data.id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    //修改
    update(node, data) {//updateCategory
      this.input = { name: data.name, id: data.id }
      console.log('修改', data, this.input);
      this.$refs.myDialog.dialogVisible = true;
      this.$refs.myDialog.title = '修改分类名称'
    },
    //树节点的内容区的渲染 Function	Function(h, { node, data, store })
    renderContent(h, { node, data, store }) {
      // console.log('树节点的内容区的渲染 Function',node,data);
      return (
        <span class="custom-tree-node">
          <span class='name'>{data.name}</span>
          {data.type == 1 ? <span>
            <el-button class='mini' on-click={() => this.append(data)} icon="el-icon-plus">新增</el-button>
            <el-button class='mini' on-click={() => this.update(node, data)} icon="el-icon-edit">修改</el-button>
            <el-button class='mini' type="danger" on-click={() => this.remove(node, data)} icon="el-icon-delete">删除</el-button>
          </span> : <span>
            <el-button class='mini' on-click={() => this.update(node, data)} icon="el-icon-edit">修改</el-button>
            <el-button class='mini' type="danger" on-click={() => this.remove(node, data)} icon="el-icon-delete">删除</el-button>
          </span>}

        </span>);
    },
    //删除接口---------
    async deleteContentCategoryById(id) {
      let res = await this.$api.deleteContentCategoryById({ id })
      console.log('删除接口---------', res.data);
      if (res.data.status == 200) {
        this.itemCategory()
        this.$message({
          message: '恭喜你，删除成功',
          type: 'success'
        });
      } else {
        this.$message.error('错了哦，删除失败');
      }
    },
    //获取类目列表展示-----------------
    async itemCategory() {
      let res = await this.$api.itemCategory()
      console.log('获取类目列表展示--------', res.data.result);
      let result = res.data.result;
      //声明容器存储一级导航  二级导航 
      let arr = [], arr2 = [];//arr存储1级  arr2存储2级
      result.forEach(ele => {
        if (ele.type === 1) {
          ele.children = []
          arr.push(ele)
        } else {
          arr2.push(ele)
        }
      });
      console.log(arr, arr2);
      arr.forEach(ele => {
        arr2.forEach(item => {
          if (ele.cid === item.type) {
            ele.children.push(item)
          }
        })
      })
      console.log(arr);
      this.data = arr;
    }
  },
  created() {
    this.itemCategory();
  }
}
</script>

<style lang="less" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}

.category {
  margin: 10px;
}

.wrapper {
  padding: 10px;
  margin-top: 10px;
  background: #fff;

  .title {
    background: #f6f6f6;
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    padding-left: 10px;
  }

  .tree {
    margin: 10px;


    /deep/ .mini {
      padding: 4px 10px;
      font-size: 14px;
    }

    /deep/ .el-tree-node__content {
      margin-bottom: 10px;
    }
  }

  /deep/ .name {
    width: 300px;
    display: inline-block;
  }


}
</style>