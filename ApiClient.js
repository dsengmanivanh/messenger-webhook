const rp = require('request-promise-native');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

class ApiClient {

  post(sender_psid, request_body) {
    const options = {
        method: 'POST',
        uri: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {
            access_token: PAGE_ACCESS_TOKEN
        },
        json: request_body // Automatically stringifies the body to JSON
    };

    rp(options)
      .then(function (parsedBody) {
          const res = JSON.stringify(parsedBody);
      })
      .catch(function (err) {
          console.error("Unable to send message:" + err);
      });
  }

  // Sends response messages via the Send API
  getUser(sender_psid) {
    console.log('url','https://graph.facebook.com/v2.6/'.concat(sender_psid))
    const options = {
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

    rp(options)
      .then(function (res) {
          const user = JSON.stringify(res);
          return user;
      })
      .catch(function (err) {
          console.error("Unable to send message:" + err);
      });
  }
}

module.exports = new ApiClient();
