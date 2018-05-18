'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express().use(bodyParser.json());
var MessageService = require('./service/MessageService');
var PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

app.listen(process.env.PORT || 3000, function () {
  return console.log('webhook is listening');
});

app.get('/', function (req, res) {
  res.send("Hi I am a chatbot");
});

app.post('/webhook', function (req, res) {
  var body = req.body;
  if (body.object === 'page') {
    body.entry.forEach(function (entry) {
      var webhook_event = entry.messaging[0];
      var sender_psid = webhook_event.sender.id;
      if (webhook_event.message) {
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

app.get('/webhook', function (req, res) {
  var VERIFY_TOKEN = PAGE_ACCESS_TOKEN;
  var mode = req.query['hub.mode'];
  var token = req.query['hub.verify_token'];
  var challenge = req.query['hub.challenge'];
  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
});