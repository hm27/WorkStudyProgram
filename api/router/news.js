const db=require('../modules/db');
const common = require("../modules/common");
const bodyParser=require('body-parser');
const {upPic} =require("../modules/upPic");
module.exports.addPicTitle=function(req,res){
    upPic(req,"picConent",function(obj){
        if(obj.ok===1){
            db.insertOne("lunBoList",{
                picTitle:obj.params.picTitle,
                picConent:obj.newPicName,
                addTime:Date.now()
            },function(){
                res.json({
                    ok:1,
                    msg:"上传成功"
                })
            })
        }else{
            res.json({
                ok:2,
                msg:obj.msg
            })
        }
    })
}

module.exports.getPicTitleList = function(req,res){
    var pageIndex = req.query.pageIndex/1;
    var pageNum = 2;
    var pageSum = 1;
    db.count("lunBoList",{},function(count){
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
        db.find("lunBoList",{
            limitNum:pageNum,
            skipNum:(pageIndex-1)*pageNum
        },function(err,lunBoInfo){
            res.json({
                ok:1,
                lunBoInfo,
                pageSum
            })
        })
    })
}

module.exports.addNews = function(req,res){
    upPic(req,"picConent",function(obj){
        if(obj.ok===1){
            db.insertOne("newsList",{
                picTitle:obj.params.picTitle,
                picDetail:obj.params.picDetail,
                picConent:obj.newPicName,
                addTime:Date.now()
            },function(){
                res.json({
                    ok:1,
                    msg:"上传成功"
                })
            })
        }else{
            res.json({
                ok:2,
                msg:obj.msg
            })
        }
    })
}

module.exports.getNews = function(req,res){
    var pageIndex = req.query.pageIndex/1;
    var pageNum = 2;
    var pageSum = 1;
    db.count("newsList",{},function(count){
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
        db.find("newsList",{
            limitNum:pageNum,
            skipNum:(pageIndex-1)*pageNum
        },function(err,newsInfo){
            res.json({
                ok:1,
                newsInfo,
                pageSum
            })
        })
    })
}


/*******************前端**********************/
module.exports.getLunBoPic = function(req,res){
    db.find("lunBoList",{},function(err,lunBoInfo){
        res.json({
            ok:1,
            lunBoInfo
        })
    })
}

module.exports.getNewsList = function(req,res){
    db.find("newsList",{},function(err,newsInfo){
        res.json({
            ok:1,
            newsInfo:newsInfo.slice(0,2)
        })
    })
}

module.exports.getQNewsList = function(req,res){
    db.find("newsList",{},function(err,newsInfo){
        res.json({
            ok:1,
            newsInfo
        })
    })
}