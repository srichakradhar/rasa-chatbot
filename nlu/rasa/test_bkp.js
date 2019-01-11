// JavaScript source code
const path = require('path');
//const express = require('express');
//const app = express();
//const server = require('http').Server(app);
//const io = require('socket.io')(server);

//app.listen(5500, function () {
//    console.log("connected");
//})

//////


//app.get('/model', callpython);

//function callpython(req, res) {
//    let { PythonShell } = require('python-shell')
//    //const spawn = require('child_process').spawn;
//   // py = spawn('python', ['./model.py']);

//    PythonShell.run('./model.py', function (err, data) {
//        if (err) res.send(err);
//        res.send(data.toString());
//    });
//};


//function callpython(req,res) {
//    const spawn = require('child_process').spawn;
//    py = spawn('python', ['./model.py']);  

//    py.stdout.on('/data', function (data) {
//        res.send(data.toString());
//    });
//};


var fs = require('fs');
//var path = require('path');
//const dir = 'models\\default\\';
//fs.readdirSync(dir).forEach(file => {
//    console.log(fs.statSync(dir + file).mtime);
//});

//var latestDir = fs.readdirSync(dir).sort(function (a, b) {
//    return Date.parse(fs.statSync(dir + a).mtime) < Date.parse(fs.statSync(dir + b).mtime);
//})[0];
//const training_file = path.join(__dirname, dir + latestDir + '\\training_data.json');
//console.log('training file: ', training_file);
//let rawdata = fs.readFileSync(training_file);
//let trainingData = JSON.parse(rawdata);
//let intents = new Set();
//trainingData.rasa_nlu_data.common_examples.forEach(example => intents.add(example.intent));
//console.log([...intents.keys()]);



//const training_file = path.join(__dirname, 'HRbot', 'HR_Bot.json');
//var knowledge_base = JSON.parse(fs.readFileSync(training_file));
//var utterances = knowledge_base.rasa_nlu_data.common_examples;
//var update = { text: 'example.Utterance', intent: 'example.Intent', entities: 'example.entityLabels' };
//var utterances = knowledge_base.rasa_nlu_data.common_examples;
////console.log(utterances.slice(utterances.length - 5, utterances.length));
//var utterances_text = utterances.map((e) => e.text);
//if (!utterances_text.includes(update.text)) utterances.push(update);
//var update = { text: 'example.Utterance', intent: 'Intent', entities: 'example.entityLabels' };
//if (!utterances_text.includes(update.text)) utterances.push(update);
////knowledge_base.rasa_nlu_data.common_examples.push(update);
////console.log(knowledge_base.rasa_nlu_data.common_examples.slice(utterances.length - 5, utterances.length));
//fs.writeFileSync(training_file, JSON.stringify(knowledge_base));


var path = require('path');
var fs = require('fs');
const dir = '..\\..\\models\\default\\';
fs.readdirSync(dir).forEach(file => {
   fs.statSync(dir + file).mtime;
});
var rasaModelName = fs.readdirSync(dir).sort(function (a, b) {
    return Date.parse(fs.statSync(dir + a).mtime) < Date.parse(fs.statSync(dir + b).mtime);
});


