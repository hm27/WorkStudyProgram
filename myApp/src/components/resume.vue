<template>
    <div>
        <div>
            <el-table
                border
                :data="resumeList"
                style="width: 100%;">
                <el-table-column
                    width="80px"
                    label="姓名" >
                    <template slot-scope="scope">
                        {{scope.row.aName}}
                    </template>
                </el-table-column>
                <el-table-column width="100px" label="年级">
                    <template slot-scope="scope">
                        {{scope.row.aGrade}}
                    </template>
                </el-table-column>
                <el-table-column width="115px" label="学号">
                    <template slot-scope="scope">
                        {{scope.row.aNum}}
                    </template>
                </el-table-column>
                <el-table-column  label="工作经验">
                    <template slot-scope="scope">
                        {{scope.row.aWrokexp}}
                    </template>
                </el-table-column>
                <el-table-column width="120px" label="应聘工作">
                    <template slot-scope="scope">
                        {{scope.row.aPost}}
                    </template>
                </el-table-column>
                <el-table-column  label="工作时间">
                    <template slot-scope="scope">
                        {{scope.row.aTime | date}} - {{scope.row.aTime2 | date}}
                    </template>
                </el-table-column>
                <el-table-column width="115px"  label="学生电话">
                    <template slot-scope="scope">
                        {{scope.row.phone}}
                    </template>
                </el-table-column>
                <el-table-column  label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="employ(scope.row._id)">录用</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="notPass(scope.row._id)">不合适</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="toolbar">
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="getResumeList"
                :page-count="pageSum"
                :current-page.sync="pageIndex"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "resume",
        data(){
            return{
                resumeList:[],
                pageIndex:1,
                pageSum:1
            }
        },
        methods:{
            getResumeList(pageIndex){/*获取简历列表*/
                this.$ajax.get("/getResumeList",{
                    params:{
                        pageIndex
                    }
                })
                    .then(data=>{
                        if(data.ok===1){
                            this.resumeList = data.resumeInfo;
                            this.pageSum = data.pageSum;
                        }
                    })
            },
            employ(id){/*录用调的接口*/
                this.$ajax.get("/employ",{
                    params:{
                        id,
                        userNum:localStorage.userNum
                    }
                }).then(data=>{
                    if(data.ok===1){
                        this.getResumeList(this.pageIndex);
                        this.$message({
                            type: 'success',
                            message: data.msg
                        });
                    }else{
                        this.getResumeList(this.pageIndex);
                        this.$message({
                            type: 'success',
                            message: data.msg
                        });
                    }
                })
            },
            notPass(id){/*不录用调的接口*/
                this.$ajax.get("/notPass",{
                    params:{
                        id
                    }
                }).then(data=>{
                    if(data.ok===1){
                        this.getResumeList(this.pageIndex);
                        this.$message.error(data.msg);
                    }
                })
            }
        },
        mounted(){
            this.getResumeList(1)
        }
    }
</script>

<style scoped>

</style>
