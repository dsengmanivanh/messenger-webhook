"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Messrequestage = require('request');

var PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

var Message = function () {
  function Message() {
    _classCallCheck(this, Message);
  }

  // Handles messages events


  _createClass(Message, [{
    key: "handleMessage",
    value: function handleMessage(sender_psid, received_message) {
      var response = void 0;
      // Check if the message contains text
      if (received_message.text) {
        // Create the payload for a basic text message
        response = {
          "text": "You sent the message: \"" + received_message.text + "\". Now send me an attachment!"
        };
      } else if (received_message.attachments) {
        // Get the URL of the message attachment
        var attachment_url = received_message.attachments[0].payload.url;
        response = {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "generic",
              "elements": [{
                "title": "Is this the right picture?",
                "subtitle": "Tap a button to answer.",
                "image_url": attachment_url,
                "buttons": [{
                  "type": "postback",
                  "title": "Yes!",
                  "payload": "yes"
                }, {
                  "type": "postback",
                  "title": "No!",
                  "payload": "no"
                }]
              }]
            }
          }
        };
      }
      // Sends the response message
      this.callSendAPI(sender_psid, response);
    }

    // Handles messaging_postbacks events

  }, {
    key: "handlePostback",
    value: function handlePostback(sender_psid, received_postback) {}

    // Sends response messages via the Send API

  }, {
    key: "callSendAPI",
    value: function callSendAPI(sender_psid, response) {
      // Construct the message body
      var request_body = {
        "recipient": {
          "id": sender_psid
        },
        "message": response
        // Send the HTTP request to the Messenger Platform
      };request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
      }, function (err, res, body) {
        if (!err) {
          console.log('message sent!');
        } else {
          console.error("Unable to send message:" + err);
        }
      });
    }
  }]);

  return Message;
}();

module.exports = new Message();