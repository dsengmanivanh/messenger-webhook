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
        var request_body = new Text(sender_psid, "ok text");
        if (message.includes("generic")) {
          request_body = new Generic(sender_psid);
        }
        ApiClient.post(sender_psid, request_body.getTemplate());
      }
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