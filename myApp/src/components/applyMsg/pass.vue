<template>
    <div>
        <div>
            <el-table
                border
                :data="passList"
                style="width: 100%;">
                <el-table-column
                    width="80px"
                    label="姓名" >
                    <template slot-scope="scope">
                        {{scope.row.aName}}
                    </template>
                </el-table-column>
                <el-table-column width="100px"  label="年级">
                    <template slot-scope="scope">
                        {{scope.row.aGrade}}
                    </template>
                </el-table-column>
                <el-table-column  label="学号">
                    <template slot-scope="scope">
                        {{scope.row.aNum}}
                    </template>
                </el-table-column>
                <el-table-column  label="工作经验">
                    <template slot-scope="scope">
                        {{scope.row.aWrokexp}}
                    </template>
                </el-table-column>
                <el-table-column  label="应聘工作">
                    <template slot-scope="scope">
                        {{scope.row.aPost}}
                    </template>
                </el-table-column>
                <el-table-column  label="工作时间">
                    <template slot-scope="scope">
                        {{scope.row.aTime | date}} - {{scope.row.aTime2 | date}}
                    </template>
                </el-table-column>
                <el-table-column  label="学生电话">
                    <template slot-scope="scope">
                        {{scope.row.phone}}
                    </template>
                </el-table-column>
                <el-table-column  label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="completeWork(scope.row._id,scope.row.aName)">完成</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="notFinished(scope.row._id,scope.row.aName)">旷工</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="toolbar">
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="getPassList"
                :page-count="pageSum"
                :current-page.sync="pageIndex"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "pass",
        data(){
            return{
                pageIndex:1,
                pageSum:1,
                passList:[]
            }
        },
        methods:{
            getPassList(pageIndex){/*录用人员表*/
                this.$ajax.get("/getPassList",{
                    params:{
                        pageIndex
                    }
                }).then(data=>{
                    if(data.ok===1){
                        this.passList = data.passInfo;
                        this.pageSum = data.pageSum;
                    }
                })
            },
            completeWork(id,aName){/*工作完成*/
                this.$ajax.get("/completeWork",{
                    params:{id,aName}
                }).then(data=>{
                    if(data.ok === 1){
                        this.getPassList(this.pageIndex);
                        this.$message({
                            type: 'success',
                            message: data.msg
                        });
                    }else{
                        this.$message.error(data.msg);
                    }
                })
            },
            notFinished(id,aName){/*旷工*/
                this.$ajax.get("/notFinished",{
                    params:{id,aName}
                }).then(data=>{
                    if(data.ok === 1){
                        this.getPassList(this.pageIndex);
                        this.$message.error(data.msg);
                    }else{
                        this.$message.error(data.msg);
                    }
                })
            }
        },
        mounted(){
            this.getPassList(1);
        }
    }
</script>

<style scoped>

</style>
