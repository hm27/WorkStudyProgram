import axios from 'axios'
import Vue from "vue";
var vue=new Vue();
export default {
    state:{
        adminId:localStorage.adminId||null,
        adminName:localStorage.adminName || null
    },
    mutations:{
        CHANGE_ADMININFO(state,info){
            state.adminId = localStorage.adminId = info.adminId;
            state.adminName = localStorage.adminName = info.adminName;
        },
        /*退出登录后台*/
        OUT_LOGIN(state){
            localStorage.clear();
            state.adminId = localStorage.adminId;
            state.adminName = localStorage.adminName;
            vue.$message({
                message:"退出成功",
                type: 'success'
            });
        }
    },
    getters:{

    },
    actions:{
        login({commit,state,getter},{adminName,adminPwd,success,error}){
            axios.get("/login",{
                params:{
                    adminName,
                    adminPwd
                }
            }).then(data=>{
                if(data.ok === 1){
                    commit("CHANGE_ADMININFO",data);
                    success(data.msg)//回调函数
                }else{
                    error(data.msg)
                }
            })
        }
    }
}
