var ids = {};

module.exports = function(task, options) {
  if (options.performOnce) {
    return setTimeout(task, (options.performIn || 0));
  }

  if (options.recurring) {
    if (!ids[options.id]) {
      ids[options.id] = 1;
      
      return setInterval(task, options.performEvery);
    }
  }
};
