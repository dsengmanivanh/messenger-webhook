'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rp = require('request-promise-native');
var PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

var ApiClient = function () {
    function ApiClient() {
        _classCallCheck(this, ApiClient);
    }

    _createClass(ApiClient, [{
        key: 'post',
        value: function post(sender_psid, request_body) {
            var options = {
                method: 'POST',
                uri: 'https://graph.facebook.com/v2.6/me/messages',
                qs: {
                    access_token: PAGE_ACCESS_TOKEN
                },
                json: request_body // Automatically stringifies the body to JSON
            };

            rp(options).then(function (parsedBody) {
                var res = JSON.stringify(parsedBody);
                console.error("Send message:" + res);
            }).catch(function (err) {
                console.error("Unable to send message:" + err);
            });
        }

        // Sends response messages via the Send API

    }, {
        key: 'getUser',
        value: function getUser(sender_psid) {
            console.log('url', 'https://graph.facebook.com/v2.6/'.concat(sender_psid));
            var options = {
                uri: 'https://graph.facebook.com/v2.6/'.concat(sender_psid),
                qs: {
                    access_token: PAGE_ACCESS_TOKEN,
                    fields: "first_name,last_name,profile_pic,locale,timezone,gender"
                },
                headers: {
                    'User-Agent': 'Request-Promise'
                },
                json: true
            };

            rp(options).then(function (res) {
                return JSON.stringify(res);
            }).catch(function (err) {
                console.error("Unable to send message:" + err);
            });
        }
    }]);

    return ApiClient;
}();

module.exports = new ApiClient();