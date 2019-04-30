<template>
    <div>
        <div class="work-wrap">
            <div class="ji" v-for="item in hourDayWorkList">
                <div class="ji-fl">
                    <a href="" class="ji-item-info-jobName">{{item.hPost}}</a>
                    <p>薪资: {{item.hSalary}}/天</p>
                    <a href="" class="ji-item-info-companyName">{{item.hContent}}</a>
                </div>
                <div class="ji-fr">
                    <p>{{item.hWhere}}</p>
                    <div>
                        <span>{{item.hTime | date}} - {{item.hTime2 | date}}</span>
                    </div>
                    <button class="btn" @click="openPost(item._id,item.hPost,item.hContent,item.hTime,item.hTime2,item.hSalary)">申请岗位</button>
                </div>
            </div>
            <div class="foot">
                勤工助学管理系统
            </div>
        </div>

        <div><!--关于申请岗位信息的填写-->
            <el-dialog title="确认申请信息" :visible.sync="FormVisible">
                <el-form :model="form"  :rules="rules" >
                    <el-form-item label="姓名" :label-width="formLabelWidth">
                        <el-input v-model="form.aName" auto-complete="off" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="学号" :label-width="formLabelWidth">
                        <el-input v-model="form.aNum" auto-complete="off" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="年级" :label-width="formLabelWidth">
                        <el-input v-model="form.aGrade" auto-complete="off" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="申请的岗位" :label-width="formLabelWidth">
                        <el-input v-model="form.aPost" auto-complete="off" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="工作内容" :label-width="formLabelWidth">
                        <el-input v-model="form.aContent" auto-complete="off" readonly></el-input>
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
                    <el-form-item label="学生电话" :label-width="formLabelWidth" prop="phone">
                        <el-input ref="phone" maxlength="11" v-model.number="form.phone" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="工作经验" :label-width="formLabelWidth" prop="aWrokexp">
                        <el-input ref="aWrokexp" v-model="form.aWrokexp" auto-complete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="FormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="xApplyPost">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "hourDayWorkList",
        data(){
            return{
                hourDayWorkList:[],
                FormVisible:false,
                workId:"",
                hSalary:"",
                formLabelWidth:'120px',
                form:{
                    aName:"",
                    aNum:"",
                    aGrade:"",
                    aPost:"",
                    aContent:"",
                    aTime:"",
                    aTime2:"",
                    aWrokexp:"",
                    phone:""
                },
                rules:{
                    aWrokexp:[
                        { required: true, message: '请输入工作经验', trigger: 'blur' },
                    ],
                    phone:[
                        { required: true, message: '请输入联系方式', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            getHourDayWorkList(){/*获取小时工工作列表前端*/
                this.$ajax.get("/getHourDayWorkList")
                    .then(data=>{
                        if(data.ok === 1){
                            this.hourDayWorkList = data.hourDayWorkInfo
                        }
                    })
            },
            openPost(id,hPost,hContent,hTime,hTime2,hSalary){/*打开弹窗，并把数据给上去*/
                this.workId = id;
                this.hSalary = hSalary;
                this.$ajax.get("/getUserInfo",{
                    params:{
                        userNum:localStorage.userNum
                    }
                }).then(data=>{
                    if(data.ok===1){
                        /*将时间戳转化为时间*/
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
                        this.form.aName = data.userInfo.userName;
                        this.form.aNum = data.userInfo.userNum;
                        this.form.aGrade = data.userGrade[data.userInfo.userGrade];
                        this.form.aPost = hPost;
                        this.form.aContent = hContent;
                        this.form.aTime = format(hTime);
                        this.form.aTime2 = format(hTime2);
                    }
                })
                this.FormVisible = true;
            },
            xApplyPost(){/*申请岗位*/
                if(this.form.aWrokexp.length>0 || this.form.phone.length>1){
                    this.$ajax.post("/xApplyPost",{
                        type:2,
                        workId:this.workId,
                        aName:this.form.aName,
                        aNum:this.form.aNum,
                        aGrade:this.form.aGrade,
                        aPost:this.form.aPost,
                        aContent:this.form.aContent,
                        aSalary:this.hSalary,
                        aTime:this.form.aTime,
                        aTime2:this.form.aTime2,
                        aWrokexp:this.form.aWrokexp,
                        phone:this.form.phone
                    }).then(data=>{
                        this.FormVisible = false;
                        if(data.ok===1){
                            this.$message({
                                message: data.msg,
                                type: 'success'
                            });
                        }else{
                            this.$message.error(data.msg);
                        }
                    })
                }else{
                    this.$message.error('请输入工作经验或手机号! ');
                }
            }
        },
        mounted(){
            this.getHourDayWorkList();
        }
    }
</script>

<style scoped>
    .work-wrap{
        width: 950px;
        margin: auto;
        background: #fff;
    }
    .ji{
        width: 925px;
        height: 145px;
        /*background: pink;*/
        padding-left:25px;
        border-top: 1px solid #ededed;
        background: #fff;
    }
    .ji-fl{
        float: left;
    }
    .ji-fr{
        float: right;
        padding: 20px 25px 25px 0;
        display: block;
        text-align: right;
    }
    .ji-fr p{
        font-size: 14px;
        color: #666;
        height: 30px;
    }
    .ji-fr div span{
        margin-top: 11px;
        display: inline-block;
        font-size: 14px;
        color: #999;
    }
    .ji-item-info-jobName{
        margin-top: 20px;
        display: block;
        font-size: 18px;
        color: #333;
        text-decoration: none;
    }
    .ji-fl p{
        margin: 12px 0 15px;
        font-size: 18px;
        color: #ff5959;
        font-weight: 700;
    }
    .ji-item-info-companyName{
        display: block;
        font-size: 14px;
        width: 600px;
        color: #999;
        line-height: 24px;
        margin-bottom: 20px;
        text-decoration: none;
    }
    .btn{
        margin-top: 8px;
        width: 97px;
        height: 36px;
        background: #1787fb;
        color: #fff;
        border: 1px solid #1787fb;
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
        cursor: pointer;
    }
</style>
