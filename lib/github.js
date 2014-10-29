var request = require('request');
var scheduler = require('./scheduler');
var Subscriber = require('../models').Subscriber;
var WEEK = 7 * 24 * 60 * 60 * 1000;

module.exports = function() {
  Subscriber.findAll().then(iterateThroughSubscribers);
};

function iterateThroughSubscribers(subscribers) {
  subscribers.forEach(scheduleUpdate);
}

function scheduleUpdate(subscriber) {
  return getData(subscriber)();
  scheduler(getData(subscriber), {
    id: subscriber.get('id'),
    recurring: true,
    performEvery: WEEK
  });
}

function getData(subscriber) {
  var _getData = function() {
    var uri = process.env.GITHUB_API + '/' + subscriber.get('product') + '/stats/contributors';

    request.get({
      uri: uri,
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json',
        'authorization': 'token ' + process.env.GITHUB_USER_TOKEN,
        'user-agent': process.env.GITHUB_PRODUCTS_USER_NAME
      }
    }, function(err, response, body) {
      if (err) {
        return console.error(err);
      }

      try {
        body = JSON.parse(body);
      } catch(e) {
        console.error('Failed to parse GitHub response.');
        console.log(e);
      }

      processData(body, subscriber);
    });
  };

  return _getData;
}

function processData(data, subscriber) {
  var summary = '```piechart\n';

  data.map(function(user) {
    summary += user.author.login + ',';

    var lastWeek = user.weeks[user.weeks.length - 1];
    var changesLastWeek = lastWeek.c;

    summary += changesLastWeek + '\n';
  });

  summary += '```\n';

  forwardData(summary, subscriber);
}

function forwardData(string, subscriber) {
  var endpoint = subscriber.get('endpoint');

  request.post({
    uri: endpoint,
    body: {
      message: string,
      user_token: process.env.ASSEMBLY_AUTHENTICATION_TOKEN
    },
    json: true
  }, function(err, response, body) {
    if (err) {
      console.error('Error sending message to ' + endpoint);
      return console.log(err);
    }

    console.log(response.statusCode);
  });
}
