/**
 * A wrapper over Rasa NLU's REST API. 
 */

const request = require('request');
const Entity = require('../entity.js');
const Intent = require('../intent.js');


var path = require('path');
var fs = require('fs');
const dir = path.join(__dirname, '..', '..', 'model','current','nlu', 'default\\');
//const dir = path.join(__dirname, 'default\\');
console.log(dir);
fs.readdirSync(dir).forEach(file => {
    fs.statSync(dir + file).mtime;
});
var rasaModelName = fs.readdirSync(dir).sort(function (a, b) {
    return Date.parse(fs.statSync(dir + a).mtime) < Date.parse(fs.statSync(dir + b).mtime);
})[0];


//model directory

//const path = require('path');
//const express = require('express');
//const app = express();
//const server = require('http').Server(app);
//const child = require('child_process');
//var spawn = child.spawn('python', ['../../model.py']);
//spawn.stdout.on('data', function (data) {
//    const rasaModelName= data;
//    console.log("trained model directory" + dire);
//});
//spawn.on('close', function (code) {
//    console.log("connection closed");
//});

exports.parse = parse;

/**
 * Request Rasa NLU to parse a message. Results are provided via the callback.
 */
function parse(message, callback) {
    console.log("Rasa Parse, message: " +message);
    request(createParseRequest(rasaModelName, message), function(error, response, body) {
        console.log('rasa: response - ', response && response.statusCode);
        console.log(body);
        if (error) callback(error);
        if (body) callback(null, extractIntent(body), extractEntities(body));
        
    });
}

function extractIntent(body) {
    
    /*return body.intent.name !== null ? (parseFloat(body.intent.confidence) > 0.6 ? new Intent(body.intent.name) : new Intent("Unclassified")) : new Intent(null);*/
    return body.intent ? new Intent(body.intent.name) : null;
}


function extractEntities(body) {
    var entities = [];
    if (body.entities) {        

        for (var i = 0; i < body.entities.length; i++) {
            var entity = new Entity(body.entities[i].entity, body.entities[i].value);
            entities.push(entity);
        }
    }
    return entities;
}

function createParseRequest(modelName, message) {
    return {
        method: 'POST',
        uri: 'http://localhost:5005/parse',
        json: true,
        body: {
            'model': modelName,
            'q': message
        }
    }
}