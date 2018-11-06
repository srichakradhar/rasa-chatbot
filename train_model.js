// JavaScript source code
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);

//const child = require('child_process').exec('python -m rasa_nlu.train -c HRbot/config.yml --data HRbot/HR_Bot.json -o models/');
//child.stdout.pipe(process.stdout)
//child.on('exit', function () {
//    process.exit()
//})

const child = require('child_process');
var spawn = child.spawn('python',['../../model.py']);
spawn.stdout.on('data', function (data){
    //console.log(data);
    var dire = data;
    console.log("NJNJ"+dire);
});

spawn.on('close', function (code) {
    console.log("dsfsfs");
});