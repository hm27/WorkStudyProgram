const express=require("express");
const bodyParser=require('body-parser');
const admin = require("./router/admin");
const recruit = require("./router/recruit");
const userList = require("./router/userList");
const news = require("./router/news");
const app=express();
app.use(express.static('./upload'));
app.use(bodyParser.json());//接收json格式的数据
// app.use(bodyParser.urlencoded({
//     extends:false//接收像get形式传过来的参数，加个header
// }))
app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","DELETE");
    res.header("Access-Control-Allow-Headers","content-type");
    next();
});

/***************************后台************************************/
/*后台管理系统登录*/
app.get('/login',admin.login);
/*得到管理员登录日志*/
app.get("/getAdminLogList",admin.getAdminLogList);
/*管理员日志删除操作*/
app.delete("/adminLogList",admin.adminLogList);
/*全天工作添加*/
app.post("/addAllWrok",recruit.addAllWrok);
/*获取全天工作列表*/
app.get("/getAllWorkList",recruit.getAllWorkList);
/*删除全看工作列表中的工作*/
app.get("/delAllWork",recruit.delAllWork);
/*编辑全天的工作*/
app.get('/upgetAllWork',recruit.upgetAllWork);
/*更新全天工作列表*/
app.post("/updateAllWork",recruit.updateAllWork);
/*小时工工作添加*/
app.post("/addHourWork",recruit.addHourWork);
/*获取小时工工作列表*/
app.get("/getHourWorkList",recruit.getHourWorkList);
/*删除小时工记录*/
app.get("/delHourWork",recruit.delHourWork);
/*编辑小时工获取数据*/
app.get("/upgetHourWork",recruit.upgetHourWork);
/*更新小时工列表*/
app.post('/updateHourWork',recruit.updateHourWork);

/*获取申请岗位学生信息的列表*/
app.get('/getResumeList',recruit.getResumeList);

/*录用接口*/
app.get("/employ",recruit.employ);

/*获取录用列表*/
app.get("/getPassList",recruit.getPassList);

/*不适合学生操作*/
app.get('/notPass',recruit.notPass);

/*获取不适合学生信息列表*/
app.get('/getNotPassList',recruit.getNotPassList);

/*获取派出人员列表*/
app.get("/getWorkingList",recruit.getWorkingList);

/*将录用表的人员标记为工作完成*/
app.get("/completeWork",recruit.completeWork);
/*将录用的人员，没有参加工作的标记为旷工*/
app.get("/notFinished",recruit.notFinished);

/*轮播图添加内容接口*/
app.post("/addPicTitle",news.addPicTitle);

/*获取轮播图接口*/
app.get("/getPicTitleList",news.getPicTitleList);
/*添加新闻要事*/
app.post('/addNews',news.addNews);
/*获取新闻列表*/
app.get("/getNews",news.getNews);

/*删除不合适人的列表*/
app.get("/notPassDetele",recruit.notPassDetele);

/***************************前台************************************/
/*学生登录*/
app.get("/userLogin",userList.userLogin);
/*获取前台全天工作的列表*/
app.get("/getQAllWorkList",recruit.getQAllWorkList);
/*简历传过来的接口*/
app.post("/ApplyPost",recruit.ApplyPost);

/*简历传过来小时工*/
app.post("/xApplyPost",recruit.xApplyPost);

/*获取前台小时工工作列表*/
app.get("/getQHourWorkList",recruit.getQHourWorkList);

/*获取学生申请岗位的记录*/
app.get("/getApplyMsg",recruit.getApplyMsg);

/*获取上班打卡时间*/
app.get("/getGoTime",recruit.getGoTime);
/*获取下班打卡时间*/
app.get("/getOffTime",recruit.getOffTime);
/*前端获取轮播图*/
app.get("/getLunBoPic",news.getLunBoPic);

/*前端获取新闻列表*/
app.get("/getNewsList",news.getNewsList);

/*获取全天工工作列表前端*/
app.get("/getAllDayWorkList",recruit.getAllDayWorkList);
/*获取小时工工作列表前端*/
app.get("/getHourDayWorkList",recruit.getHourDayWorkList);
/*前端获取新闻列表*/
app.get("/getQNewsList",news.getQNewsList);
/*获取学生被录用工作的信息*/
app.get("/getWorkClockList",recruit.getWorkClockList);
/*上班打卡*/
app.get("/goToWork",recruit.goToWork);
/*下班打卡*/
app.get("/goOffWork",recruit.goOffWork);

/*获取学生信息*/
app.get("/getUserInfo",userList.getUserInfo);
app.listen(80,function(){
    console.log("服务开启成功");
})