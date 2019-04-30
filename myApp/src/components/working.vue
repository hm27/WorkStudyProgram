<template>
    <div>
        <div class="toolbar">
            <el-form :inline="true" :model="formInline"  class="demo-form-inline">
                <el-form-item label="学生姓名">
                    <el-input v-model="formInline.user" placeholder="请输入学生姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table
            v-loading="loading"
            border
            :data="workIngList"
            style="width: 100%;">
            <el-table-column
                width="100px"
                label="学生姓名" >
                <template slot-scope="scope">
                    {{scope.row.aName}}
                </template>
            </el-table-column>
            <el-table-column  label="工作地点">
                <template slot-scope="scope">
                    <span style="margin-left: 10px;">{{scope.row.aWhere}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="工作内容">
                <template slot-scope="scope">
                    <span style="margin-left: 10px;">{{scope.row.aContent}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" label="应干时间/时">
                <template slot-scope="scope">
                    <span style="margin-left: 10px;">{{scope.row.yTime}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px"  label="实干时间/时">
                <template slot-scope="scope">
                    <span style="margin-left: 10px;">{{scope.row.sTime}}</span>
                </template>
            </el-table-column>
            <el-table-column width="120px" label="出勤率">
                <template slot-scope="scope">
                    <span style="margin-left: 10px;">{{scope.row.Attendance}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="工作状态">
                <template slot-scope="scope">
                    <span style="margin-left: 10px;">{{scope.row.state}}</span>
                </template>
            </el-table-column>
           <!-- <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.row._id)">编辑</el-button>
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>-->
        </el-table>
        <div class="toolbar">
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="getWorkingList"
                :page-count="pageSum"
                :current-page.sync="pageIndex"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "working",
        data(){
            return{
                loading:false,
                pageIndex:1,
                pageSum:1,
                formInline:{
                    user:""
                },
                workIngList:[]
            }
        },
        methods:{
            getWorkingList(pageIndex){/*获取派出人员列表*/
                this.$ajax.get("/getWorkingList",{
                    params:{
                        pageIndex
                    }
                }).then(data=>{
                        if(data.ok === 1){
                            this.pageSum = data.pageSum;
                            this.workIngList = data.workInfo;
                        }
                    })
            },
            handleEdit(){

            },
            handleDelete(){

            }
        },
        mounted(){
            this.getWorkingList(1);
        }
    }
</script>

<style scoped>

</style>
