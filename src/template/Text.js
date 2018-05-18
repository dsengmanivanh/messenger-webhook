
class Text {

  constructor(sender_psid, message) {
    this.sender_psid = sender_psid;
    this.message = message;
  }

  getTemplate() {
    return {
      "recipient": {
        "id": this.sender_psid
      },
      "message": this.message
    }
  }

}

module.exports = Text;
