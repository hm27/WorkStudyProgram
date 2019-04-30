const db=require('../modules/db');
const common = require("../modules/common");
const bodyParser=require('body-parser');
const grade = require("../modules/grade");
module.exports.addAllWrok = function(req,res){
    var aTime = new Date(req.body.aTime).getTime();
    var aTime2 = new Date(req.body.aTime2).getTime();
    db.insertOne("allWorkList",{
        aPost:req.body.aPost,
        aTime,
        aTime2,
        aWhere:req.body.aWhere,
        aSalary:req.body.aSalary,
        aContent:req.body.aContent,
        aNumber:req.body.aNumber/1,
        aRecruits:req.body.aRecruits/1,
        oper:1/*1、添加工作初始化 2、工作人数已够*/
    },function(err,result){
        if(result){
            res.json({
                ok:1,
                msg:"添加岗位成功"
            })
        }else{
            res.json({
                ok:2,
                msg:"添加岗位失败"
            })
        }
    })
}

module.exports.getAllWorkList = function(req,res){
    var pageIndex = req.query.pageIndex/1;
    var pageNum = 2;
    var pageSum = 1;
    db.count("allWorkList",{
        oper:1
    },function(count){
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
        db.find("allWorkList",{
            whereObj:{
                oper:1
            },
            limitNum:pageNum,
            skipNum:(pageIndex-1)*pageNum
        },function(err,workInfo){
            if(workInfo){
                res.json({
                    ok:1,
                    workInfo,
                    pageSum
                })
            }else{
                res.json({
                    ok:2,
                    msg:"获取列表失败"
                })
            }
        })
    })
}

module.exports.addHourWork = function(req,res){
    var hTime = new Date(req.body.hTime).getTime();
    var hTime2 = new Date(req.body.hTime2).getTime();
    db.insertOne("hourWorkList",{
        hPost:req.body.hPost,
        hTime,
        hTime2,
        hWhere:req.body.hWhere,
        hSalary:req.body.hSalary,
        hContent:req.body.hContent,
        hNumber:req.body.hNumber/1,
        hRecruits:req.body.hRecruits/1,
        oper:1/*1、添加工作初始化 2、工作人数已够*/
    },function(err,result){
        if(result){
            res.json({
                ok:1,
                msg:"添加岗位成功"
            })
        }else{
            res.json({
                ok:2,
                msg:"添加岗位失败"
            })
        }
    })
}

module.exports.getHourWorkList = function(req,res){
    var pageIndex = req.query.pageIndex/1;
    var pageNum = 2;
    var pageSum = 1;
    db.count("hourWorkList",{
        oper:1
    },function(count){
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
        db.find("hourWorkList",{
            whereObj:{
                oper : 1
            },
            limitNum:pageNum,
            skipNum:(pageIndex-1)*pageNum
        },function(err,workInfo){
            if(workInfo){
                res.json({
                    ok:1,
                    workInfo,
                    pageSum
                })
            }else{
                res.json({
                    ok:2,
                    msg:"获取列表失败"
                })
            }
        })
    })
}

module.exports.delAllWork = function(req,res){
    db.deleteOneById("allWorkList",req.query.id,function(err,result){
        if(result){
            res.json({
                ok:1,
                msg:"删除成功"
            })
        }else{
            res.json({
                ok:2,
                msg:"删除失败"
            })
        }
    })
}

module.exports.delHourWork = function(req,res){
    db.deleteOneById("hourWorkList",req.query.id,function(err,result){
        if(result){
            res.json({
                ok:1,
                msg:"删除成功"
            })
        }else{
            res.json({
                ok:2,
                msg:"删除失败"
            })
        }
    })
}

module.exports.upgetAllWork = function(req,res){
    db.findOneById("allWorkList",req.query.id,function(err,wrokInfo){
        if(wrokInfo){
            res.json({
                ok:1,
                wrokInfo
            })
        }else{
            res.json({
                ok:2,
                msg:"获取失败"
            })
        }
    })
}

module.exports.updateAllWork = function(req,res){
    var upObj = {
        $set:{
            aPost:req.body.aPost,
            aTime:req.body.aTime,
            aWhere:req.body.aWhere,
            aSalary:req.body.aSalary,
            aContent:req.body.aContent,
            aNumber:req.body.aNumber/1,
            aRecruits:req.body.aRecruits/1
        }
    }
   db.updateOneById("allWorkList",req.body.workId,upObj,function(err,result){
       if(result){
           res.json({
               ok:1,
               msg:"修改工作成功"
           })
       }else{
           res.json({
               ok:2,
               msg:"修改工作失败"
           })
       }
   })
}


module.exports.upgetHourWork = function(req,res){
    db.findOneById("hourWorkList",req.query.id,function(err,wrokInfo){
        if(wrokInfo){
            res.json({
                ok:1,
                wrokInfo
            })
        }else{
            res.json({
                ok:2,
                msg:"获取失败"
            })
        }
    })
}

module.exports.updateHourWork = function(req,res){
    var upObj = {
        $set:{
            hPost:req.body.hPost,
            hTime:req.body.hTime,
            hWhere:req.body.hWhere,
            hSalary:req.body.hSalary,
            hContent:req.body.hContent,
            hNumber:req.body.hNumber/1,
            hRecruits:req.body.hRecruits/1
        }
    }
    db.updateOneById("hourWorkList",req.body.workId,upObj,function(err,result){
        if(result){
            res.json({
                ok:1,
                msg:"修改工作成功"
            })
        }else{
            res.json({
                ok:2,
                msg:"修改工作失败"
            })
        }
    })
}

module.exports.getResumeList = function(req,res){
    var pageIndex = req.query.pageIndex/1;
    var pageNum = 2;
    var pageSum = 1;
    db.count("resume",{
        oper:1
    },function(count){
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
        db.find("resume",{
            whereObj:{
                oper:1
            },
            limitNum:pageNum,
            skipNum:(pageIndex-1)*pageNum,
            sortObj:{
                addTime:-1
            }
        },function(err,resumeInfo){
            if(resumeInfo){
                res.json({
                    ok:1,
                    resumeInfo,
                    pageSum
                })
            }else{
                res.json({
                    ok:2,
                    msg:"获取信息失败"
                })
            }
        })
    })
}

module.exports.employ = function(req,res){
   db.findOne("resume",{
       aNum:req.query.userNum/1,
       oper:2
   },function(err,find){
       if(find){
            res.json({
                ok:2,
                msg:"此人已有工作！"
            })
       }else{
           db.findOneById("resume",req.query.id,function(err,upInfo){
               db.updateOneById("resume",req.query.id,{
                   $set:{
                       oper:2
                   }
               },function(err,result){
                   if(upInfo.type ===1){/*查全天工作的表*/
                       db.findOneById("allWorkList",upInfo.workId,function(err,allInfo){
                           if(allInfo.aRecruits>1){/*招聘人数判断*/
                               db.updateOneById("allWorkList",allInfo._id,{
                                   $inc:{
                                       aRecruits:-1
                                   }
                               },function(err,result){
                                   res.json({
                                       ok:1,
                                       msg:"录用成功"
                                   })
                               })
                           }else{/*工作人数已够*/
                               db.updateOneById("allWorkList",allInfo._id,{
                                   $set:{
                                       oper:2
                                   }
                               },function(err,results){
                                   res.json({
                                       ok:2,
                                       msg:"该工作人数已够!"
                                   })
                               })
                           }
                       })
                   }else{/*查小时工的工作表*/
                       db.findOneById("hourWorkList",upInfo.workId,function(err,allInfo){
                           if(allInfo.hRecruits>1){/*招聘人数判断*/
                               db.updateOneById("hourWorkList",allInfo._id,{
                                   $inc:{
                                       hRecruits:-1
                                   }
                               },function(err,result){
                                   res.json({
                                       ok:1,
                                       msg:"录用成功"
                                   })
                               })
                           }else{/*工作人数已够*/
                               db.updateOneById("hourWorkList",allInfo._id,{
                                   $set:{
                                       oper:2
                                   }
                               },function(err,results){
                                   res.json({
                                       ok:2,
                                       msg:"该工作人数已够!"
                                   })
                               })
                           }
                       })
                   }
               })
           })
       }
   })
}

module.exports.notPass = function(req,res){
    db.updateOneById("resume",req.query.id,{
        $set:{
            oper:3
        }
    },function(err,result){
        res.json({
            ok:1,
            msg:"该学生被标记为不合适！"
        })
    })
}

module.exports.getPassList = function(req,res){
    var pageIndex = req.query.pageIndex/1;
    var pageNum = 2;
    var pageSum = 1;
    db.count("resume",{
        oper:2
    },function(count){
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
        db.find("resume",{
            whereObj:{
                oper:2
            },
            limitNum:pageNum,
            skipNum:(pageIndex-1)*pageNum,
            sortObj:{
                addTime:-1
            }
        },function(err,passInfo){
            res.json({
                ok:1,
                passInfo,
                pageSum
            })
        })
    })
}

module.exports.getNotPassList = function(req,res){
    var pageIndex = req.query.pageIndex/1;
    var pageNum = 2;
    var pageSum = 1;
    db.count("resume",{
        oper:3
    },function(count){
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
        db.find("resume",{
            whereObj:{
                oper:3
            },
            limitNum:pageNum,
            skipNum:(pageIndex-1)*pageNum,
            sortObj:{
                addTime:-1
            }
        },function(err,notPassInfo){
            res.json({
                ok:1,
                notPassInfo,
                pageSum
            })
        })
    })
}

module.exports.getWorkingList = function(req,res){
    var pageIndex = req.query.pageIndex/1;
    var pageNum = 3;
    var pageSum = 1;
    db.count("working",{
        oper:1
    },function(count){
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
        db.find("working",{
            whereObj:{oper:1},
            limitNum:pageNum,
            skipNum:(pageIndex-1)*pageNum
        },function(err,workInfo){
            if(workInfo){
                res.json({
                    ok:1,
                    workInfo,
                    pageSum
                })
            }else{
                res.json({
                    ok:2,
                    msg:"失败"
                })
            }
        })
    })
}

module.exports.completeWork = function(req,res){
    db.findOne("working",{
        aName:req.query.aName,
        oper:1
    },function(err,result3){
        if(result3){
            db.findOneById("resume",req.query.id,function(err,Info){
                db.updateOneById("resume",req.query.id,{
                    $set:{
                        oper:4/*工作完成*/
                    }
                },function(err,result){
                    if(result){/*修改成功以后，将派出管理表记录也修改*/
                        db.updateOneByObj("working",{
                            /*找的条件*/
                            aName:Info.aName,
                            workId:Info.workId,
                            oper:1
                        },{
                            /*需要更新的内容*/
                            $set:{
                                oper:2
                            }
                        },function(err,result2){
                            res.json({
                                ok:1,
                                msg:"该学生工作已完成！"
                            })
                        })
                    }
                })
            })
        }else{
            res.json({
                ok:2,
                msg:"该学生没有工作记录！"
            })
        }
    })
}


module.exports.notFinished = function(req,res){
    db.findOne("working",{
        aName:req.query.aName,
        oper:1
    },function(err,result){
        if(result){
            res.json({
                ok:2,
                msg:"该学生有工作记录，请核实之后在操作！"
            })
        }else{
            db.updateOneById("resume",req.query.id,{
                $set:{
                    oper:5
                }
            },function(err,result2){
                res.json({
                    ok:1,
                    msg:"该学生被标记为旷工！"
                })
            })
        }
    })
}


module.exports.notPassDetele = function(req,res){
    db.deleteOneById("resume",req.query.id,function(err,result){
        res.json({
            ok:1,
            msg:"删除成功！"
        })
    })
}

/****************************前台*******************************/
module.exports.getQAllWorkList = function(req,res){
    db.find("allWorkList",{
       whereObj:{ oper:1}
    },function(err,wrokInfo){
        res.json({
            ok:1,
            wrokList:wrokInfo.slice(0,3)
        })
    })

}

module.exports.getQHourWorkList = function(req,res){
    db.find("hourWorkList",{
        whereObj:{oper:1}
    },function(err,hourWorkInfo){
        res.json({
            ok:1,
            hourWorkInfo:hourWorkInfo.slice(0,3)
        })
    })
}

module.exports.ApplyPost = function(req,res){
    var aTime = new Date(req.body.aTime).getTime();
    var aTime2 = new Date(req.body.aTime2).getTime();
    db.findOne("resume",{
        oper:2,
        aNum:req.body.aNum
    },function(err,result2){
        if(result2){
            res.json({
                ok:2,
                msg:"您已经有工作正在进行中！"
            })
        }else{
            db.findOne("resume",{
                workId:req.body.workId,
                aNum:req.body.aNum
            },function(err,result){
                if(result){
                    res.json({
                        ok:2,
                        msg:"您已经申请过该岗位了！"
                    })
                }else{
                    db.insertOne("resume",{
                        type:req.body.type/1,
                        workId:req.body.workId,
                        aName:req.body.aName,
                        aNum:req.body.aNum,
                        aGrade:req.body.aGrade,
                        aPost:req.body.aPost,
                        aContent:req.body.aContent,
                        aSalary:req.body.aSalary,
                        aTime,
                        aTime2,
                        aWrokexp:req.body.aWrokexp,
                        phone:req.body.phone/1,
                        addTime:common.getNowTime(),
                        oper:1/*标识符1、申请岗位，2、录用，3、不合适 4、工作完成 5、旷工*/
                    },function(err,result){
                        res.json({
                            ok:1,
                            msg:"申请发送成功,请静候佳音"
                        })
                    })
                }
            })
        }
    })
}

module.exports.xApplyPost = function(req,res){
    var aTime = new Date(req.body.aTime).getTime();
    var aTime2 = new Date(req.body.aTime2).getTime();
    db.findOne("resume",{
        oper:2,
        aNum:req.body.aNum
    },function(err,result2){
        if(result2){
            res.json({
                ok:2,
                msg:"您有工作正在进行中！"
            })
        }else{
            db.findOne("resume",{
                workId:req.body.workId,
                aNum:req.body.aNum
            },function(err,result){
                if(result){
                    res.json({
                        ok:2,
                        msg:"您已经申请过该岗位了！"
                    })
                }else{
                    db.insertOne("resume",{
                        type:req.body.type/1,
                        workId:req.body.workId,
                        aName:req.body.aName,
                        aNum:req.body.aNum,
                        aGrade:req.body.aGrade,
                        aPost:req.body.aPost,
                        aContent:req.body.aContent,
                        aSalary:req.body.aSalary,
                        aTime,
                        aTime2,
                        aWrokexp:req.body.aWrokexp,
                        phone:req.body.phone/1,
                        addTime:common.getNowTime(),
                        oper:1/*标识符1、申请岗位，2、录用，3、不合适*/
                    },function(err,result){
                        res.json({
                            ok:1,
                            msg:"申请发送成功,请静候佳音"
                        })
                    })
                }
            })
        }
    })
}

module.exports.getApplyMsg = function(req,res){
    db.find("resume",{
        whereObj:{
            aNum:req.query.userNum/1
        }
    },function(err,applyMsg){
        res.json({
            ok:1,
            applyMsg,
            grade:grade.applyNum
        })
    })
}

module.exports.getAllDayWorkList = function(res,res){
    db.find("allWorkList",{
        whereObj:{oper:1}
    },function(err,allDayWorkInfo){
        res.json({
            ok:1,
            allDayWorkInfo
        })
    })
}

module.exports.getHourDayWorkList = function(req,res){
    db.find("hourWorkList",{
        whereObj:{oper:1}
    },function(err,hourDayWorkInfo){
        res.json({
            ok:1,
            hourDayWorkInfo
        })
    })
}

module.exports.getWorkClockList = function(req,res){
    db.findOne("resume",{
        aNum:req.query.userNum/1,
        oper:2
    },function(err,workInfo){
        if(workInfo){
            res.json({
                ok:1,
                workInfo
            })
        }else{
            res.json({
                ok:2,
                msg:"您还没有合适的工作，请多多投递~~"
            })
        }
    })
}

module.exports.goToWork = function(req,res){
    var type = req.query.type/1;
    var ident = req.query.ident/1;
    db.findOne("working",{
        aName:req.query.userName,
        workId:req.query.workId,
        oper:1
    },function(err,result){
        if(result){
            res.json({
                ok:2,
                msg:"您上班已经打过卡了，请不要重复打卡！"
            })
        }else{
            if(type === 1){
                db.findOneById("allWorkList",req.query.workId,function(err,workInfo){
                    var cnt = workInfo.aTime2 - workInfo.aTime;
                    var workHour = (cnt / 1000 / 60 / 60).toFixed(2);/*这份工作的时长，单位小时*/
                    var Time;/*工作开始时间*/
                    if(ident === 1){/*ident标记打卡时间应该怎么加入1、记录正常工作开始时间，2、记录打卡时间*/
                        Time = workInfo.aTime;
                    }else{
                        Time = req.query.timestamp/1;
                    }
                    db.insertOne("working",{
                        workId:req.query.workId,
                        aName:req.query.userName,
                        aWhere:workInfo.aWhere,
                        aContent:workInfo.aContent,
                        yTime:workHour,/*应该工作的时长*/
                        sTime:"正在进行中",/*实际工作的时长*/
                        state:"正在进行中",/*工作状态*/
                        Time,/*工作开始时间，记录要算实际工作时长*/
                        Time2:"正在进行中",
                        oper:1/*操作符1、工作在进行中 2、下班打卡 3、工作完成*/
                    },function (err,result) {
                        res.json({
                            ok:1,
                            Time,
                            msg:"上班打卡成功！"
                        })
                    })
                })
            }else{/*查小时工作表*/
                db.findOneById("hourWorkList",req.query.workId,function(err,workInfo){
                    var cnt = workInfo.hTime2 - workInfo.hTime;
                    var workHour = (cnt / 1000 / 60 / 60).toFixed(2);/*取两位小数，这份工作的时长，单位小时*/
                    var Time;/*工作开始时间*/
                    if(ident === 1){/*ident标记打卡时间应该怎么加入1、记录正常工作开始时间，2、记录打卡时间*/
                        Time = workInfo.hTime;
                    }else{
                        Time = req.query.timestamp/1;
                    }
                    db.insertOne("working",{
                        workId:req.query.workId,
                        aName:req.query.userName,
                        aWhere:workInfo.hWhere,
                        aContent:workInfo.hContent,
                        yTime:workHour,/*应该工作的时长*/
                        sTime:"正在进行中",/*实际工作的时长*/
                        state:"正在进行中",/*工作状态*/
                        Time,/*工作开始时间，记录要算实际工作时长*/
                        Time2:"正在进行中",
                        oper:1,/*操作符1、工作在进行中 2、工作完成*/
                        Attendance:"还未下班打卡"/*出勤率*/
                    },function (err,result) {
                        res.json({
                            ok:1,
                            Time,
                            msg:"上班打卡成功！"
                        })
                    })
                })
            }
        }
    })
}

module.exports.goOffWork = function(req,res){
    var ident = req.query.ident/1;
    var Time;/*打卡时间*/
    if(ident === 1){/*ident标记打卡时间应该怎么加入1、记录正常工作开始时间，2、记录打卡时间*/
        Time = req.query.Time2/1;
    }else{
        Time = req.query.timestamp/1;
    }
    db.findOne("working",{
        aName:req.query.userName,
        workId:req.query.workId,
        oper:1,
        offWork:1/*1、标识下班打卡，*/
    },function(err,workInfo){
        if(workInfo){
            res.json({
                ok:2,
                msg:"您下班已经打过卡了，请不要重复打卡！"
            })
        }else{
            db.findOne("working",{
                aName:req.query.userName,
                workId:req.query.workId,
                oper:1
            },function(err,Info){
                if(Info){
                    var sTime = ((Time - Info.Time)/1000/60/60).toFixed(2);/*实干的工作时间*/
                    var Attendance = ((sTime/Info.yTime).toFixed(2))*100+"%";
                    db.updateOneById("working",Info._id,{
                        $set:{
                            state:"完成",
                            Time2:Time,
                            sTime,
                            offWork:1,
                            Attendance/*出勤率字段*/
                        }
                    },function(err,result2){
                        res.json({
                            ok:1,
                            Time,
                            msg:"下班打卡成功！"
                        })
                    })
                }
            })
        }
    })
}

module.exports.getGoTime = function(req,res){
    db.findOne("working",{
        aName:req.query.userName,
        oper:1
    },function(err,Info){
        if(Info){
            res.json({
                ok:1,
                Time:Info.Time
            })
        }else{
            res.json({
                ok:2,
                msg:"还没有打卡！"
            })
        }
    })
}

module.exports.getOffTime = function(req,res){
    db.findOne("working",{
        aName:req.query.userName,
        oper:1
    },function(err,Info){
        if(Info){
            res.json({
                ok:1,
                Time:Info.Time2
            })
        }else{
            res.json({
                ok:2,
                msg:"还没有打卡！"
            })
        }
    })
}