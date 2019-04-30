const db=require('../modules/db');
const common = require("../modules/common");
const userGrade = require("../modules/grade");
const md5=require("md5");

module.exports.userLogin = function(req,res){
    db.findOne("userList",{
        userName:req.query.userName,
        userNum:req.query.userNum/1,
        userGrade:req.query.userGrade
    },function(err,userInfo){
        if(userInfo){
            res.json({
                ok:1,
                msg:"登录成功",
                userName:userInfo.userName,
                userNum:userInfo.userNum/1
            })
        }else{
            db.insertOne("userList",{
                userName:req.query.userName,
                userNum:req.query.userNum/1,
                userGrade:req.query.userGrade
            },function(err,result){
                if(result){
                    res.json({
                        ok:1,
                        msg:"登录成功",
                        userName:req.query.userName,
                        userNum:req.query.userNum/1
                    })
                }else{
                    res.json({
                        ok:2,
                        msg:"登录失败"
                    })
                }
            })
        }
    })
}

module.exports.getUserInfo = function(req,res){
    db.findOne("userList",{
        userNum:req.query.userNum/1
    },function(err,userInfo){
        res.json({
            ok:1,
            userInfo,
            userGrade:userGrade.userGrade
        })
    })
}