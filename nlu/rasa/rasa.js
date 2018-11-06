/**
 * A wrapper over Rasa NLU's REST API. 
 */

const request = require('request');
const Entity = require('../entity.js');
const Intent = require('../intent.js');


const rasaModelName = '/default/model_20181022-121149';

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
        if (error) callback(error);
        if (body) callback(null, extractIntent(body), extractEntities(body));
    });
}

function extractIntent(body) {
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
        //uri: 'http://localhost:3100/parse',
        uri: 'http://localhost:5000/parse',
        json: true,
        body: {
            'model': modelName,
            'q': message
        }
    }
}