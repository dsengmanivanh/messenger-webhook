'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express().use(bodyParser.json());
var Message = require('./Message');
var User = require('./User');
var PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, function () {
  return console.log('webhook is listening');
});

app.get('/', function (req, res) {
  res.send("Hi I am a chatbot");
});

// Creates the endpoint for our webhook
app.post('/webhook', function (req, res) {

  var body = req.body;

  // Checks this is an event from a page subscription
  if (body.object === 'page') {

    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach(function (entry) {

      // Gets the message. entry.messaging is an array, but
      // will only ever contain one message, so we get index 0
      var webhook_event = entry.messaging[0];
      console.log(webhook_event);
      //Message.getMessage();
      //Message.handleMessage("sender_psid", "webhook_event.message");

      // Get the sender PSID
      var sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);
      //ok
      User.getUser(sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        Message.handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        Message.handlePostback(sender_psid, webhook_event.postback);
      }
    });

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED');
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});

// Adds support for GET requests to our webhook
app.get('/webhook', function (req, res) {

  // Your verify token. Should be a random string.
  var VERIFY_TOKEN = PAGE_ACCESS_TOKEN;

  // Parse the query params
  var mode = req.query['hub.mode'];
  var token = req.query['hub.verify_token'];
  var challenge = req.query['hub.challenge'];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {

    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
});