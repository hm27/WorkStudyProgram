import axios from 'axios'
import Vue from "vue";
var vue=new Vue();
export default {
    state:{
        userNum:localStorage.userNum||null,
        userName:localStorage.userName || null
    },
    mutations:{
        CHANGE_USERINFO(state,info){
            state.userNum = localStorage.userNum = info.userNum;
            state.userName = localStorage.userName = info.userName;
        },
        /*退出登录后台*/
        OUT_LOGIN(state){
            localStorage.clear();
            state.userNum = localStorage.userNum;
            state.userName = localStorage.userName;
            vue.$message({
                message:"退出成功",
                type: 'success'
            });
        }
    },
    getters:{

    },
    actions:{
        userLogin({commit,state,getter},{userName,userNum,userGrade,success,error}){
            axios.get("/userLogin",{
                params:{
                    userName,
                    userNum,
                    userGrade
                }
            }).then(data=>{
                if(data.ok === 1){
                    commit("CHANGE_USERINFO",data);
                    success(data.msg)//回调函数
                }else{
                    error(data.msg)
                }
            })
        }
    }
}
