<template>
    <!-- 
        data  tree数据结构
        props 数据字段接受
     -->
    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
</template>

<script>
export default {
    data() {
        return {
            data: [{
                name: '猪肉',
                children: [
                    {
                        name: '大腿肉',
                    },
                    {
                        name: '排骨'
                    }
                ]
            },
            {
                name: '水果',
                children:[
                    {}
                ]
            }

            ],
            defaultProps: {
                children: 'children',
                label: 'name'
            }
        };
    },
    methods: {
        handleNodeClick(data) {
            console.log(data);
        }
    }
};
</script>

<style>

</style>