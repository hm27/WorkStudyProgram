<template>
    <div>
        <div class="toolbar">
            <el-form :inline="true"  class="demo-form-inline">
                <el-form-item label="工作岗位">
                    <el-input placeholder="查询想做的岗位"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="dialogFormVisible=true">添加小时工工作岗位</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-table
                border
                :data="hourWorkList"
                style="width: 100%;">
                <el-table-column
                    width="130px"
                    label="工作岗位" >
                    <template slot-scope="scope">
                        {{scope.row.hPost}}
                    </template>
                </el-table-column>
                <el-table-column  label="工作时间段">
                    <template slot-scope="scope">
                        {{scope.row.hTime | date}} - {{scope.row.hTime2 | date}}
                    </template>
                </el-table-column>
                <el-table-column  label="工作地点">
                    <template slot-scope="scope">
                        {{scope.row.hWhere}}
                    </template>
                </el-table-column>
                <el-table-column width="80px" label="薪资/时">
                    <template slot-scope="scope">
                        {{scope.row.hSalary}}
                    </template>
                </el-table-column>
                <el-table-column  label="工作内容">
                    <template slot-scope="scope">
                        {{scope.row.hContent}}
                    </template>
                </el-table-column>
                <el-table-column width="115px" label="联系人电话">
                    <template slot-scope="scope">
                        {{scope.row.hNumber}}
                    </template>
                </el-table-column>
                <el-table-column width="80px" label="招聘人数">
                    <template slot-scope="scope">
                        {{scope.row.hRecruits}}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.row._id)">编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row._id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="toolbar">
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="getHourWorkList"
                :page-count="pageSum"
                :current-page.sync="pageIndex"
            >
            </el-pagination>
        </div>
        <div><!--添加工作岗位的弹窗-->
            <el-dialog title="添加小时工工作岗位" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="工作岗位" :label-width="formLabelWidth">
                        <el-input v-model="form.hPost" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="工作时间" :label-width="formLabelWidth">
                        <el-col :span="11">
                            <el-input type="text" placeholder="工作开始时间" v-model="form.hTime"  style="width: 100%;"></el-input>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-input type="text" placeholder="工作结束时间" v-model="form.hTime2"  style="width: 100%;"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="工作地点" :label-width="formLabelWidth">
                        <el-input v-model="form.hWhere" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="薪资/时" :label-width="formLabelWidth">
                        <el-input v-model="form.hSalary" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="工作内容" :label-width="formLabelWidth">
                        <el-input v-model="form.hContent" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人电话" :label-width="formLabelWidth">
                        <el-input v-model="form.hNumber" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="招聘人数" :label-width="formLabelWidth">
                        <el-input v-model.number="form.hRecruits" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addHourWork">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div><!--编辑工作岗位的弹窗-->
            <el-dialog title="编辑小时工工作岗位" :visible.sync="upFormVisible">
                <el-form :model="form">
                    <el-form-item label="工作岗位" :label-width="formLabelWidth">
                        <el-input v-model="form.hPost" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="工作时间" :label-width="formLabelWidth">
                        <el-col :span="11">
                            <el-input type="text" placeholder="工作开始时间" v-model="form.hTime"  style="width: 100%;"></el-input>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-input type="text" placeholder="工作结束时间" v-model="form.hTime2"  style="width: 100%;"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="工作地点" :label-width="formLabelWidth">
                        <el-input v-model="form.hWhere" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="薪资/时" :label-width="formLabelWidth">
                        <el-input v-model="form.hSalary" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="工作内容" :label-width="formLabelWidth">
                        <el-input v-model="form.hContent" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人电话" :label-width="formLabelWidth">
                        <el-input v-model="form.hNumber" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="招聘人数" :label-width="formLabelWidth">
                        <el-input v-model.number="form.hRecruits" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="upFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateHourWork">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "hourlyWorker",
        data(){
            return{
                dialogFormVisible:false,
                formLabelWidth: '120px',
                hourWorkList:[],
                workId:"",
                pageSum:1,
                pageIndex:1,
                upFormVisible:false,
                form:{
                    hPost:'',
                    hTime:'',
                    hWhere:'',
                    hSalary:'',
                    hContent:'',
                    hNumber:'',
                    hRecruits:'',
                    hTime2:""
                }
            }
        },
        methods:{
            addHourWork(){
                this. dialogFormVisible = false;
                this.$ajax.post("/addHourWork",{
                    hPost:this.form.hPost,
                    hTime:this.form.hTime,
                    hTime2:this.form.hTime2,
                    hWhere:this.form.hWhere,
                    hSalary:this.form.hSalary,
                    hContent:this.form.hContent,
                    hNumber:this.form.hNumber,
                    hRecruits:this.form.hRecruits
                }).then(data=>{
                    if(data.ok ===1){
                        this.getHourWorkList(this.pageIndex);
                        this.$message({
                            type: 'success',
                            message: data.msg
                        });
                    }else{
                        this.$message.error(data.msg);
                    }
                })
            },
            getHourWorkList(pageIndex){
                this.$ajax.get("/getHourWorkList",{
                    params:{
                        pageIndex
                    }
                })
                    .then(data=>{
                        if(data.ok === 1){
                            this.pageSum = data.pageSum;
                            this.hourWorkList = data.workInfo;
                        }else{
                            alert("获取工作列表失败");
                        }
                    })
            },
            handleEdit(id){
                this.workId = id;
                this.upFormVisible = true;
                this.$ajax.get("/upgetHourWork",{
                    params:{
                        id
                    }
                }).then(data=>{
                    if(data.ok === 1){
                        function add0(m){return m<10?'0'+m:m }
                        function format(shijianchuo) {
//shijianchuo是整数，否则要parseInt转换
                            var time = new Date(shijianchuo);
                            var y = time.getFullYear();
                            var m = time.getMonth()+1;
                            var d = time.getDate();
                            var h = time.getHours();
                            var mm = time.getMinutes();
                            var s = time.getSeconds();
                            return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
                        }
                        this.form.hPost = data.wrokInfo.hPost;
                        this.form.hTime = format(data.wrokInfo.hTime);
                        this.form.hTime2 = format(data.wrokInfo.hTime2);
                        this.form.hWhere = data.wrokInfo.hWhere;
                        this.form.hSalary = data.wrokInfo.hSalary;
                        this.form.hContent = data.wrokInfo.hContent;
                        this.form.hNumber = data.wrokInfo.hNumber;
                        this.form.hRecruits = data.wrokInfo.hRecruits;
                    }
                })
            },
            handleDelete(id){
                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$ajax.get("/delHourWork",{
                        params:{
                            id
                        }
                    }).then(data=>{
                        if(data.ok === 1){
                            this.getHourWorkList(this.pageIndex)
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
            },
            updateHourWork(){
                this.$ajax.post("/updateHourWork",{
                    workId :this.workId,
                    hPost:this.form.hPost,
                    hTime:this.form.hTime,
                    hWhere:this.form.hWhere,
                    hSalary:this.form.hSalary,
                    hContent:this.form.hContent,
                    hNumber:this.form.hNumber,
                    hRecruits:this.form.hRecruits
                }).then(data=>{
                    this.upFormVisible = false;
                    if(data.ok===1){
                        this.getHourWorkList(this.pageIndex);
                        this.$message({
                            type: 'success',
                            message: data.msg
                        });
                    }else{
                        this.$message.error(data.msg);
                    }
                })
            }
        },
        mounted(){
            this.getHourWorkList(1);
        }
    }
</script>

<style scoped>
.line{
    text-align: center;
}
</style>
