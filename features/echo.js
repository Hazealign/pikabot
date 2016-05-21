'use strict';
let co = require('co');

var settings = undefined;
var linebot = undefined;

function initialize (object) {
    settings = object;
    linebot = require('./../utils/line-api.js');
    linebot.initialize(settings);
}

function notify (data) {
    if (settings === undefined || linebot === undefined) return;
    if (!data.hasOwnProperty('result')) return;
    
    console.log(data);
    for (let event in data.result) {
        co(function *() {
            //var event_result = yield linebot.sendMessage(event.from, );
        }, function (err) {
            console.error(err);
        });
    }
}

module.exports = {
    settings:   settings,
    linebot:    linebot,
    initialize: initialize,
    notify:     notify
};