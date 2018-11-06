
//services
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const classifier = require('./nlu/classifier.js');
const MongoClient = require('mongodb').MongoClient;
const deasync = require('deasync');
const bodyParser = require('body-parser');
var trainingObj = require('./training.js');
db_url = "mongodb://localhost:27017/botdb";

//start the server
//const child = require('child_process').exec('python -m rasa_nlu.server -c HRbot/config.yml --pre_load default/model_20181015-155713 --path models/');

//train
//const child1 = require('child_process').exec('python -m rasa_nlu.train -c HRbot/config.yml --data HRbot/HR_Bot.json -o models/');
//child1.stdout.pipe(process.stdout)
//child1.on('exit', function () {
//    process.exit()
//});

// models
const Reply = require('./reply_HR.js');


// socket.io channels 
const messageChannel = 'message';
const replyChannel = 'reply';

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname + '/public')));
//app.get('/', function (req, res) {
//  res.sendFile(__dirname + '/public/index.html');
//});
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


io.on('connection', function (socket) {
  console.log("User connected to Chatbot");
  //socket.emit(replyChannel, new Reply("init", JSON.parse('{"name": "init1"}'), "").toJson());
  socket.emit(replyChannel, new Reply("init", JSON.parse('{"name": "init2"}'), "").toJson());
  socket.on(messageChannel, function (message, isUser, fn) { 
      fn('Message arrived to the server'); //callback function
      sendToBot(message, socket);
      
  });


  socket.on(replyChannel, function(message, intent, reply, feedback){
      console.log("Message: " + message + " | Intent: " + intent + " | Feedback: " + feedback);
      let response;
      MongoClient.connect(db_url, function (err, db) {
          if (err) throw err;
          var dbo = db.db("botdb");
          console.log("connected");
          feedback_obj = {
              "feedback": feedback,
              "input": message,
              "intent": intent,
              "output": reply,
              "timestamp": new Date()
          };
          
          if (feedback_obj.feedback == true) {
              dbo.collection("classifieds").insertOne(feedback_obj, function (err, inserted) {
                  if (err) throw err;
                  console.log("==####****###== inserted ", inserted.ops);
                  response = inserted;
              });
          }
          else {
              dbo.collection("misclassifieds").insertOne(feedback_obj, function (err, inserted) {
                  if (err) throw err;
                  console.log("==####****###== inserted ", inserted.ops);
                  response = inserted;
              }); }
      });
      deasync.loopWhile(() => {process.stdout.write('.'); return !response});
      
    });
    
});

var port = 8005;

server.listen(port,function () {
  console.log('Chatbot is listening on port ' + port + '!')
});

sendToBot = function(message, socket){  
  classifier.parse(message, function (error, intent, entities) {
    if (error) {
      socket.emit(replyChannel, "An error has occurred: " + error);
    } else {
      socket.emit(replyChannel, new Reply(message, intent, entities).toJson());
    }
  });
}

//////////////
var dataLayerObj = require('./public/datalayer.js');
    
app.post('/api/getDatabases', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (JSON.parse(JSON.stringify(req.query))) {
        var mongoResponse = dataLayerObj.getDatabaseList();
        if (mongoResponse != null && mongoResponse != undefined) {
            // console.log("get database list: "+mongoResponse);
            return res.send(mongoResponse);
        }
    } else {
        return res.json({ "error": "Error while fetching" });
    }
});


// Endpoint to be call from the client side to get collections
app.post('/api/getCollections', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log("req.query, params: -----", req.query, req.params, req.body);
    if (req.body.params.database == "botdb") {
        //console.log('&^%$^&^%$^&^%$^&^%$^ req.query', req.query, 'req.params', req.params);
        var mongoResponse = null;
        mongoResponse = dataLayerObj.getCollectionList(req.body.params.database);
        if (mongoResponse != null && mongoResponse != undefined) {
            //console.log("get collections response:" + mongoResponse);
            return res.send(mongoResponse);
        }
        //console.log('inside');
    } else {
        return res.json({ "error": "Error while fetching" });
    }
});

// Endpoint to be call from the client side to get collection data
app.post('/api/getData', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    //console.log("--------- get data request ----------");
    // console.log("request paramas to get collection data: ", req.params.params);
    if (req.body.params.database == "botdb" && req.body.params.collection) {
        // var process = spawn('python',["datalayer.py", "getData", req.body.database, req.body.collection]);
        // process.stdout.on('data', function (data){
        //   return res.send(data.toString());
        // });
        //console.log("request paramas to get collection data: "+req);
        var mongoResponse = dataLayerObj.getData(req.body.params.database, req.body.params.collection);
        if (mongoResponse != null && mongoResponse != undefined) {
            //console.log("get collection data:"+mongoResponse.data);
            return res.send(mongoResponse);
        }
    } else {
        return res.json({ "error": "Error while fetching" });
    }
});

// Endpoint to be call from the client side to get intents list from watson
app.post('/api/getIntents', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    //console.log("req.query.database == process.env.DB_NAME:", req.query, req.params, process.env.DB_NAME)
    if (req.body.params.database == "botdb") {
        var result = trainingObj.getIntents();
        deasync.loopWhile(function () { return result == null; });
        //console.log("line num: 781 result.data:", result);
        return res.send(JSON.stringify(result));
    } else {
        return res.json({ "error": "Error while fetching" });
    }
});

// Endpoint to be call from the client side to get accuracy of the each database
app.post('/api/getAccuracy', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req) {
        console.log("call to get accuracy");
        var mongoResponse = dataLayerObj.getAccuracy();
        if (mongoResponse != null && mongoResponse != undefined) {
            return res.send(JSON.parse(mongoResponse));
        }
    } else {
        return res.json({ 'error': 'Error while fetching' });
    }
});

// Endpoint to be call from the client side to train watson
app.post('/api/trainBot', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    if (req.body.params.database == "botdb") {
        // var workspace = process.env.WORKSPACE_ID || '<workspace-id>';
        // if (!workspace || workspace === '<workspace-id>') {
        //   return res.json({
        //     'output': {
        //       'text': 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the documentation on how to set this variable in order to get a working application.'
        //     }
        //   });
        // }
        var result = trainingObj.createExample(req.body.params.database);
        console.log(result);
        return res.send(result || { status: 1 });
    } else {
        return res.json({ "error": "Error while training" });
    }
});


// Endpoint to be call from the client side to test watson
app.post('/api/testBot', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(JSON.parse(JSON.stringify(req.query)));
    if (JSON.parse(JSON.stringify(req.query)).database == "botdb") {
        // if (req.query.database == process.env.DB_NAME) {

        var response = trainingObj.validateBot(JSON.parse(JSON.stringify(req.query)).database);
        return res.send(JSON.parse(response));
    } else {
        return res.json({ 'data': { 'status': 0 } });
    }
});

// Endpoint to be call from the client side to get collection data
app.post('/api/putModifiedIntents', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    //console.log("put modified intents request:", req.params.params);
    if (req.body.params.modifiedTable) {
        // var process = spawn('python',["datalayer.py", "getData", req.body.database, req.body.collection]);
        // process.stdout.on('data', function (data){
        //   return res.send(data.toString());
        // });
        var mongoResponse = null;
        var modifiedData = "[";
        if (typeof req.body.params.modifiedTable !== 'string') {
            for (var key in req.body.params.modifiedTable) {
                if (req.body.params.modifiedTable.hasOwnProperty(key)) {
                    var element = req.body.params.modifiedTable[key];
                    if (element.selected_Intent != null && element.selected_Intent != undefined) {
                        modifiedData += JSON.stringify(element) + ",";
                    }
                }
            }
            if (modifiedData.substr(modifiedData.length - 1) === ",") {
                modifiedData = modifiedData.substr(0, modifiedData.length - 1) + "]";
            }
        } else {
            modifiedData += req.body.params.modifiedTable + "]";
        }
        if (req.body.params.database && req.body.params.collection && modifiedData) {
            mongoResponse = dataLayerObj.putModifiedIntents(req.body.params.database,
                req.body.params.collection,
                JSON.parse(modifiedData));
        }
        if (mongoResponse != null && mongoResponse != undefined) {
            console.log(JSON.parse(mongoResponse));
            return res.send({ status: 1 });
        } else {
            return res.json({ "error": "Error while inserting" });
        }
    } else {
        return res.json({ "error": "Error while inserting" });
    }
});


var jsonData = null;
//Endpoint to be call from the client side to give excel for training FAQ the bot 
app.post('/api/TrainBotUsingExcel', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (req) {

        console.log("TrainBotUsingExcel--- request came");

        var file = req.files['uploads[]'];
        // console.log("file:", file, 'type:', typeof(file));

        // require('fs').readFile(file, function(err, data) {
        var X = require('xlsx');
        var workbook = X.readFile(file.path);
        var sheet_name_list = workbook.SheetNames;
        var jsonData = X.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

        var mongoResponse = FaqdataLayerObj.insertFAQResponses(jsonData);
        console.log("mongo response from resolution storing to db: ", JSON.stringify(mongoResponse));
        var response = trainingObj.addIntents(jsonData);
        console.log("add intents and train response:", response);
        // var workerProcess = child_process.exec('node ./public/add_utterance.js -status',function 
        //     (error, stdout, stderr) {

        //     if (error) {
        //        console.log(error.stack);
        //        console.log('Error code: '+error.code);
        //        console.log('Signal received: '+error.signal);
        //     }
        //     console.log('stdout: ' + stdout);
        //     console.log('stderr: ' + stderr);
        //  });

        //  workerProcess.on('exit', function (code) {
        //     console.log('Child process exited with exit code '+code);
        //  });
        return res.send({ 'key': 'this is a model response' });
        // });
        // }else{
        //   return res.json({'data':{'status':0}});
        // }
    }
});


