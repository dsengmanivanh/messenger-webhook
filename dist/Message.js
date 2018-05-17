'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

var Message = function () {
  function Message() {
    _classCallCheck(this, Message);
  }

  _createClass(Message, [{
    key: 'getMessage',
    value: function getMessage() {
      console.log('=======================getMessage');
    }
    // Handles messages events

  }, {
    key: 'handleMessage',
    value: function handleMessage(sender_psid, received_message) {
      var response = void 0;
      // Check if the message contains text
      if (received_message.text) {
        console.log('=======================handleMessage');
        // Create the payload for a basic text message
        response = {
          "text": 'You sent the message: "' + received_message.text + '". Now send me an image!'
        };
      }
      // Sends the response message
      this.callSendAPI(sender_psid, response);
    }

    // Handles messaging_postbacks events

  }, {
    key: 'handlePostback',
    value: function handlePostback(sender_psid, received_postback) {}

    // Sends response messages via the Send API

  }, {
    key: 'callSendAPI',
    value: function callSendAPI(sender_psid, response) {
      console.log('=======================callSendAPI');
      // Construct the message body
      var request_body = {
        "recipient": {
          "id": sender_psid
        },
        "message": response
        // Send the HTTP request to the Messenger Platform
      };(0, _request2.default)({
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