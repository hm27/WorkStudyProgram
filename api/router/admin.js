const db=require('../modules/db');
const common = require("../modules/common");
const md5=require("md5");
module.exports.getAdminLogList=function(req,res){
    var keyWord = req.query.keyWord;
    var whereObj = {
        adminName:new RegExp(keyWord)
    }
    var pageIndex = req.query.pageIndex/1;
    var pageNum = 3;
    var pageSum = 1;
    db.count("adminLog",{},function(count){//分页
        pageSum = Math.ceil(count/pageNum);//总页数
        if(pageSum<0){
            pageSum=1
        }
        if(pageIndex>pageSum){
            pageIndex = pageSum
        }
        if(pageIndex<1){
            pageIndex = 1
        }
        db.getAdminLogList((pageIndex-1)*pageNum,pageNum,function(err,adminInfo){
            setTimeout(()=>{
                res.json({
                    ok: 1,
                    adminInfo,
                    pageSum
                })
            },100)
        })
    })

}

module.exports.adminLogList = function(req,res){
    db.deleteOneById("adminLog",req.query.id,function(err,results){
        if(results){
            res.json({
                ok : 1,
                msg:"删除成功"
            })
        }else{
            res.json({
                ok : 2,
                msg:"删除失败"
            })
        }
    })
}

module.exports.login = function(request,response){
    db.findOne("adminList",{
        adminName:request.query.adminName,
        passWord:md5(request.query.adminPwd+"huangmei")
    },function(err,adminInfo){
        if(adminInfo){
            db.insertOne("adminLog",{
                adminId:adminInfo._id,
                addTime:Date.now(),
                detail:adminInfo.adminName+"在"+common.getNowTime()+"登录了系统"
            },function(err,result){
                response.json({
                    ok:1,
                    msg:"登录成功",
                    adminName:adminInfo.adminName,
                    adminId:adminInfo._id
                })
            })
        }else{
            response.json({
                ok:2,
                msg:"您的用户名或密码错误！"
            })
        }
    })

}