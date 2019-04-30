<template>
    <div>
        <div>
            <el-table
                border
                :data="notPassList"
                style="width: 100%;">
                <el-table-column
                    label="姓名" >
                    <template slot-scope="scope">
                        {{scope.row.aName}}
                    </template>
                </el-table-column>
                <el-table-column  label="年级">
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
                <el-table-column  label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="notPassDetele(scope.row._id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="toolbar">
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="getNotPassList"
                :page-count="pageSum"
                :current-page.sync="pageIndex"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "notPass",
        data(){
            return{
                notPassList:[],
                pageIndex:1,
                pageSum:1
            }
        },
        methods:{
            getNotPassList(pageIndex){/*不适合学生信息列表*/
                this.$ajax.get("/getNotPassList",{
                    params:{
                        pageIndex
                    }
                }).then(data=>{
                    if(data.ok===1){
                        this.notPassList = data.notPassInfo;
                        this.pageSum = data.pageSum;
                    }
                })
            },
            notPassDetele(id){/*将不合适的人删除*/
                this.$ajax.get("/notPassDetele",{
                    params:{
                        id
                    }
                }).then(data=>{
                    if(data.ok === 1){
                        this.getNotPassList(this.pageIndex);
                        this.$message({
                            type: 'success',
                            message: data.msg
                        });
                    }
                })

            }
        },
        mounted(){
            this.getNotPassList(1);
        }
    }
</script>

<style scoped>

</style>
