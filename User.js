const ApiClient = require('./ApiClient');

class User {

  constructor() {
  }

  getUser(sender_psid){
    const res = ApiClient.getUser(sender_psid);
    console.log("res apres====",res);
    const user = JSON.parse(res);
    return user.first_name;
  }
}

module.exports = new User();
