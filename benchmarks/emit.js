var Shout = require('../shout.js'),
  vent = new Shout();

vent.on('foo', function(){});

module.exports = function(){
  vent.emit('foo');
};
