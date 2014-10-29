var request = require('request');

module.exports = function(req, res, next) {
  var slug = req.params.product;
  var token = req.query.token;

  request.get({
    uri: process.env.ASSEMBLY_API + '/products/' + slug + '/authorization?token=' + token,
    headers: {
      'content-type': 'application/json',
      'accept': 'application/json'
    }
  }, function(error, response, body) {
    if (error) {
      return res.send(error);
    }

    var authorized, body;
    try {
      body = JSON.parse(response.body);
      authorized = body.authorized;
    } catch (e) {
      res.send(e);
    }

    if (!authorized) {
      return res.json(body);
    }

    next();
  });
};
