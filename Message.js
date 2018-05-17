import request from 'request';

class Message {

  // Handles messages events
  handleMessage(sender_psid, received_message) {
    let response;
    // Check if the message contains text
    if (received_message.text) {
        console.log('=======================handleMessage');
      // Create the payload for a basic text message
      response = {
        "text": `You sent the message: "${received_message.text}". Now send me an image!`
      }
    }
    // Sends the response message
    callSendAPI(sender_psid, response);
  }

  // Handles messaging_postbacks events
  handlePostback(sender_psid, received_postback) {

  }

  // Sends response messages via the Send API
  callSendAPI(sender_psid, response) {
    console.log('=======================callSendAPI');
    // Construct the message body
    let request_body = {
      "recipient": {
        "id": sender_psid
      },
      "message": response
    }
    // Send the HTTP request to the Messenger Platform
    request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": PAGE_ACCESS_TOKEN },
      "method": "POST",
      "json": request_body
    }, (err, res, body) => {
      if (!err) {
        console.log('message sent!')
      } else {
        console.error("Unable to send message:" + err);
      }
    });
  }
}
module.exports = Message;
