const ApiClient = require('../api/ApiClient');
const Text = require('../template/Text');
const Generic = require('../template/Generic');

class MessageService {

  constructor() {
  }


  handle(sender_psid, received_message) {
    if(received_message.text){
      let message = received_message.text.toLowerCase();
      let request_body = new Text(sender_psid,text);
      if (message.includes("generic")) {
  		    request_body = new Generic(sender_psid);
      }
      console.log("request_body=",request_body.getTemplate());
      ApiClient.post(sender_psid, request_body);
    }
  }

  // Handles messages events
  handleMessage(sender_psid, received_message) {
    let response;
    // Check if the message contains text
    if (received_message.text) {
      // Create the payload for a basic text message
      response = {
        "text": `You sent the message: "${received_message.text}". Now send me an attachment!`
      }
    } else if (received_message.attachments) {
      // Get the URL of the message attachment
      const attachment_url = received_message.attachments[0].payload.url;
      response = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": [{
              "title": "Is this the right picture?",
              "subtitle": "Tap a button to answer.",
              "image_url": attachment_url,
              "buttons": [
                {
                  "type": "postback",
                  "title": "Yes!",
                  "payload": "yes",
                },
                {
                  "type": "postback",
                  "title": "No!",
                  "payload": "no",
                }
              ]
            }]
          }
        }
      }
    }
    // Sends the response message
    //this.callSendAPI(sender_psid, response);
    let request_body = {
      "recipient": {
        "id": sender_psid
      },
      "message": response
    }
    ApiClient.post(sender_psid, request_body);
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
