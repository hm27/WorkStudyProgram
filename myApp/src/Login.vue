<template>
    <div class="wrap-Login2">
        <div class="signinpanel">
            <el-form  class="login-container" ref="loginForm" :rules="rules" :model="loginForm">
                <h3>管理员登录</h3>
                <p class="m-t-md">勤工助学管理系统后台登录</p>
                <el-form-item prop="adminName">
                    <el-input type="text" ref="adminName" v-model="loginForm.adminName"  placeholder="管理员账号"></el-input>
                </el-form-item>

                <el-form-item  prop="adminPwd">
                    <el-input type="password" v-model="loginForm.adminPwd" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="isLoading"  style="width: 100%;" @click="submitForm('loginForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>

</template>

<script>
    export default {
        name: "Login",
        data(){
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return{
                isLoading:false,
                rules:{
                    adminName:[
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 2, message: '用户名至少2个字符', trigger: 'blur' }
                    ],
                    adminPwd:[
                        { validator: validatePass, trigger: 'blur' },
                        { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                    ]
                },
                loginForm:{
                    adminName:"",
                    adminPwd:''
                }
            }
        },
        methods:{
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.isLoading=true;
                        var _this=this;
                        this.$store.dispatch("login",{
                            adminName:this.loginForm.adminName,
                            adminPwd:this.loginForm.adminPwd,
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

<style >
    *{
        margin: 0;
        padding: 0;
    }
    .wrap-Login2{
        background: url("./assets/home-bg.jpg") no-repeat center top;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .login-container{
        width: 350px;
        background: #fff;
        border: 1px solid rgba(255,255,255,.3);
        border-radius: 3px;
        padding: 30px;
        color: #666;
        box-shadow: 0 3px 0 rgba(12, 12, 12, 0.03);
        float: right;
    }
    .login-container h3{
        text-align: center;
        color: #333333;
        font-size: 24px;
        font-family: "microsoft yahei";
        font-weight: 400;
        margin-top: 5px;
    }
    .signinpanel{
        width: 912px;
        margin: 10% auto 0 auto;
    }
    .m-t-md{
        text-align: center;
        margin: 0 0 10px;
        margin-top: 20px;
    }
</style>
