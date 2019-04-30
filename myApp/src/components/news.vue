<template>
    <div>
        <div class="toolbar">
            <el-form :inline="true"  class="demo-form-inline">
                <el-form-item>
                    <el-button type="primary" @click="dialogFormVisible=true">添加新闻要事</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-dialog title="添加新闻" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="标题" :label-width="formLabelWidth">
                        <el-input v-model="form.picTitle" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="图片" :label-width="formLabelWidth">
                        <el-upload
                            class="upload-demo"
                            ref="upload"
                            action=""
                            :limit="1"
                            :on-exceed="exceed"
                            :auto-upload="false">
                            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="详情" :label-width="formLabelWidth">
                        <el-input v-model="form.picDetail" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addNews">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div>
            <el-table
                v-loading="loading"
                border
                :data="newsList"
                style="width: 100%;">
                <el-table-column
                    label="标题" >
                    <template slot-scope="scope">
                        {{scope.row.picTitle}}
                    </template>
                </el-table-column>
                <el-table-column  label="图片内容">
                    <template slot-scope="scope">
                        <div>
                            <img width="100px" :src="scope.row.picConent | imgUrl" alt="">
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  label="详情描述">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px;">{{scope.row.picDetail}}</span>
                    </template>
                </el-table-column>
                <el-table-column  label="添加时间">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px;">{{scope.row.addTime | date}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                        >编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="toolbar">
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="getNews"
                :page-count="pageSum"
                :current-page.sync="pageIndex"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "news",
        data(){
            return{
                dialogFormVisible:false,
                formLabelWidth:'120px',
                loading:false,
                newsList:[],
                pageSum:1,
                pageIndex:1,
                form:{
                    picTitle:'',
                    picDetail:''
                }
            }
        },
        methods:{
            addNews(){
                this.$refs.upload.clearFiles();
                var formdata=new FormData();
                formdata.set("picTitle",this.form.picTitle);
                formdata.set("picDetail",this.form.picDetail);
                //图片是文件，所以加files[0],不然会报错size<0
                formdata.set("picConent",document.querySelector(".el-upload__input").files[0]);
                this.$ajax.post("/addNews",formdata)
                    .then(data=>{
                        this.dialogFormVisible=false;
                        if(data.ok===1){
                            this.getNews(this.pageIndex);
                            this.$message({
                                message:data.msg,
                                type:"success"
                            });
                        }else{
                            this.$message.error(data.msg);
                        }
                    })
            },
            getNews(pageIndex){
                this.$ajax.get("/getNews",{
                    params:{
                        pageIndex
                    }
                }).then(data=>{
                        if(data.ok===1){
                            this.pageSum = data.pageSum;
                            this.newsList = data.newsInfo;
                        }
                    })
            },
            exceed(){
                this.$message.error('你已经上传了图片！');
            }
        },
        mounted(){
            this.getNews(1);
        }
    }
</script>

<style scoped>

</style>
