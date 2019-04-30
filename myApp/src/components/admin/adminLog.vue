<template>
    <div>
        <div class="toolbar">
            <el-form :inline="true" :model="formInline"  class="demo-form-inline">
                <el-form-item label="管理员姓名">
                    <el-input v-model="formInline.user" placeholder="请输入管理员姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getAdminLogList">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table
            v-loading="loading"
            :border="border"
            :data="adminLogList"
            style="width: 100%;">
            <el-table-column
                label="管理员姓名" >
                <template slot-scope="scope">
                    {{scope.row.adminInfo[0].adminName}}
                </template>
            </el-table-column>
            <el-table-column  label="日志时间">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px;">{{scope.row.addTime | date}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="登录详情">
                <template slot-scope="scope">
                    <span style="margin-left: 10px;">{{scope.row.detail}}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <!--<el-button-->
                    <!--size="mini"-->
                    <!--@click="handleEdit(scope.$index, scope.row)">编辑{{scope.$index}}</el-button>-->
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="toolbar">
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="getAdminLogList"
               :page-count="pageSum"
                :current-page.sync="pageIndex"
                >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "adminLog",
        data(){
            return{
                adminLogList:[],
                border:true,
                pageSum:1,
                loading:true,
                pageIndex:1,
                formInline:{
                    user: ''
                }
            }
        },
        methods:{
            getAdminLogList(pageIndex){
                this.loading=true;
                this.$ajax.get('/getAdminLogList',{
                    params:{
                        pageIndex,
                        // keyWord:this.formInline.user
                    }
                }).then(data=>{
                    this.loading=false;
                        this.pageSum = data.pageSum;
                        this.adminLogList = data.adminInfo;
                    })
            },
            handleDelete(id){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$ajax.delete("/adminLogList",{
                        params:{
                            id
                        }
                    }).then(data=>{
                        if(data.ok === 1){
                            this.getAdminLogList(this.pageIndex)
                            this.$message({
                                type: 'success',
                                message: data.msg
                            });
                        }else{
                            this.$message.error(data.msg);
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        mounted(){
            this.getAdminLogList(1);//渲染该组件时，调用数据，为第一页
        }
    }
</script>

<style scoped>

</style>
