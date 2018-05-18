
class Generic {

  constructor(sender_psid) {
    this.sender_psid = sender_psid;
  }

  getTemplate() {
    return {
      "recipient":{
        "id":this.sender_psid
      },
      "message":{
        "attachment":{
          "type":"template",
          "payload":{
            "template_type":"generic",
            "elements":[
               {
                "title":"Welcome!",
                "image_url":"https://petersfancybrownhats.com/company_image.png",
                "subtitle":"We have the right hat for everyone.",
                "default_action": {
                  "type": "web_url",
                  "url": "https://petersfancybrownhats.com/view?item=103",
                  "messenger_extensions": false,
                  "webview_height_ratio": "tall",
                  "fallback_url": "https://petersfancybrownhats.com/"
                },
                "buttons":[
                  {
                    "type":"web_url",
                    "url":"https://petersfancybrownhats.com",
                    "title":"View Website"
                  },{
                    "type":"postback",
                    "title":"Start Chatting",
                    "payload":"DEVELOPER_DEFINED_PAYLOAD"
                  }
                ]
              }
            ]
          }
        }
      }
    }
  }
}

module.exports = Generic;
