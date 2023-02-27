<template>
    <div class="addGoods">
        <el-row :gutter="20">
            <el-col :span="4">
                <div class="menu">
                    <div class="title">产品类型列表</div>
                    <div class="tree">
                        <GoodsTree @changeTree="changeTree"></GoodsTree>
                    </div>
                </div>
            </el-col>
            <el-col :span="20">
                <div class="content">
                    <div class="subTitle">商品{{ title }}</div>
                    <div class="wrapper">
                        <!-- 
                            el-form
                                :model="ruleForm" 表单数据 object
                                :rules="rules"    校验规则
                                ref="ruleForm"    获取组件from组件 dom 
                                label-width="100px" 标题占据宽度
                                size="small"     用于控制该表单内组件的尺寸	string	medium / small / mini
                            el-form-item
                                label="活动名称"   标题
                                prop="name"         字段标识--调用element-ui内置方法操作 必须写prop
                         -->
                        <el-form :model="goodsForm" :rules="rules" ref="ruleForm" label-width="100px" size="small"
                            class="demo-ruleForm">
                            <el-form-item label="所属分类" prop="category">
                                <span class="category"> {{ goodsForm.category }}</span>
                            </el-form-item>
                            <el-form-item label="商品名称" prop="title">
                                <el-input v-model="goodsForm.title"></el-input>
                            </el-form-item>
                            <el-form-item label="商品价格" prop="price">
                                <el-input v-model="goodsForm.price"></el-input>
                            </el-form-item>
                            <el-form-item label="商品数量" prop="num">
                                <el-input v-model="goodsForm.num"></el-input>
                            </el-form-item>
                            <el-form-item label="商品卖点" prop="sellPoint">
                                <el-input v-model="goodsForm.sellPoint"></el-input>
                            </el-form-item>
                            <el-form-item label="上传图片" prop="image">
                                <GoodsUpload @sendImage="sendImage" :fileList="fileList"></GoodsUpload>
                            </el-form-item>
                            <el-form-item label="商品描述" prop="descs">
                                <WangEditor @sendEditor="sendEditor" :editorData="editor" ref="myEditor"></WangEditor>
                            </el-form-item>
                            <el-form-item label="首页轮播推荐" prop="isBanner">
                                <el-switch v-model="goodsForm.isBanner" active-color="#13ce66"></el-switch>
                            </el-form-item>
                            <el-form-item label="是否推荐商品" prop="recommend">
                                <el-switch v-model="goodsForm.recommend" active-color="#13ce66"></el-switch>
                            </el-form-item>
                            <el-form-item label="是否上架商品" prop="shelves">
                                <el-switch v-model="goodsForm.shelves" active-color="#13ce66"></el-switch>
                            </el-form-item>
                            <el-form-item>
                                <el-button v-show="title!='详情'" type="primary" @click="submitForm('ruleForm')">保存</el-button>
                                <el-button  v-show="title!='详情'"  @click="resetForm('ruleForm')">重置</el-button>
                                <el-button @click="goGoodsList()" type="info" plain>取消</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import GoodsTree from './GoodsTree.vue'
import GoodsUpload from './GoodsUpload.vue'
import WangEditor from './WangEditor.vue'
export default {
    components: {
        GoodsTree,
        GoodsUpload,
        WangEditor
    },
    computed: {
        ...mapState('goods', ['title', 'goodsData'])
    },
    mounted() {
        if (this.title === '编辑' || this.title === '详情') {//获取仓库的值
            this.goodsForm = {...this.goodsData};
            console.log('this.goodsData-------', this.goodsData);
            //解析图片字段---------------
            let imgs = JSON.parse(this.goodsData.image);//[] [''] ['','',...]
            this.goodsForm.image = imgs;//获取vuex里面的数组 转成数组语法
            console.log('解析图片字段-----', imgs);
            let arr = []
            imgs.forEach(ele => {
                let obj = {}
                obj.url = ele;
                arr.push(obj)
            });
            this.fileList = arr;
            //-富文本编译器数据----------------------
            this.editor = this.goodsForm.descs;
        }
    },
    data() {
        return {
            editor: '',//编译器的数据
            fileList: [],//图片容器[{url:''}]
            goodsForm: {
                cid: '',
                category: '',//分类
                title: '',//名称
                price: '',
                num: '',
                sellPoint: '',
                image: [],
                descs: '',
                isBanner: true,//轮推荐
                recommend: true,//推荐
                shelves: true,//商品上架
            },
            rules: {
                category: [
                    { required: true, message: '请输入商品类目' }
                ],
                title: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
                ],
                price: [
                    { required: true, message: '请输入商品价格', trigger: 'blur' }
                ],
                num: [
                    { required: true, message: '请输入商品数量', trigger: 'blur' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],

            }
        };
    },
    methods: {
        //返回列表
        goGoodsList(){
            this.$router.push('/goods/list')
        },
        //获取图片上传成功的回显地址----
        sendImage(url) {
            this.goodsForm.image.push(url);
        },
        //获取wangEditor输入的内容文本-=---------------
        sendEditor(val) {
            console.log('获取wangEditor输入的内容---', val);
            this.goodsForm.descs = val
        },
        //获取tree节点内容--------------------------
        changeTree(data) {
            console.log('获取tree节点内容-----', data);
            this.goodsForm.category = data.name;
            this.goodsForm.cid = data.cid;
            //去掉校验结果---类目
            this.$refs.ruleForm.clearValidate('category')
        },
        //添加商品接口-----------------------------
        async addGoods(params) {
            let res = await this.$api.addGoods(params)
            if (res.data.status === 200) {//添加成功--
                //跳转到产品列表界面--- 
                this.$router.push('/goods/list')
                //信息提示
                this.$message({
                    message: '恭喜你，添加商品成功',
                    type: 'success'
                });

            } else {
                //错误信息提示
                this.$message.error('错了哦，添加商品失败');
            }

        },
        //修改商品接口----------------------------------
        async changeGoods(params) {
            let res = await this.$api.changeGoods(params)
            console.log('修改结果-----', res.data);
            if (res.data.status === 200) {//修改成功--
                //跳转到产品列表界面--- 
                this.$router.push('/goods/list')
                //信息提示
                this.$message({
                    message: '恭喜你，编辑商品成功',
                    type: 'success'
                });

            } else {
                //错误信息提示
                this.$message.error('错了哦，编辑商品失败');
            }
        },
        //提交-----1. 添加功能  2. 编辑功能-----------------------------
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('获取表单的输入信息：----', this.goodsForm);
                    //添加商品----参数： title cid  category sellPoint price num descs paramsInfo image
                    let { id, title, cid, category, sellPoint, price, num, descs, image } = this.goodsForm;
                    if (this.title === '添加') {
                        this.addGoods({
                            title, cid, category, sellPoint, price, num, descs,
                            image: JSON.stringify(image)
                        })
                    } else {
                        console.log('修改商品----image-----', image);
                        this.changeGoods({
                            id, title, cid, category, sellPoint, price, num, descs, image: JSON.stringify(image)
                        })
                    }


                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //重置表单-----------------------------------------
        /* 
            1. 清空表单数据 
                a:调用element-ui提供的方法
                b:手动对数据做初始化
            2. 编辑商品
                重置  恢复之前的初始值 vuex仓库
        */
        resetForm(formName) {
            if (this.title === '添加') {
                // a:调用element-ui提供的方法
                // this.$refs[formName].resetFields();
                // b:手动对数据做初始化
                this.goodsForm = {
                    cid: '',
                    category: '',//分类
                    title: '',//名称
                    price: '',
                    num: '',
                    sellPoint: '',
                    image: [],
                    descs: '',
                    isBanner: true,//轮推荐
                    recommend: true,//推荐
                    shelves: true,//商品上架
                }
                //图片上传组件清空列表
                this.fileList = [];
                //wangEditor清空数据
                console.log(this.$refs);
                this.$refs.myEditor.clear();
            } else {
                //编辑功能--重置功能--------------------------
                console.log('编辑功能--重置功能----',this.goodsData);
                this.goodsForm = {...this.goodsData};
                console.log('this.goodsData-------', this.goodsForm);
                //解析图片字段---------------
                let imgs = JSON.parse(this.goodsData.image);//[] [''] ['','',...]
                this.goodsForm.image = imgs;//获取vuex里面的数组 转成数组语法
                console.log('解析图片字段-----', imgs);
                let arr = []
                imgs.forEach(ele => {
                    let obj = {}
                    obj.url = ele;
                    arr.push(obj)
                });
                this.fileList = arr;
                //-富文本编译器数据----------------------
                console.log('富文本编译器数据----',this.editor,'this.goodsData.descs',this.goodsData.descs);
                // this.editor = this.goodsData.descs;//同一个数据--不更新
                this.$refs.myEditor.editor.setHtml(this.goodsData.descs)

                //重置--返回页面--- 
                // this.$router.push('/goods/list')
            }

        }
    }
}
</script>

<style lang="less" scoped>
.addGoods {
    margin: 10px;
    // background: #fff;
    padding: 10px;
}

.menu {
    border: 1px solid #eee;
    height: 600px;
    background: #fff;

    .title {
        height: 50px;
        line-height: 50px;
        color: #fff;
        background: skyblue;
        padding-left: 10px;
        font-size: 14px;
    }

    .tree {
        padding: 20px;
    }
}

.content {
    min-height: 800px;
    background: #fff;
    font-size: 14px;

    .subTitle {
        background: #eee;
        color: #000;
        padding: 10px;
        font-weight: bold;
    }

    .wrapper {
        padding: 20px;
    }

    .category {
        color: skyblue;
        font-size: 16px;
    }
}
</style>