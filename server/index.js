const express = require("express"),
  nedb = require("nedb"),
  rest = require("express-nedb-rest"),
  cors = require("cors"),
  app = express(),
  datastore = new nedb({ filename: "mycoffeeapp.db", autoload: true }),
  restAPI = rest();

/////////////////////////////////////////////////////////////////////////////////////////////////////////
const webPush = require('web-push');
const bodyParser = require('body-parser');
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});
require('dotenv').config({ path: 'variables.env' });
app.use(bodyParser.json());
const publicVapidKey = 'BDba0XsWDVT6Qx9yAHTUeQL_RQ-TbmV2V349bKVP5BNiLaObYO8UkY0QWYSQZ45t-vvvmMisqEekXo_ILKL560c';
const privateVapidKey = 'xtMhiLix3Fvy2IT9PEna5xjpBNdPEwMZdd8uzp6QHIw';
webPush.setVapidDetails('http://localhost:8080/', publicVapidKey, privateVapidKey);

app.post('/notifications', (req, res) => {
  const subscription = req.body.notification;
  console.log(`Subscription received`);
  res.status(201).json({});
  const payload = JSON.stringify({
    notification: {
      title: 'Notifications are cool',
      body: 'Know how to send notifications through Angular with this article!',
      icon: 'https://www.shareicon.net/data/256x256/2015/10/02/110808_blog_512x512.png',
      vibrate: [100, 50, 100],
      data: {
        url: 'https://medium.com/@arjenbrandenburgh/angulars-pwa-swpush-and-swupdate-15a7e5c154ac'
      }
    }
  });
  webPush.sendNotification(subscription, payload)
    .catch(error => console.error(error));
});
/////////////////////////////////////////////////////////////////////////////////////////////////////

restAPI.addDatastore('coffees', datastore);
app.use(cors());
app.use('/', restAPI);

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
