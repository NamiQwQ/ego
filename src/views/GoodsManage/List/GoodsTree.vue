<template>
    <!--
        动态加载tree数据节点 
            props	配置选项，具体看下表
            load	加载子树数据的方法，仅当 lazy 属性为true 时生效	function(node, resolve)
            show-checkbox	节点是否可被选择	boolean
            lazy	是否懒加载子节点，需与 load 方法结合使用	boolean
     -->
    <el-tree :props="props" :load="loadNode" lazy @node-click="clickTree">
    </el-tree>
</template>

<script>
export default {
    data() {
        return {
            props: {
                label: 'name',
                children: 'zones',
                isLeaf: 'leaf'
            },
        };
    },
    methods: {
        clickTree(data,node){
            // console.log('点击了tree',data,node);
            this.$emit('changeTree',data)
        },  
        //进入组件--动态默认加载的tree的方法---点击tree还会执行这个函数------
        async loadNode(node, resolve) {
            // console.log('node----', node);
            if (node.level === 0) {//自动加载--进入页面执行
                let result = await this.goodsItemCategory(1)
                return resolve(result);
            }
            if(node.level >= 1){//点击tree 获取点击的层级级别 请求对应的数据 
                // console.log('请求子级菜单',node.data);
                let result = await this.goodsItemCategory(node.data.cid)
                return resolve(result);
            }
            // if(node.level===2){
            //     console.log('请求三级菜单',node.data.cid);
            //     let result = await this.goodsItemCategory(node.data.cid)
            //     return resolve(result);
            // }
           
        },
        //获取tree数据-----------------------------------
        async goodsItemCategory(type) {
            let res = await this.$api.goodsItemCategory({ type })
            // console.log('tree-----', res.data);
            if (res.data.status === 200) {
                return res.data.result;
            } else {
                return [];
            }
        }
    }
};
</script>

<style>

</style>