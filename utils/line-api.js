/**
 * line-api.js
 * Created by Haze Lee <hazelee@realignist.me>
 */
'use strict';
let request = require('request');
let base_url = "https://trialbot-api.line.me";
var settings = undefined;

/**
 * Loading Settings from Json
 * @param {object} object Needs "channel_id", "channel_secret", "mid"
 */
function initialize (object) {
    settings = object;
}

function throwError (message) {
    throw new Error(message);
}

/**
 * Send Message to User
 * check it from https://developers.line.me/bot-api/api-reference#sending_message
 * 
 * @param   {array} to          Array of target user. Max count: 150.
 * @param   {object} content    Data of Message
 * @return  {promise}           Return Promise of Request Data ({ response, body })
 */
function sendMessage (to, content) {
    return new Promise(function (resolve, reject) {
        if (settings === undefined) {
            reject(throwError("Module needs initialize."));
            return;
        }

        request({
            url: `${base_url}/v1/events`,
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "X-Line-ChannelID": settings.channel_id,
                "X-Line-ChannelSecret": settings.channel_secret,
                "X-Line-Trusted-User-With-ACL": settings.mid
            }, json: {
                to: to,
                toChannel: 1383378250,
                eventType: "138311608800106203",
                content: content
            }
        }, function (error, response, body) {
            if (error) reject(error);
            else resolve({
                response: response,
                body: body
            });
        });
    });
}

/**
 * Send Multiple Messages to User
 * check it from https://developers.line.me/bot-api/api-reference#sending_multiple_messages
 * 
 * @param  {array}  to       Array of target user. Max count: 150.
 * @param  {array}  messages Messages data. 
 * @return {promise}        Return Promise of Request Data ({ response, body })
 */
function sendMessages (to, messages) {
    return new Promise(function (resolve, reject) {
        if (settings === undefined) {
            reject(throwError("Module needs initialize."));
            return;
        }

        request({
            url: `${base_url}/v1/events`,
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "X-Line-ChannelID": settings.channel_id,
                "X-Line-ChannelSecret": settings.channel_secret,
                "X-Line-Trusted-User-With-ACL": settings.mid
            }, json: {
                to: to,
                toChannel: 1383378250,
                eventType: "140177271400161403",
                content: {
                    messageNotified: 0,
                    messages: messages
                }
            }
        }, function (error, response, body) {
            if (error) reject(error);
            else resolve({
                response: response,
                body: body
            });
        });
    });
}

/**
 * Getting previews of message content
 * Check it from https://developers.line.me/bot-api/api-reference#getting_message_content_preview
 * 
 * @param  {string}     messageId Message's Id
 * @return {promise}    Return Promise of Request Data ({ response, body })
 */
function getMessageContent (messageId) {
    return new Promise(function (resolve, reject) {
        if (settings === undefined) {
            reject(throwError("Module needs initialize."));
            return;
        }

        request({
            url: `${base_url}/v1/bot/message/${messageId}/content/preview`,
            method: "GET",
            headers: {
                "X-Line-ChannelID": settings.channel_id,
                "X-Line-ChannelSecret": settings.channel_secret,
                "X-Line-Trusted-User-With-ACL": settings.mid
            }
        }, function (error, response, body) {
            if (error) reject(error);
            else resolve({
                response: response,
                body: body
            });
        });
    });
}

/**
 * Get user's profile data
 * Check it from https://developers.line.me/bot-api/api-reference#getting_user_profile_information
 * 
 * @param  {string} mid     [Required. Lists the MIDs of the users whose information is to be retrieved, separated by commas.]
 * @return {promise}        Return Promise of Request Data ({ response, body })
 */
function getProfile (mid) {
    return new Promise(function (resolve, reject) {
        if (settings === undefined) {
            reject(throwError("Module needs initialize."));
            return;
        }

        request({
            url: `${base_url}/v1/profiles?mids=${mid}`,
            method: "GET",
            headers: {
                "X-Line-ChannelID": settings.channel_id,
                "X-Line-ChannelSecret": settings.channel_secret,
                "X-Line-Trusted-User-With-ACL": settings.mid
            }
        }, function (error, response, body) {
            if (error) reject(error);
            else resolve({
                response: response,
                body: body
            });
        });
    });
}

module.exports = {
    request:            request,
    base_url:           base_url,
    settings:           settings,
    throwError:         throwError,
    initialize:         initialize,
    sendMessage:        sendMessage,
    sendMessages:       sendMessages,
    getProfile:         getProfile,
    getMessageContent:  getMessageContent
};