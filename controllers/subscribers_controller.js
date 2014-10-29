var express = require('express');
var authorization = require('../middleware/authorization');
var models = require('../models');
var Subscriber = models.Subscriber;

var subscribers = express.Router();
var route = '/products/:product/subscribers'

subscribers.use(route, authorization);

subscribers.route(route)
.get(function subscribersGET(req, res, next) {
  res.status(200).json({
    location: route,
    product: req.params.product
  });
})
.post(function subscribersPOST(req, res, next) {
  var product = req.params.product;
  var endpoint = req.body.endpoint;

  var subscriber = Subscriber.create({
    product: product,
    endpoint: endpoint
  })
  .then(function(s) {
    res.status(201).json(s);
  })
  .catch(function(err) {
    console.error('Subscriber failed to save.');
    res.status(400).json(err);
  });
});

module.exports = subscribers;
