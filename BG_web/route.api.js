var express = require('./node_modules/express');
var router = express.Router();
var saveModel=require('./public/javascripts/saveModel');
var showModel=require('./public/javascripts/showModel');

/* 根据前端发来的workId，从而修改showModel数据库第一条数据的workId属性 */
router.post('/id',(req,res,next)=>{
  id=req.body.workId;
  showModel.updateOne({},{$set:{workId:id}},(err)=>{
    if(err){
      next(err)
    }
    res.json('ok');
  })
});


/* 从showModel数据表读取仅有的一条数据 */
router.get('/show',function(req,res,next){
  showModel.findOne({},{},function(err,doc){
    if(err){
      return next(err)
    }
    res.json(doc);
  })
})

/* 根据前端发来的workId以及时间域，查找saveModel符合条件的数据并返回 */
router.post('/search',(req,res,next)=>{
  var workId=req.body.workId;
  var minTime=req.body.minTime;
  var maxTime=req.body.maxTime;
  console.log('1');
  saveModel.find({},{time:{$gte: minTime, $lt: maxTime},
    workId:{$eq:workId}},(err,doc)=>{
      console.log('2');
    if(err){
      console.log('3');
      return next(err)

    }
    console.log('4');
    res.json(doc)          //返回的是未经处理的原值，注意处理
  })
});

module.exports = router;