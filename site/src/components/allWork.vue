<template>
    <div class="wrap">
        <div class="title">
            <div  class="title-left"></div>
            <div  class="title-right">周末工作
                <div class="title-con">换一批 >></div>
            </div>
        </div>
        <div class="wrap-aWork" v-for="item in wrokList">
            <div class="aWork-top" >
                <p>
                    <img src="../assets/main_1.png" alt="">
                </p>
                <p>{{item.aPost}}</p>
                <p>
                    <img src="../assets/more.gif" alt="">
                </p>
                <p></p>
            </div>
            <div class="wrok-det">
                <p>工作地点:{{item.aWhere}}</p>
                <p>薪资:{{item.aSalary}} /天</p>
                <p>工作时间:{{item.aTime |date}} - {{item.aTime2 |date}}</p>
                <p style="white-space: pre-wrap;">工作内容:{{item.aContent}}</p>
                <p>联系人电话:{{item.aNumber}}</p>
                <p>招聘人数:{{item.aRecruits}}</p>
            </div>
            <div class="btn"><button @click="openPost(item._id,item.aPost,item.aContent,item.aTime,item.aTime2,item.aSalary)">申请岗位</button></div>
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
                    <el-button type="primary" @click="ApplyPost">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "allWork",
        data(){
            return{
                wrokList:[],
                FormVisible:false,
                formLabelWidth: '120px',
                workId:"",
                aSalary:"",
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
            /*获取工作岗位列表*/
            getQAllWorkList(){
                this.$ajax.get("/getQAllWorkList")
                    .then(data=>{
                        if(data.ok === 1){
                            this.wrokList = data.wrokList
                        }
                    })
            },
            openPost(id,aPost,aContent,aTime,aTime2,aSalary){/*打开弹窗，并把数据给上去*/
                this.workId = id;
                this.aSalary = aSalary;
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
                        this.form.aPost = aPost;
                        this.form.aContent = aContent;
                        this.form.aTime = format(aTime);
                        this.form.aTime2 = format(aTime2);
                    }
                })
                this.FormVisible = true;
            },
            ApplyPost(){/*申请岗位*/
                if(this.form.aWrokexp.length>0 || this.form.phone.length>1){
                    this.$ajax.post("/ApplyPost",{
                        type:1,
                        workId:this.workId,
                        aSalary:this.aSalary,
                        aName:this.form.aName,
                        aNum:this.form.aNum,
                        aGrade:this.form.aGrade,
                        aPost:this.form.aPost,
                        aContent:this.form.aContent,
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
            this.getQAllWorkList();
        }
    }
</script>


<style scoped>
.wrap-aWork{
    width: 320px;
    margin-bottom: 10px;
    /*border: #b2b2b5 1px dotted;*/
    /*border: 1px solid #000;*/
    /*border-bottom:#b2b2b5 1px dotted ;*/
}
    .aWork-top{
        height: 36px;
        width: 320px;
    }
    .aWork-top p{
        float: left;
    }
    .aWork-top p:first-child img{
        width: 61px;
        height: 32px;
    }
    .aWork-top p:nth-child(2){
        width: 131px;
        line-height: 36px;
        color: #181818;
        font-size: 14px;
        font-weight: bold;
        background: url('../assets/main_2.png');
    }
    .aWork-top p:nth-child(3){
        width: 108px;
        background:url("../assets/main_3.png") ;
        height: 36px;
    }
    .aWork-top p:nth-child(3) img{
        width: 46px;
        height: 14px;
        float: right;
        margin-top: 10px;
        cursor: pointer;
    }
    .aWork-top p:last-child{
        width: 20px;
        height: 32px;
        background: url("../assets/main_4.png");
    }
    .wrok-det{
        padding: 5px;
        color: #222;
        font-size: 14px;
        line-height: 25px;
    }
    .btn{
        height: 34px;
    }
    .btn button{
        float: right;
        width: 97px;
        height: 36px;
        background:#3bacdb;
        color: #fff;
        border: 1px solid #3bacdb;
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
        cursor: pointer;
    }
    .title{
        width: 330px;
        height: 60px;
        margin-bottom: 5px;
    }
    .title-left{
        float: left;
        width: 47px;
        height: 60px;
        background: url("../../static/main_08.jpg") no-repeat left top;
    }
    .title-right{
        float: left;
        height: 60px;
        line-height: 60px;
        width: 283px;
        background: url("../../static/main_09.jpg");
        color: #4b4b4b;
        font-weight: 700;
        position: relative;
    }
    .line{
        text-align: center;
    }
    .title-con{
        position: absolute;
        right: 0;
        top: 0;
        line-height: 60px;
        cursor: pointer;
        font-weight: 500;
        padding-right: 10px;
    }
</style>
