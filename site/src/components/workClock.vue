<template>
    <div class="wrap">
        <div class="work-Clock" v-if="msg.length<1">
            <p class="work-title">{{$store.state.userList.userName}},工作内容如下: <span>(根据工作时间打卡，1个小时以内都可以)</span> </p>
            <div>工作岗位 : {{workList.aPost}}</div>
            <div>工作地点:{{workList.aWhere}}</div>
            <div>工作时间:{{workList.aTime | date}} - {{workList.aTime2 | date}}</div>
            <div>薪资:{{workList.aSalary}}</div>
            <div>工作内容:{{workList.aContent}}</div>
            <div class="div-btn">
                <button class="btn" @click="goToWork(workList.type,workList.workId,workList.aTime)">上班打卡</button>
                <span v-if="stimes">{{stimes}}</span>
                <button class="btn" @click="goOffWork(workList.workId,workList.aTime2)">下班打卡</button>
                <span v-if="xtimes">{{xtimes }}</span>
                <span class="btn3" v-if="xtimes">恭喜你,工作完成</span>
            </div>
        </div>
        <div class="work" v-if="msg">
            <p >{{msg}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "workClock",
        data(){
            return{
                workList:{},
                msg:"",
                stimes:"",
                xtimes:""

            }
        },
        methods:{
            getWorkClockList(){/*获取学生被录用工作的信息*/
                this.$ajax.get("/getWorkClockList",{
                    params:{
                        userNum:localStorage.userNum
                    }
                }).then(data=>{
                    if(data.ok===1){
                        this.workList = data.workInfo;
                    }else {
                        this.msg = data.msg;
                    }
                })
            },
            goToWork(type,workId,Time){/*上班打卡*/
                /*先判断打卡时间是不是在打卡范围内，1个小时之内可以打卡*/
                var timestamp=new Date().getTime();/*当前时间戳*/
                /*Time是正确打卡时间*/
                if(Time - timestamp <= 60*60*1000 && Time - timestamp > 0){/*提前1小时打卡，记录正常工作时间*/
                    this.$ajax.get("/goToWork",{
                        params:{
                            type,
                            ident:1,/*标记打卡时间应该怎么加入1、记录工作开始时间，2、记录打卡时间*/
                            workId,
                            timestamp,/*打卡时间*/
                            userName:localStorage.userName
                        }
                    }).then(data=>{
                        if(data.ok===1){
                            this.$message({
                                type: 'success',
                                message: data.msg
                            });
                        }else{
                            this.$message.error(data.msg);
                        }
                    })
                }else if(Time - timestamp > 60*60*1000){/*提前超过1小时，不可以打卡*/
                    this.$message.error("还有到工作时间，提前一小时可以打卡！");
                }else{/*上班以后打卡，记录打卡时间*/
                    this.$ajax.get("/goToWork",{
                        params:{
                            type,
                            ident:2,/*标记打卡时间应该怎么加入1、记录工作开始时间，2、记录打卡时间*/
                            workId,
                            timestamp,/*打卡时间*/
                            userName:localStorage.userName
                        }
                    }).then(data=>{
                        if(data.ok===1){
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
            goOffWork(workId,Time2){/*下班打卡*/
                /*先判断打卡时间是不是在打卡范围内*/
                var timestamp=new Date().getTime();/*当前时间戳*/
                /*Time2是正确打卡时间*/
                if(Time2 - timestamp > 0){/*大于0还没到下班时间,早退*/
                   this.$ajax.get("/goOffWork",{
                       params:{
                           workId,
                           Time2,
                           timestamp,
                           userName:localStorage.userName,
                           ident:2,/*标记打卡时间应该怎么加入1、记录工作开始时间，2、记录打卡时间*/
                       }
                   }).then(data=>{
                       if(data.ok === 1){
                           this.getOffTime();
                           this.$message({
                               type: 'success',
                               message: data.msg
                           });
                       }else{
                           this.$message.error(data.msg);
                       }
                   })
                }else{/*其他时间都是下班时间*/
                    this.$ajax.get("/goOffWork",{
                        params:{
                            workId,
                            Time2,
                            timestamp,
                            userName:localStorage.userName,
                            ident:1,/*标记打卡时间应该怎么加入1、记录工作开始时间，2、记录打卡时间*/
                        }
                    }).then(data=>{
                        if(data.ok === 1){
                            this.getOffTime();
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
            getGoTime(){/*获取上班打卡时间*/
                this.$ajax.get("/getGoTime",{
                    params:{
                        userName:localStorage.userName
                    }
                }).then(data=>{
                    if(data.ok === 1){
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
                        this.stimes = format(data.Time);
                    }
                })
            },
            getOffTime(){/*获取下班打卡时间*/
                this.$ajax.get("/getOffTime",{
                    params:{
                        userName:localStorage.userName
                    }
                }).then(data=>{
                    if(data.ok === 1){
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
                        this.xtimes = format(data.Time);
                    }
                })
            }
        },
        mounted(){
            this.getWorkClockList();
            this.getGoTime();
            this.getOffTime();
        }
    }
</script>

<style scoped>
.wrap{
    width: 950px;
    margin: auto;
    background: #fff;
}
    .work-Clock{
        width: 950px;
        background: #fff;
    }
    .work-title{
        height: 28px;
        line-height: 30px;
        font-size: 18px;
        font-weight: 600;
        text-indent: 20px;
        margin: 5px 0 8px 0;
    }
    .work-title span{
        font-size: 16px;
        color: #000;
        font-weight: 500;
    }
    .work-Clock div{
        text-indent: 28px;
        font-size: 16px;
        line-height: 28px;
        position: relative;
    }
    .div-btn{
        /*background: #f00;*/
        height: 50px;
        text-align: left;
        padding-right: 40px;
        margin-top: 15px;
    }
    .btn{
        width: 97px;
        height: 36px;
        background:#3bacdb;
        color: #fff;
        border: 1px solid #3bacdb;
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
        cursor: pointer;
        margin: 0px 10px;
    }
    .btn3{
        /*height: 40px;*/
        display: inline-block;
        position: absolute;
        right: 20px;
        bottom: 20px;
    }
    .work{
        width: 950px;
        height: 140px;
        background: #fff;
    }
.work p{
    font-size: 16px;
    line-height: 140px;
    height: 140px;
    text-align: center;
}
</style>
