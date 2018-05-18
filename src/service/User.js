const ApiClient = require('../api/ApiClient');

class User {

  constructor() {
  }

  getUser(sender_psid){
    const res = ApiClient.getUser(sender_psid);
    const user = JSON.parse(res);
    return user.first_name;
  }
}

module.exports = new User();
