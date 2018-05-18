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
              "template_type": "list",
              "top_element_style": "compact",
              "elements": [{
                "title": "Hello 1",
                "subtitle": "Subtitle 1",
                "buttons": [{
                  "title": "View",
                  "type": "web_url",
                  "url": "https://www.medium.com/",
                  "messenger_extensions": "false",
                  "webview_height_ratio": "full"
                }],
                "default_action": {
                  "type": "web_url",
                  "url": "https://www.medium.com/",
                  "messenger_extensions": "false",
                  "webview_height_ratio": "full"
                }
              }, {
                "title": "Hello 2",
                "subtitle": "Subtitle 2",
                "image_url": "https://cdn-images-1.medium.com/1*Vkf6A8Mb0wBoL3Fw1u0paA.jpeg",
                "buttons": [{
                  "title": "View",
                  "type": "web_url",
                  "url": "https://www.medium.com/",
                  "messenger_extensions": "false",
                  "webview_height_ratio": "full"
                }],
                "default_action": {
                  "type": "web_url",
                  "url": "https://www.medium.com/",
                  "messenger_extensions": "false",
                  "webview_height_ratio": "full"
                }
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