"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Generic = function () {
  function Generic(sender_psid) {
    _classCallCheck(this, Generic);

    this.sender_psid = sender_psid;
  }

  _createClass(Generic, [{
    key: "getTemplate",
    value: function getTemplate() {
      return {
        "recipient": {
          "id": this.sender_psid
        },
        "message": {
          "attachment": {
            "type": "template",
            "payload": {
              "template_type": "generic",
              "elements": [{
                "title": "Welcome!",
                "image_url": "https://petersfancybrownhats.com/company_image.png",
                "subtitle": "We have the right hat for everyone.",
                "default_action": {
                  "type": "web_url",
                  "url": "https://petersfancybrownhats.com/view?item=103",
                  "messenger_extensions": false,
                  "webview_height_ratio": "tall",
                  "fallback_url": "https://petersfancybrownhats.com/"
                },
                "buttons": [{
                  "type": "web_url",
                  "url": "https://petersfancybrownhats.com",
                  "title": "View Website"
                }, {
                  "type": "postback",
                  "title": "Start Chatting",
                  "payload": "DEVELOPER_DEFINED_PAYLOAD"
                }]
              }]
            }
          }
        }
      };
    }
  }]);

  return Generic;
}();

module.exports = Generic;