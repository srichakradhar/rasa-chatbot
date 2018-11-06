
var deasync = require('deasync');
var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
//var url = 'mongodb://botdatabase:' + encodeURIComponent('P0cE9P7y7kZr97t7Rolyj9wmXNX3Ak99SrLjltEv3cVJRYP5XfzG47l46zjcOM9QXTPG6EFeoP3TZi36bVM8JQ==') + '@botdatabase.documents.azure.com:10255/'+'HR-DB'+'?ssl=true&replicaSet=globaldb';
var url = 'mongodb://vamsi:Priya%401995@ds119028.mlab.com:19028/amat';
var method = DataLayer.prototype;
function DataLayer(){
}

method.getDatabaseList = function(){  
    var response = null;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.db('amat').admin().listDatabases().then(function(result){
            response = result.databases;
          }
        );
      });   
    deasync.loopWhile(function(){return response === null;});
    return JSON.stringify({"databases":response});
};

method.getCollectionList = function(databaseName){
    var response = null;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        dbo.listCollections().toArray(function(err, collections){
            response = collections;
      });
    });
    deasync.loopWhile(function(){return response === null;});
    return JSON.stringify({"collections":response});
};
 
method.getData = function(databaseName, collectionName){
    var response = null;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        dbo.collection(collectionName).find({}).toArray(function(err, result) {
          if (err) throw err;
          //console.log('get data response'+result);
          response = result;
          db.close();
        });
      });
    deasync.loopWhile(function(){return response === null;});
    //console.log("get data response"+response);
    return JSON.stringify({"data":response});
};

method.getDocumentCount = function(databaseName, collectionName){
  var response = null;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(databaseName);
    dbo.collection(collectionName).count({}, function(err, result) {
      if (err) throw err;
      response = result;
      db.close();
    });
  });
  deasync.loopWhile(function(){return response === null;});
  return response;
};

method.getAccuracy = function(){  
  var response = null;
  var databases = JSON.parse(this.getDatabaseList()).databases;
  response = '{"data":[';
  for (var database in databases) {
    if (databases.hasOwnProperty(database)) {
      var element = databases[database];
      var collections = JSON.parse(this.getCollectionList(element.name)).collections;
      response += '{"database":"'+element.name+'",';
      var classifieds = 0, unclassifieds= 0, misclassifieds = 0, accuracy = 0;
      for (var collection in collections) {
        if (collections.hasOwnProperty(collection)) {
          if (collections[collection].name == "classifieds") {
            classifieds = this.getDocumentCount(element.name, "classifieds");
          }
          if (collections[collection].name == "misclassifieds") {
            misclassifieds = this.getDocumentCount(element.name, "misclassifieds");
          }
          if (collections[collection].name == "unclassifieds") {
            unclassifieds = this.getDocumentCount(element.name, "unclassifieds");
          }
        }
      }
      accuracy = (classifieds/(classifieds+misclassifieds+unclassifieds))*100;
      if (isNaN(accuracy)) {
        accuracy = 0;
      }
      response += '"classifieds":'+classifieds+',"misclassifieds":'+misclassifieds+',"unclassifieds":'+
                      unclassifieds+',"accuracy":'+accuracy;
        response += '},';
    }
  }
  if (response.substr(response.length-1) === ',') {
    response = response.substr(0, response.length-1) + ']}';
  }else{
    response += ']}';
  }
  return response;
};

method.getDataById = function(databaseName, collectionName, id){
    var response = null;
    var o_id = new mongo.ObjectID(id);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        dbo.collection(collectionName).find({'_id':o_id}).toArray(function(err, result) {
          if (err) throw err;
          response = result;
          db.close();
        });
      });
    deasync.loopWhile(function(){return response === null;});
    return JSON.stringify({"data":response});
};

method.deleteById = function(databaseName, collectionName, id){
  var response = null;
  var o_id = new mongo.ObjectID(id);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(databaseName);
    dbo.collection(collectionName).deleteOne({'_id':o_id}, function(err, result) {
      if (err) throw err;
      response = result;
      db.close();
    });
  });
  deasync.loopWhile(function(){return response === null;});
  return JSON.stringify({'data':response.deletedCount});
};

method.putModifiedIntents = function(databaseName, collectionName, modifiedData){
    var response = null;
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(databaseName);
        dbo.collection("modified"+collectionName).insertMany(modifiedData, function(err, result) {
          if (err) throw err;
          response = {"status":result.insertedCount+" documents inserted"};
          db.close();
        });
      });
    deasync.loopWhile(function(){return response === null;});
    //console.log(JSON.stringify(response));
    return JSON.stringify({"data":response});
};

var datalayer = new DataLayer();

module.exports = datalayer;