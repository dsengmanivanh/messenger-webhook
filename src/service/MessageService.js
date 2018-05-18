const ApiClient = require('../api/ApiClient');
const Text = require('../template/Text');
const Generic = require('../template/Generic');

class MessageService {

  constructor() {
  }


  handle(sender_psid, received_message) {
    if(received_message.text){
      let message = received_message.text.toLowerCase();
      let request_body = new Text(sender_psid,"ok text");
      if (message.includes("generic")) {
  		    request_body = new Generic(sender_psid);
      }
      ApiClient.post(sender_psid, request_body.getTemplate());
    }
  }

  // Handles messaging_postbacks events
  handlePostback(sender_psid, received_postback){
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    if (payload === 'yes') {
      response = { "text": "Thanks!" }
    } else if (payload === 'no') {
      response = { "text": "Oops, try sending another image." }
    }
    // Send the message to acknowledge the postback
    //this.callSendAPI(sender_psid, response);
    let request_body = {
      "recipient": {
        "id": sender_psid
      },
      "message": response
    }
    ApiClient.post(sender_psid, request_body);
  }

}
module.exports = new MessageService();
