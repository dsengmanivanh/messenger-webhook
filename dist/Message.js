"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = function () {
  function Message() {
    _classCallCheck(this, Message);
  }

  _createClass(Message, [{
    key: "handleMessage",


    // Handles messages events
    value: function handleMessage(sender_psid, received_message) {}

    // Handles messaging_postbacks events

  }, {
    key: "handlePostback",
    value: function handlePostback(sender_psid, received_postback) {}

    // Sends response messages via the Send API

  }, {
    key: "callSendAPI",
    value: function callSendAPI(sender_psid, response) {}
  }]);

  return Message;
}();

module.exports = Message;