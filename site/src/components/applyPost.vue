<template>
    <div class="warp">
        <div class="ji" v-for="item in applyMsg">
            <div class="ji-fl">
                <a href="" class="ji-item-info-jobName">{{item.aPost}}</a>
                <p>{{item.aTime | date}} - {{item.aTime2 | date}}</p>
                <a href="" class="ji-item-info-companyName">{{item.aContent}}</a>
            </div>
            <div class="ji-fr">
                <p>{{grade[item.oper]}}</p>
                <div>
                    <span>{{item.addTime}}</span>
                </div>
            </div>
        </div>
        <div class="ji-not"  v-if="applyMsg.length<1">
        <p class="notApply">没有记录，好可怕 ~~~</p>
        </div>
        <div class="foot">
            勤工助学管理系统
        </div>
    </div>
</template>

<script>
    export default {
        name: "applyPost",
        data(){
            return{
                applyMsg:[],
                grade:{}
            }
        },
        methods:{/*学生申请岗位的所有记录*/
            getApplyMsg(){
                this.$ajax.get("/getApplyMsg",{
                    params:{
                        userNum:localStorage.userNum
                    }

                }).then(data=>{
                    if(data.ok===1){
                        this.applyMsg = data.applyMsg;
                        this.grade = data.grade;
                    }
                })
            }
        },
        mounted(){
            this.getApplyMsg();
        }
    }
</script>

<style scoped>
.warp{
    width: 950px;
    margin: auto;
}
    .ji{
        width: 925px;
        height: 142px;
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
        padding: 31px 25px 31px 0;
        display: block;
        text-align: right;
    }
    .ji-fr p{
        font-size: 14px;
        color: #666;
        height: 47px;
    }
    .ji-fr div span{
        margin-top: 11px;
        display: inline-block;
        font-size: 14px;
        color: #999;
    }
    .ji-item-info-jobName{
        margin-top: 30px;
        display: block;
        font-size: 18px;
        color: #333;
        text-decoration: none;
    }
    .ji-fl p{
        margin: 8px 0 9px;
        font-size: 18px;
        color: #000;
        font-weight: 600;
    }
    .ji-item-info-companyName{
        display: block;
        font-size: 14px;
        color: #999;
        margin-bottom: 29px;
        text-decoration: none;
    }
    .ji-not{
        width: 925px;
        height: 142px;
        padding-left:25px;
        border-top: 1px solid #ededed;
        background: #fff;
    }
    .notApply{
        margin: auto;
        width: 400px;
        line-height: 142px;
    }
</style>
