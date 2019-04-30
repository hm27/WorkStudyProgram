<template>
    <div>
        <div class="toolbar">
            <el-form :inline="true" :model="formInline"  class="demo-form-inline">
                <el-form-item label="工作岗位">
                    <el-input placeholder="查询想做的岗位" v-model="formInline.post"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="dialogFormVisible=true">添加工作岗位</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table
            :border="border"
            :data="allWorkList"
            style="width: 100%;">
            <el-table-column
                width="80px"
                label="工作岗位" >
                <template slot-scope="scope">
                    {{scope.row.aPost}}
                </template>
            </el-table-column>
            <el-table-column  label="工作时间">
                <template slot-scope="scope">
                    {{scope.row.aTime | date}} - {{scope.row.aTime2 | date}}
                </template>
            </el-table-column>
            <el-table-column  label="工作地点">
                <template slot-scope="scope">
                    {{scope.row.aWhere}}
                </template>
            </el-table-column>
            <el-table-column
                width="80px"
                label="薪资/天">
                <template slot-scope="scope">
                  {{scope.row.aSalary}}
                </template>
            </el-table-column>
            <el-table-column  label="工作内容">
                <template slot-scope="scope">
                   {{scope.row.aContent}}
                </template>
            </el-table-column>
            <el-table-column width="120px" label="联系人电话">
                <template slot-scope="scope">
                    {{scope.row.aNumber}}
                </template>
            </el-table-column>
            <el-table-column  width="80px" label="招聘人数">
                <template slot-scope="scope">
                   {{scope.row.aRecruits}}
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
        <div class="toolbar">
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="getAllWorkList"
                :page-count="pageSum"
                :current-page.sync="pageIndex"
            >
            </el-pagination>
        </div>
        <div><!--添加工作岗位的弹窗-->
            <el-dialog title="添加工作岗位" :visible.sync="dialogFormVisible">
                <el-form :model="form" ref="form">
                    <el-form-item label="工作岗位" :label-width="formLabelWidth">
                        <el-input v-model="form.aPost" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="工作时间" :label-width="formLabelWidth">
                        <el-col :span="11">
                            <el-input type="text" placeholder="工作开始时间" v-model="form.aTime"  style="width: 100%;"></el-input>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-input type="text" placeholder="工作结束时间" v-model="form.aTime2"  style="width: 100%;"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="工作地点" :label-width="formLabelWidth">
                        <el-input v-model="form.aWhere" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="薪资/天" :label-width="formLabelWidth">
                        <el-input v-model="form.aSalary" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="工作内容" :label-width="formLabelWidth">
                    <el-input v-model="form.aContent" auto-complete="off"></el-input>
                </el-form-item>
                    <el-form-item label="联系人电话" :label-width="formLabelWidth">
                    <el-input v-model="form.aNumber" auto-complete="off"></el-input>
                </el-form-item>
                    <el-form-item label="招聘人数" :label-width="formLabelWidth">
                        <el-input v-model.number="form.aRecruits" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addAllWrok('form')">确 定</el-button>
                </div>
            </el-dialog>
        </div>
        <div><!--编辑工作岗位的弹窗-->
            <el-dialog title="编辑工作岗位" :visible.sync="upFormVisible">
                <el-form :model="form">
                    <el-form-item label="工作岗位" :label-width="formLabelWidth">
                        <el-input v-model="form.aPost" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="工作时间" :label-width="formLabelWidth">
                        <el-col :span="11">
                            <el-input type="text" placeholder="工作开始时间" v-model="form.aTime"  style="width: 100%;"></el-input>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <el-input type="text" placeholder="工作结束时间" v-model="form.aTime2"  style="width: 100%;"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="工作地点" :label-width="formLabelWidth">
                        <el-input v-model="form.aWhere" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="薪资/天" :label-width="formLabelWidth">
                        <el-input v-model="form.aSalary" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="工作内容" :label-width="formLabelWidth">
                        <el-input v-model="form.aContent" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人电话" :label-width="formLabelWidth">
                        <el-input v-model="form.aNumber" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="招聘人数" :label-width="formLabelWidth">
                        <el-input v-model.number="form.aRecruits" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="upFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="updateAllWork">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "allDayWork",
        data(){
            return{
                pageSum:1,
                border:true,
                dialogFormVisible:false,
                formLabelWidth: '120px',
                allWorkList:[],
                upFormVisible:false,
                pageIndex:1,
                workId:"",
                form:{
                    aPost:'',
                    aTime:'',
                    aWhere:'',
                    aSalary:'',
                    aContent:'',
                    aNumber:'',
                    aRecruits:'',
                    aTime2:""
                },
                formInline:{
                    post:''
                }
            }
        },
        methods:{
            addAllWrok(form){
                this. dialogFormVisible = false;
                this.$ajax.post("/addAllWrok",{
                    aPost:this.form.aPost,
                    aTime:this.form.aTime,
                    aTime2:this.form.aTime2,
                    aWhere:this.form.aWhere,
                    aSalary:this.form.aSalary,
                    aContent:this.form.aContent,
                    aNumber:this.form.aNumber,
                    aRecruits:this.form.aRecruits
                }).then(data=>{
                   if(data.ok ===1){
                       this.getAllWorkList(this.pageIndex);
                       this.$message({
                           type: 'success',
                           message: data.msg
                       });
                   }else{
                       this.$message.error(data.msg);
                   }
                })
            },
            getAllWorkList(pageIndex){
                this.$ajax.get("/getAllWorkList",{
                    params:{
                        pageIndex
                    }
                })
                    .then(data=>{
                        if(data.ok === 1){
                            this.pageSum = data.pageSum;
                            this.allWorkList = data.workInfo;
                        }else{
                            alert("获取工作列表失败");
                        }
                    })
            },
            handleEdit(id){
                this.workId = id;
                this.upFormVisible = true;
                this.$ajax.get("/upgetAllWork",{
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
                        this.form.aPost = data.wrokInfo.aPost;
                        this.form.aTime = format(data.wrokInfo.aTime);
                        this.form.aTime2 = format(data.wrokInfo.aTime2);
                        this.form.aWhere = data.wrokInfo.aWhere;
                        this.form.aSalary = data.wrokInfo.aSalary;
                        this.form.aContent = data.wrokInfo.aContent;
                        this.form.aNumber = data.wrokInfo.aNumber;
                        this.form.aRecruits = data.wrokInfo.aRecruits;
                    }
                })
            },
            handleDelete(id){
                this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$ajax.get("/delAllWork",{
                        params:{
                            id
                        }
                    }).then(data=>{
                        if(data.ok === 1){
                            this.getAllWorkList(this.pageIndex)
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
            updateAllWork(){
                this.$ajax.post("/updateAllWork",{
                    workId :this.workId,
                    aPost:this.form.aPost,
                    aTime:this.form.aTime,
                    aWhere:this.form.aWhere,
                    aSalary:this.form.aSalary,
                    aContent:this.form.aContent,
                    aNumber:this.form.aNumber,
                    aRecruits:this.form.aRecruits
                }).then(data=>{
                    this.upFormVisible = false;
                    if(data.ok===1){
                        this.getAllWorkList(this.pageIndex);
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
            this.getAllWorkList(1);
        }
    }
</script>

<style scoped>
.line{
    text-align: center;
}
</style>
