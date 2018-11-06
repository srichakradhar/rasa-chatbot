var deasync = require('deasync');
var dataLayerObj = require('./public/datalayer.js'); // watson feedback visualization by retrieving from database
//var axios = require('axios');
var fs = require('fs');

//var trainBot = require('./add_utterance.js');

//var rp = require('request-promise');
//var fse = require('fs-extra');
//end point url to get all intents
//https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/fa19a636-f152-46e5-9f81-71040f6c5071?subscription-key=1425a5c948d5456d91955e95b56683e0&verbose=true&timezoneOffset=0&q=all
//var rp = require('request-promise');
//var fse = require('fs-extra');
var path = require('path');

function LuisTraining() { }

LuisTraining.prototype = {


    getIntents: function () {

        //TODO: Use path.join instead of concatenation

        var result = null;
        const dir = 'models\\default\\';
        
        var latestDir = fs.readdirSync(dir).sort(function (a, b) {
            return Date.parse(fs.statSync(dir + a).mtime) < Date.parse(fs.statSync(dir + b).mtime);
        })[0];
        const training_file = path.join(__dirname, dir + latestDir + '\\training_data.json');
        let rawdata = fs.readFileSync(training_file);
        let trainingData = JSON.parse(rawdata);
        let intents = new Set();
        trainingData.rasa_nlu_data.common_examples.forEach(example => intents.add(example.intent));
        return { 'intents': [...intents.keys()].map(intent => { return { 'intent': intent } }) };
        //axios.get('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/9da9bd52-a9cc-4cac-8f33-3ef79b2ad3b1?subscription-key=bccb4e277a4548babeecdb5947e0b433&verbose=true&timezoneOffset=0&q=all')
        //axios.get('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/667bf365-173b-4801-b3c7-640bf1f1b3d2?subscription-key=bccb4e277a4548babeecdb5947e0b433&verbose=true&timezoneOffset=0&q=all')
        //    .then(function (response) {
        //        //console.log("line num 39 response:", response);
        //        // console.log(JSON.parse(response));
        //        result = response.data;
        //    })
        //    .catch(function (error) {
        //        result = { 'error': error };
        //        console.log("Sorry!... Not able to get intents", error);
        //    });
        //deasync.loopWhile(function () { return result == null; });
        //return result;
    },


    createExample: function (database) {
        var result = null;
        var responseData = null;
        var collections = JSON.parse(dataLayerObj.getCollectionList(database));


        for (var key in collections.collections) {
            var parameters = [];
            var listId = [];
            if (collections.collections.hasOwnProperty(key)) {
                var element = collections.collections[key];
                if (element.name === "modifiedunclassifieds" || element.name === "modifiedmisclassifieds") {
                    var mongoResponse = JSON.parse(dataLayerObj.getData(database, element.name));
                    console.log("mongo response from collection:", mongoResponse);

                    for (var i in mongoResponse.data) {
                        result = null;
                        if (mongoResponse.data.hasOwnProperty(i)) {
                            var j = mongoResponse.data[i];
                            console.log("j: ", j);
                            var collectionData = null;
                            if (element.name === "modifiedunclassifieds") {
                                collectionData = JSON.parse(dataLayerObj.getDataById(database, "unclassifieds", j.id));
                                console.log("collectionData, modifiedunclassifieds : ", collectionData);
                            } else if (element.name === "modifiedmisclassifieds") {
                                collectionData = JSON.parse(dataLayerObj.getDataById(database, "misclassifieds", j.id));
                                console.log("collectionData modifiedmisclassifieds :", collectionData);
                            }

                            if (collectionData.data.length > 0) {
                                var params = ({
                                    Utterance: collectionData.data[0].input,
                                    Intent: j.selected_Intent,
                                    entityLabels: []
                                });
                            }

                            //if(j>0){
                            var idList = ({
                                id: j.id,
                                _id: j._id
                            });
                            // }
                            id: j.id;

                            //console.log("params: ",parameters);                                                            

                            parameters.push(params);

                            //var results = trainBot.trainAfterAdd(parameters);
                            //console.log(results);
                        }
                    }
                    
                    console.log("parameters :",parameters);
                    //listId.push(idList);
                    //console.log("Id list that was trained: ",listId);
                    //var results = trainBot.trainAfterAdd(parameters);

                    //training the bot
                    //const training_file = path.join(__dirname, 'HRbot\\HR_Bot.json');
                    //let rawdata = fs.writeFileSync(training_file);
                    //let trainingData = JSON.parse(rawdata);
                    //console.log(trainingData);
                    

                    //console.log(results); 
                    //if (result !== null) {
                    //  listId.forEach(id => {
                    //      console.log(id);
                    //     if (element.name === 'modifiedunclassifieds') {
                    //         dataLayerObj.deleteById(database, 'unclassifieds', id.id);
                    //         dataLayerObj.deleteById(database, 'modifiedunclassifieds', id._id);
                    //     } else if (element.name === 'modifiedmisclassifieds') {
                    //         dataLayerObj.deleteById(database, 'misclassifieds', id.id);
                    //         dataLayerObj.deleteById(database, 'modifiedmisclassifieds', id._id);
                    //     }
                    //  } 

                    // }      
                }
            }
        }
        return responseData;
    },

    //addIntents: async function (jsonData) {
    //    // console.log("jsonData at the add intent");
    //    // console.log(jsonData);
    //    // var intentList = [];
    //    // if (jsonData != null) {

    //    // jsonData.forEach(function(JsonObject) {
    //    //     console.log("jsonobject at the add intent");
    //    //     console.log(JsonObject); 
    //    //      var intent= JsonObject.Intent;          
    //    //     // "intentName":JsonObject.Intent;

    //    //     intentList.push(intent);
    //    // });
    //    // console.log(intentList);
    //    // var AddIntentResults = null;

    //    // AddIntentResults = await trainBot.createNewIntents(intentList);
    //    // deasync.loopWhile(function(){return AddIntentResults === null;});     

    //    // console.log("luis_training:addIntents");
    //    // console.log(AddIntentResults);

    //    // var parameters = [];
    //    //  jsonData.forEach(function(JsonObject) {
    //    //     var params = ({
    //    //        text: JsonObject.Resolution,
    //    //        intentName: JsonObject.Intent,                             
    //    //        entityLabels: []   
    //    //     });   
    //    //     parameters.push(params);                            
    //    //  }); 
    //    // console.log(parameters);           
    //    var results = await trainBot.addIntentUtteranceAndTrain(jsonData);
    //    deasync.loopWhile(function () { return results === null; });
    //    console.log("TrainBot results");
    //    console.log(results);
    //    //}             
    //}
};

var luistraining = new LuisTraining();

module.exports = luistraining;