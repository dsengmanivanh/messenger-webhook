
class Generic {

  constructor(sender_psid) {
    this.sender_psid = sender_psid;
  }

  getTemplate() {

    return {
      "recipient": {
        "id": this.sender_psid
      },
      "message": {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "list",
            "top_element_style": "compact",
            "elements": [
              {
                "title": "Hello 1",
                "subtitle": "Subtitle 1",
                "buttons": [
                  {
                    "title": "View",
                    "type": "web_url",
                    "url": "https://www.medium.com/",
                    "messenger_extensions": "false",
                    "webview_height_ratio": "full"
                  }
                ],
                "default_action": {
                  "type": "web_url",
                  "url": "https://www.medium.com/",
                  "messenger_extensions": "false",
                  "webview_height_ratio": "full"
                }
              },
              {
                "title": "Hello 2",
                "subtitle": "Subtitle 2",
                "image_url": "https://cdn-images-1.medium.com/1*Vkf6A8Mb0wBoL3Fw1u0paA.jpeg",
                "buttons": [
                  {
                    "title": "View",
                    "type": "web_url",
                    "url": "https://www.medium.com/",
                    "messenger_extensions": "false",
                    "webview_height_ratio": "full"
                  }
                ],
                "default_action": {
                  "type": "web_url",
                  "url": "https://www.medium.com/",
                  "messenger_extensions": "false",
                  "webview_height_ratio": "full"
                }
              }
            ]
          }
        }
      }
    }
  }
}

module.exports = Generic;
