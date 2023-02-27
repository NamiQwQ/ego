<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in navData" :key="item.path" :to="{ path: item.path }">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    data(){
        return{}
    },  
    created(){
        // console.log(this.$route.matched);
    },
    computed:{
        navData(){
            let matche = this.$route.matched;
            console.log('---matche----',matche);
            matche[0].path='/';
            return matche;
        }
    }
}
</script>

<style>

</style>