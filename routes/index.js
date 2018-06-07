var express = require('express');
var axios = require('axios');
var router = express.Router();

router.post('/createAccount', function (req, res) {

  const axiosPost = axios({
    url: 'https://manage.bookingautomation.com/api/json/createAccount',
    method: 'post',
    data: {
      "authentication": {
        "apiKey": "F12D1A4B243FFCC5"
      },
      "createAccount": [{
        "username": "1987315",
        "password": "raj123344",
        "apiKey": "F12D1A4B243FFCC5",
        "email": "deemind@gmail.com",
        "role": "4",
        "systemEmails": "0",
        "bookingEmails": "0",
        "bookingReplyto": "0"
      }]
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    responseType: 'json',
  });

  axiosPost.then(
    success => res.send({ subaccount: success.data.createAccount[0] }),
    error => cres.send({ error: error })
  );


});

router.post('/getAccounts', function (req, res) {

  const axiosPost = axios({
    url: 'https://manage.bookingautomation.com/api/json/getAccount',
    method: 'post',
    data: {
      "authentication": {
        "apiKey": "F12D1A4B243FFCC5"
      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    responseType: 'json',
  });

  axiosPost.then(
    success => res.send({ subaccounts: success.data[0].subaccounts }),
    error => cres.send({ error: error })
  );


});

router.post('/setRole', function (req, res) {

  const obj = {};

  obj[req.body.subAcc] = {
    "action": "modify",
    "enabled": 1,
    "role": req.body.role,
    "notes": "this is a private note",
    "message": "this is displayed to the sub account"
  };

  const axiosPost = axios({
    url: 'https://manage.bookingautomation.com/api/json/setAccount',
    method: 'post',
    data: {
      "authentication": {
        "apiKey": "F12D1A4B243FFCC5"
      },
      "setAccount": {
        "action": "modify",
        "subaccounts":
          obj

      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    responseType: 'json',
  });

  axiosPost.then(
    success => {

      let accNo;
      let role;
      for (var key in success.data.setAccount.subaccounts) {
        if (success.data.setAccount.subaccounts.hasOwnProperty(key)) {
          accNo = key;
          role = success.data.setAccount.subaccounts[key][0].role;
        }
      }

      res.send({ acc: accNo, role: role })
    },
    error => cres.send({ error: error })
  );


});

module.exports = router;
