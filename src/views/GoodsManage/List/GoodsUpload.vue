<template>
    <!-- 
        action	    必选参数，上传的地址	string
        list-type	文件列表的类型	   string	text/picture/picture-card	text
        on-preview	点击文件列表中已上传的文件时的钩子	function(file)
        on-remove	文件列表移除文件时的钩子	function(file, fileList)
        on-success	文件上传成功时的钩子	function(response, file, fileList)
        on-error	文件上传失败时的钩子	function(err, file, fileList)
        on-change	文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用	function(file, fileList)
        auto-upload	是否在选取文件后立即进行上传	boolean	—	true
        on-exceed	文件超出个数限制时的钩子	function(files, fileList)
        multiple	是否支持多选文件	boolean
     -->
    <div>
        <el-upload 
            ref="upload"
            :action="url" 
            list-type="picture-card"
            :on-preview="handlePictureCardPreview" 
            :on-remove="changeUpload"
            :on-success="handleSuccess"
            :limit="2"
            :on-exceed="handleExceed"
            multiple
            :on-change="changeUpload"
            :file-list="fileList"
            >
            <i class="el-icon-plus"></i>
        </el-upload>
        <div v-if="isShow" slot="tip"  class="el-upload__tip">只能上传jpg/png文件,最多只能上传2个图片</div>
        <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
    </div>
</template>

<script>
import {upload,host} from '@/api/base'
export default {
    props:{
        fileList:{
            type:Array,
            default:function(){
                return []
            }
        }
    },
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            url:upload,
            imgList:[],
            isShow:false,
            //图片列表容器 数据格式：[{url:''},{}]
            // fileList: []
        };
    },
    methods: {
        //禁止自动上传--手动上传服务--------------------------
        submitUpload(){
            this.$refs.upload.submit();
        },  
        //成功上传图片的回调函数-----------------------------
        handleSuccess(response, file, fileList){
            console.log('成功函数',response, file, fileList);
            // this.fileList=fileList;
            //获取一个完整的图片地址---为了--添加商品的时候 需要传递图片地址--- 
            let url = response.url.slice(7);
            let imgUrl = host+'/'+url;
            console.log(imgUrl);
            // this.imgList.push(imgUrl);
            //发送个父组图片路径
            this.$emit('sendImage',imgUrl)
        },  
        //文件超出个数限制时的钩子-------------------------
        handleExceed(files, fileList){
            console.log('文件超出个数限制时的钩子---',files, fileList);
            this.isShow=true;
        }, 
        changeUpload(){
            this.isShow=false;
        } ,
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    }
}
</script>

<style lang="less" scoped>
.el-upload__tip{
    color: red;
}
</style>