<template>
    <div class="login-warp">
        <div class="lg-1">
            <h2 class="lg-logo">
                勤工助学管理系统
            </h2>
        </div>
        <div class="lg-content shadow">
            <div class="lg-con-rt">
                <h3 style="margin-bottom:0;" class="h3">
                    <span>
                        学生登录
                    </span>
                    <span>
                        <a href="http://localhost:8081/"> 管理员登录</a>
                    </span>
                </h3>
                <div class="border"></div>
                    <el-form  class="login-container" ref="loginForm" :rules="rules" :model="loginForm">
                        <div class="txt">
                            <el-form-item prop="userName">
                                <el-input type="text" ref="userName" v-model="loginForm.userName"  placeholder="请输入姓名"></el-input>
                            </el-form-item>

                            <el-form-item  prop="userNum">
                                <el-input type="text" v-model="loginForm.userNum" placeholder="请输入学号"></el-input>
                            </el-form-item>
                            <el-form-item label="年级" prop="userGrade" >
                                <el-select v-model="loginForm.userGrade" placeholder="请选择年级">
                                    <el-option label="15级" value="1"></el-option>
                                    <el-option label="16级" value="2"></el-option>
                                    <el-option label="17级" value="3"></el-option>
                                    <el-option label="18级" value="4"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="btn1 shadow">
                            <a href="javascript:void(0)" :loading="isLoading" @click="submitForm('loginForm')">登 录</a>
                        </div>

                    </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入学号'));
                } else {
                    callback();
                }
            };
            return{
                isLoading:false,
                rules:{
                    userName:[
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 2, message: '用户名至少2个字符', trigger: 'blur' }
                    ],
                    userNum:[
                        { validator: validatePass, trigger: 'blur' },
                        { min: 11, max: 11, message: '学号11位数', trigger: 'blur' }
                    ],
                    userGrade:[
                        { required: true, message: '请选择年级', trigger: 'change' }
                    ]
                },
                loginForm:{
                    userName:"",
                    userNum:'',
                    userGrade:''
                }
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.isLoading=true;
                        var _this=this;
                        this.$store.dispatch("userLogin",{
                            userName:this.loginForm.userName,
                            userNum:this.loginForm.userNum,
                            userGrade:this.loginForm.userGrade,
                            success(msg){
                                _this.$message({
                                    message: msg,
                                    type: 'success'
                                });
                                _this.isLoading=false;
                            },
                            error(msg){
                                _this.$message.error(msg);
                                _this.isLoading=false;

                            }
                        })
                    } else {
                        console.log('error submit!!');
                    }

                });
            },
        }
    }
</script>

<style scoped>
    .login-warp{
        background: url('./assets/bg-2000.jpg') no-repeat center top ;
        height: 100%;
        width: 100%;
    }
    .lg-1 {
        background: rgba(255,255,255,0.3);
        height: 77px;
        width: 100%;
        position: absolute;
        top: 0px;
        left: 0px

    }
    .lg-1 .lg-logo {
        color: #fff;
        font-size: 24px;
        font-weight: bold;
        letter-spacing: 2px;
        padding: 5px 10px;
        height: 77px;
        margin: 0;
        padding: 17px 35px;
    }
    .lg-content {
        position: absolute;
        left: 70%;
        top: 55%;
        margin-top: -200px;
        margin-left: -100px;
        z-index: 1;
        border-radius: 15px;
        width: 400px;
        min-height: 320px;
        background: none;
    }
    .shadow{
        box-shadow: 1px 2px 5px rgba(0, 0, 0, .28);
    }
    .lg-content .lg-con-lt {
        width: 698px;
        height: 523px;
        float: left; }
    .lg-content .lg-con-lt .lg-img {
        width: 466px;
        height: 352px;
        margin-top: 92px;
        margin-left: 150px; }
    .lg-content .lg-con-lt .lg-img img {
        border: 0;
        width: 466px;
        height: 352px;
        display: block; }
    .lg-content .lg-con-rt {
        border-radius: 15px;
        width: 400px;
        min-height: 320px;
        margin-top: -20px;
        z-index: 2;
        background: rgba(247,238,238,0.3);
        /*width: 504px;
        height: 523px;
        float: left;*/
    }
    .lg-con-rt h3{
        color: #696969;
        font-size: 22px;
        font-weight: normal;
        height: 60px;
        position: relative;
    }
    .lg-con-rt .border{
        width: 360px;
        height: 1px;
        margin: 0 auto;
        border: 1px #fff solid;
        background: #fff;
    }
    .txt{
        width: 340px;
        border-radius: 8px;
        background: #fff;
        margin: 0 auto;
        margin-top: 20px;
        padding: 5px 10px 5px;
    }
   .h3 span:first-child{
       position: absolute;
       left: 18px;
       bottom: 2px;
   }
    .h3 span:last-child a{
        position: absolute;
        right: 20px;
        bottom: 2px;
        color: #a10000;
        cursor: pointer;
    }
    .btn1{
        width: 360px;
        height: 50px;
        border-radius: 8px;
        background: #ad3b3d !important;
        margin: 35px auto 35px;
        text-align: center !important;
        line-height: 50px;
    }
    .btn1 a{
        color: #fff;
        font-size: 22px;
        display: block;
    }
</style>
