'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiClient = require('../api/ApiClient');
var Text = require('../template/Text');
var Generic = require('../template/Generic');

var MessageService = function () {
  function MessageService() {
    _classCallCheck(this, MessageService);
  }

  _createClass(MessageService, [{
    key: 'handle',
    value: function handle(sender_psid, received_message) {
      if (received_message.text) {
        var message = received_message.text.toLowerCase();
        var request_body = new Text(sender_psid, text);
        if (message.includes("generic")) {
          request_body = new Generic(sender_psid);
        }
        console.log("request_body=", request_body.getTemplate());
        ApiClient.post(sender_psid, request_body);
      }
    }

    // Handles messages events

  }, {
    key: 'handleMessage',
    value: function handleMessage(sender_psid, received_message) {
      var response = void 0;
      // Check if the message contains text
      if (received_message.text) {
        // Create the payload for a basic text message
        response = {
          "text": 'You sent the message: "' + received_message.text + '". Now send me an attachment!'
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
      //this.callSendAPI(sender_psid, response);
      var request_body = {
        "recipient": {
          "id": sender_psid
        },
        "message": response
      };
      ApiClient.post(sender_psid, request_body);
    }

    // Handles messaging_postbacks events

  }, {
    key: 'handlePostback',
    value: function handlePostback(sender_psid, received_postback) {
      var response = void 0;

      // Get the payload for the postback
      var payload = received_postback.payload;

      // Set the response based on the postback payload
      if (payload === 'yes') {
        response = { "text": "Thanks!" };
      } else if (payload === 'no') {
        response = { "text": "Oops, try sending another image." };
      }
      // Send the message to acknowledge the postback
      //this.callSendAPI(sender_psid, response);
      var request_body = {
        "recipient": {
          "id": sender_psid
        },
        "message": response
      };
      ApiClient.post(sender_psid, request_body);
    }
  }]);

  return MessageService;
}();

module.exports = new MessageService();