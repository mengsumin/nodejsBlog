var express = require('express');
var router = express.Router();
var db=require('../dao/db');
var MongoClient=require('mongodb').MongoClient;

router.post('/',function(req,res,next){
    console.log(createdate());
    var content=req.body.blog;
    if(content){
        var blogs={
            content:req.body.blog,
            BY:req.session.user,
            date:createdate()
        };
     
     db.insertOne('blogs',blogs,postCallback);
     function postCallback(num){
        //doSomething
        if(num==1)
            { res.json(blogs)}
            else{
                res.render('index',{msg:'发布失败失败'});
                 
            }
    } 


    }
     
   
});


  function createdate(){
            var data=new Date();
            var datastring=data.getFullYear()+":"
            +data.getMonth()+":"+data.getDate()+":"
            +data.getHours()+":"+data.getMinutes()+":"
            +data.getSeconds();
            return datastring;

        }
module.exports = router;
