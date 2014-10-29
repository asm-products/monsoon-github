var fs = require('fs');

fs.readdirSync(__dirname)
.filter(function(file) {
  return (file.indexOf(".") !== 0) && (file !== "index.js");
})
.forEach(function(controller) {
  var underscoreLocation = controller.indexOf('_');
  var controllerName = controller.substr(0, underscoreLocation);

  exports[controllerName] = require('./' + controller);
});
