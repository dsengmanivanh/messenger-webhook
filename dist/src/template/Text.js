"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Text = function () {
  function Text(sender_psid, message) {
    _classCallCheck(this, Text);

    this.sender_psid = sender_psid;
    this.message = message;
  }

  _createClass(Text, [{
    key: "getTemplate",
    value: function getTemplate() {
      return {
        "recipient": {
          "id": this.sender_psid
        },
        "message": {
          "text": this.message
        }
      };
    }
  }]);

  return Text;
}();

module.exports = Text;