<template>
    <div>
        <!-- 顶部区域 -->
        <div class="header">
            <div class="icon">
                <i v-if="!isCollapse" @click="changemenu" class="iconfont icon-right-indent"></i>
                <i v-else @click="changemenu" class="iconfont icon-left-indent"></i>
            </div>
            <div class="header-right">
                <span>{{ nowTime }}</span>
                <span class="line">|</span>
                <!-- 
                    Events
                        command	点击菜单项触发的事件回调	dropdown-item 的指令
                    Dropdown Menu Item Attributes
                        command	指令	string/number/object

                    点击下拉菜单
                        点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作
                 -->
                <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="myzh">中文</el-dropdown-item>
                    <el-dropdown-item command="myen">English</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
                <span class="line">|</span>
                <span>欢迎 {{userinfo.user}}</span>
                <span class="line">|</span>
                <span class="exit" @click="loginout">
                    <i class="iconfont icon-tuichu"></i>
                </span>
            </div>
        </div>
        <!-- 内容区域 -->
        <router-view></router-view>
    </div>
</template>

<script>
//导入dayjs
import dayjs from 'dayjs'
import { mapMutations, mapState } from 'vuex';
export default {
    props: ['isCollapse'],
    data() {
        return {
            nowTime: ''
        }
    },
    computed:{
        ...mapState('login',['userinfo']),
    },
    methods: {
        ...mapMutations('menu',['deleteMenuList']),
        ...mapMutations('login',['deleteUser']),
        //退出登录--------------
        loginout(){
            //清空本地存储--返回登录
            // localStorage.removeItem('goods'); 
            //清空导航-munu 
            this.deleteMenuList();
            this.deleteUser();
            //清空
            this.$router.options.routes=[];
            console.log('this.$router',this.$router);
            this.$router.replace('/login')
        },
        //国际化
        handleCommand(val){
            console.log(val,this);
            //设置语言选择环境---
            this.$i18n.locale=val;

        },
        //展开折叠左侧导航区域------------------
        changemenu() {
            this.$emit('changeMenu')
        }
    },
    created() {
        //获取当前的时间-----------------
        // let time = new Date()  //1.自己封装获取日期格式 2.moment.js  3. dayjs 
        this.nowTime = dayjs(new Date()).format('YYYY年MM月DD日 HH:mm:ss')
    }
}
</script>

<style lang="less" scoped>
.header {
    background: #1e78bf;
    height: 50px;
    line-height: 50px;
    color: #fff;
    width: 100%;
    display: flex;

    .icon {
        i {
            font-size: 24px;
        }
    }

    .header-right {
        font-size: 12px;
        flex: 1;
        text-align: right;
        padding-right: 20px;

        .el-dropdown-link {
            cursor: pointer;
            color: #fff;
        }

        .el-icon-arrow-down {
            font-size: 12px;
        }

        .line {
            font-size: 12px;
            color: #f5f5f5f5;
            padding: 10px;
        }

        .exit {
            // display: inline-block;
            float: right;
            position: relative;
            height: 50px;
            width: 30px;

            i {
                font-size: 18px;
                top: 50%;
                transform: translateY(-50%);
                position: absolute;
                right: 0;
            }
        }
    }
}
</style>