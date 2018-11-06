// JavaScript source code
//const path = require('path');
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
var path = require('path');
const dir = 'models\\default\\';
//fs.readdirSync(dir).forEach(file => {
//    console.log(fs.statSync(dir + file).mtime);
//});

var latestDir = fs.readdirSync(dir).sort(function (a, b) {
    return Date.parse(fs.statSync(dir + a).mtime) < Date.parse(fs.statSync(dir + b).mtime);
})[0];
const training_file = path.join(__dirname, dir + latestDir + '\\training_data.json');
console.log('training file: ', training_file);
let rawdata = fs.readFileSync(training_file);
let trainingData = JSON.parse(rawdata);
let intents = new Set();
trainingData.rasa_nlu_data.common_examples.forEach(example => intents.add(example.intent));
console.log([...intents.keys()]);