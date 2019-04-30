// 对数据库操作的方法
const mongodb=require("mongodb");
const mongoClient=mongodb.MongoClient;
function _connect(cb){
    mongoClient.connect("mongodb://127.0.0.1:27017",{ useNewUrlParser: true },function(err,client) {
        cb(client.db("Manage")) ;
    });
}
module.exports.getAdminLogList=function(skip,limit,cb){
    _connect(function(db){
        db.collection("adminLog").aggregate([
            {
                $sort:{
                    addTime:-1
                }
            },
            {$skip:skip},
            {$limit:limit},
            {
                $lookup:{
                    from:"adminList",// 你要和哪个集合进行合并
                    localField:"adminId",// 本集合当中连接的依据字段
                    foreignField:"_id",// 外部的集合连接的邻居字段
                    as: 'adminInfo'// 查找到的信息放到该字段 当中
                }

            }
        ]).toArray(cb)
    })
}

/*前端获取个人被录取的工作----------id对不上*/
/*module.exports.getQApplyMsg=function(type,obj,cb){
    _connect(function(db){
        if(type === 1){
            db.collection("resume").aggregate([
                {
                    $match:obj
                },
                {
                    $lookup:{
                        from:"allWorkList",// 你要和哪个集合进行合并
                        localField:"workId",// 本集合当中连接的依据字段
                        foreignField:"_id",// 外部的集合连接的邻居字段
                        as: 'allInfo'// 查找到的信息放到该字段 当中
                    }

                }
            ]).toArray(cb)
        }else{
            console.log(11111);
            db.collection("resume").aggregate([
                {
                    $match:obj
                },
                {
                    $lookup:{
                        from:"hourWorkList",// 你要和哪个集合进行合并
                        localField:"workId",// 本集合当中连接的依据字段
                        foreignField:"_id",// 外部的集合连接的邻居字段
                        as: 'hourInfo'// 查找到的信息放到该字段 当中
                    }

                }
            ]).toArray(cb)
        }
    })
}*/

/*

/!*获取个人申请信息列表*!/
module.exports.getApplyMsg=function(cb){
    _connect(function(db){
        db.collection("resume").aggregate([
            {
                $lookup:{
                    from:"adminList",// 你要和哪个集合进行合并
                    localField:"adminId",// 本集合当中连接的依据字段
                    foreignField:"_id",// 外部的集合连接的邻居字段
                    as: 'adminInfo'// 查找到的信息放到该字段 当中
                }

            }
        ]).toArray(cb)
    })
}
*/




/*增加一条记录
* coll:指定集合
* obj:添加的内容
* cb：回调函数*/
module.exports.insertOne=function(coll,obj,cb){
    _connect(function(db){
        db.collection(coll).insertOne(obj,cb)
    })
}
/*获取文档信息*/
module.exports.find=function(coll,obj,cb){
    obj.whereObj=obj.whereObj || {};
    obj.sortObj=obj.sortObj || {};
    obj.limitNum=obj.limitNum || 0;
    obj.skipNum=obj.skipNum || 0;

    _connect(function(db){
        db.collection(coll).find(obj.whereObj).sort(obj.sortObj).limit(obj.limitNum).skip(obj.skipNum).toArray(cb);
    })
}
/* 根据条件获得一条记录 */
module.exports.findOne=function(coll,whereObj,cb){
    _connect(function(db){
        db.collection(coll).findOne(whereObj,cb);
    })
}
/* 根据ID获得一条记录 */
module.exports.findOneById=function(coll,id,cb){
    _connect(function(db){
        db.collection(coll).findOne({
            _id:mongodb.ObjectId(id)
        },cb);
    })
}

/*简历表中根据工作ID获得一条记录*/
module.exports.findOneByWorkId=function(coll,id,cb){
    _connect(function(db){
        db.collection(coll).findOne({
            workId:id
        },cb);
    })
}

/*根据条件求总文档数*/
module.exports.count=function(coll,whereObj,cb){
    _connect(function(db){
        db.collection(coll).countDocuments(whereObj).then(cb)
    })
}

/*根据ID删除文档*/
module.exports.deleteOneById=function(coll,id,cb){
    _connect(function(db){
        db.collection(coll).deleteOne({
            _id:mongodb.ObjectId(id)
        },cb);
    })
}

/*根据ID进行更新*/
module.exports.updateOneById=function(coll,id,upObj,cb){
    _connect(function(db){
        db.collection(coll).updateOne({
            _id:mongodb.ObjectId(id)
        },upObj,cb);
    })
}

/*根据条件更新*/
module.exports.updateOneByObj=function(coll,Obj,upObj,cb){
    _connect(function(db){
        db.collection(coll).updateOne(Obj,upObj,cb);
    })
}




