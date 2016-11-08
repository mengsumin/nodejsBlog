var MongoClient=require('mongodb').MongoClient;
var url='mongodb://localhost:27017/igeek';

function Db(){

}

Db.prototype.insertOne=function(collection,doc,callback){
    MongoClient.connect(url,function(err,db){
        if(err){
            console.dir(err);
        }else{            
            var col=db.collection(collection);
            col.insertOne(doc,function(err,r){
                
                callback(r.insertedCount);
                db.close();
            });
        }
    });

}

Db.prototype.findOne=function(collections,query,options,callback){
    MongoClient.connect(url,function(err,db){
        var collection=db.collection(collections);
         collection.findOne(query,options,function(err,doc){
            callback(doc);
            db.close();
         });
    });

}
Db.prototype.findMany=function(collections,query,findOne,callback){
    MongoClient.connect(url,function(err,db){
        var collection=db.collection(collections);
        collection.find(query).toArray(function(err,docs){
            callback(docs);
        });
    });
}

module.exports=new Db();