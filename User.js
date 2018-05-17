const rp = require('request-promise-native');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const ApiClient = require('./ApiClient');

class User {

  constructor() {
  }

  getUser(sender_psid){
    //this.callSendAPI(sender_psid);
    const user = ApiClient.getUser(sender_psid);
    console.log("user apres====",user);
    let request_body = {
      "recipient": {
        "id": sender_psid
      },
      "message": "hello ".concat(user.first_name)
    }
    ApiClient.post(sender_psid, request_body);

  }

  // Sends response messages via the Send API
  callSendAPI(sender_psid) {
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
        json: true // Automatically parses the JSON string in the response
    };

    rp(options)
      .then(function (res) {
          const user = JSON.stringify(res);
          return User;
      })
      .catch(function (err) {
          console.error("Unable to send message:" + err);
      });
  }
}

module.exports = new User();
