'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rp = require('request-promise-native');
var PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

var User = function () {
    function User() {
        _classCallCheck(this, User);
    }

    _createClass(User, [{
        key: 'getUser',
        value: function getUser(sender_psid) {
            this.callSendAPI(sender_psid);
        }

        // Sends response messages via the Send API

    }, {
        key: 'callSendAPI',
        value: function callSendAPI(sender_psid) {
            var options = {
                uri: 'https://graph.facebook.com/v2.6/'.concat(sender_psid),
                qs: {
                    access_token: PAGE_ACCESS_TOKEN,
                    fields: "first_name,last_name,profile_pic,locale,timezone,gender"
                },
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true // Automatically parses the JSON string in the response
            };

            rp(options).then(function (res) {
                console.log('=====Ok:', res.length);
                var user = JSON.stringify(res);
            }).catch(function (err) {
                console.error("Unable to send message:" + err);
            });
        }
    }]);

    return User;
}();

module.exports = new User();