<template>
    <!--      
        title="提示"   title属性用于定义标题，它是可选的，默认值为空
        :visible.sync="dialogVisible"  visible属性，它接收Boolean，当为true时显示 Dialog
         width="30%"
        :before-close="handleClose"
     -->
    <el-dialog :title="title" :visible="dialogVisible" width="30%" :before-close="close">
        <p class="title">请输入类目名称：</p>
        <el-input v-model="name" placeholder="请输入内容"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    // props:['dialogVisible'],
    props: ['input', 'cid'],
    data() {
        return {
            dialogVisible: false,
            title: '',
            name: '',
            id: ''
        };
    },
    watch: {
        input(val) {
            console.log('监听器=================val', val);
            this.name = val.name;
            this.id = val.id;
        }
    },
    methods: {
        //确定按钮--------------
        submit() {
            console.log(this.title);
            if (this.title === '修改分类名称') {//修改操作
                this.updateCategory(this.name, this.id)
            } else if (this.title === '新增一级分类名称') {
                this.insertCategory(this.name)
            } else {
                //新增---子类目录---------- 
                this.insertItemCategory(this.name, this.cid)
            }
            // console.log('新增---子类目录---------- ',this.name,this.cid);
            //2. 隐藏弹框
            this.dialogVisible = false;
            //清空输入框
            this.name = '';
            //3. 更新视图
            this.$emit('updateViews')
        },
        //新增子类接口---------- insertItemCategory --
        async insertItemCategory(name, cid) {
            let res = await this.$api.insertItemCategory({ name, cid })
            console.log('新增子类接口---------', res.data);
            if (res.data.status == 200) {
                this.$message({
                    message: '恭喜你，新增成功',
                    type: 'success'
                });
            } else {
                this.$message.error('错了哦，新增失败');
            }
        },
        //修改接口---updateCategory----
        async updateCategory(name, id) {
            let res = await this.$api.updateCategory({ name, id })
            console.log('修改接口--------', res.data);
            if (res.data.status == 200) {
                this.$message({
                    message: '恭喜你，修改成功',
                    type: 'success'
                });
            } else {
                this.$message.error('错了哦，修改失败');
            }
        },
        //一级分类名称新增---------- insertCategory---
        async insertCategory(name) {
            let res = await this.$api.insertCategory({ name })
            console.log('一级分类名称新增-----', res.data);
            if (res.data.status == 200) {
                this.$message({
                    message: '恭喜你，新增成功',
                    type: 'success'
                });
            } else {
                this.$message.error('错了哦，新增失败');
            }
        },
        //取消
        close() {
            this.dialogVisible = false;
            this.name = ''
        }
    }
};
</script>

<style lang="less" scoped>
.title {
    margin-bottom: 10px;
    font-weight: bold;
}
</style>