var express = require('express');
var router = express.Router();
//引入芒果数据库模块
var url='mongodb://localhost:27017/igeek'
var MongoClient=require('mongodb').MongoClient;

var db=require('../dao/db');

/* GET users listing. */
var User=require('../bean/User');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//注册表单请求
router.get('/reg',function(req,res,next){
	res.render('regist');
});
router.post('/reg',function(req,res,next){
    var user=new User(req.body.account,req.body.pwd);

    db.insertOne("users",user,regCallback);
    function regCallback(num){
        if(num==1){
            res.redirect('/');
        }
        else{
            res.render('reg',{msg:'注册失败'})
        }
    }

});


//登陆表单请求
router.get('/login',function(req,res,next){
	res.render('login');
});
//处理表单登陆post请求
router.post('/login',function(req,res,next){
  //把得到请求的用户名和密码封装成为一个对象
   var user=new User(req.body.account,req.body.pwd);
//查找数据库里Users这个集合是否有这个账户
   db.findOne("users",{account:user.account,pwd:user.pwd},{fields:{account:1}},loginCallback);
   function loginCallback(doc){
    if(doc){
        console.dir(doc);
        //把账号的名字存到session里面
        req.session.user=doc.account;
        db.findMany("blogs",null,null,initblogCallBack);
        var blogs;
        function initblogCallBack(docs){
          blogs=docs;
          console.log(docs);
        res.render('index',{account:req.session.user,Blogs:blogs});
        }

        
    }else {
            res.render('login',{msg:'用户名或者密码错误'});
    }
   }
});


module.exports = router;
