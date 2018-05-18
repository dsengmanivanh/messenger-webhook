"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiClient = require('./ApiClient');

var User = function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, [{
    key: "getUser",
    value: function getUser(sender_psid) {
      var res = ApiClient.getUser(sender_psid);
      console.log("res apres====", res);
      var user = JSON.parse(res);
      return user.first_name;
    }
  }]);

  return User;
}();

module.exports = new User();