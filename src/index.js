const express = require('express');
const bodyParser = require('body-parser');
const app = express().use(bodyParser.json());
const MessageService = require('./service/MessageService');
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

app.listen(process.env.PORT || 3000, () => console.log('webhook is listening'));

app.get('/', (req,res) => {
	res.send("Hi I am a chatbot");
});

app.post('/webhook', (req, res) => {
  let body = req.body;
  if (body.object === 'page') {
    body.entry.forEach(function(entry) {
      let webhook_event = entry.messaging[0];
      let sender_psid = webhook_event.sender.id;
      if(webhook_event.message) {
        //Message.handleMessage(sender_psid, webhook_event.message);
				MessageService.handle(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        MessageService.handlePostback(sender_psid, webhook_event.postback);
      }
    });
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

app.get('/webhook', (req, res) => {
  const VERIFY_TOKEN = PAGE_ACCESS_TOKEN;
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});
