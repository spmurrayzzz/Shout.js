;(function(){

  var shout;

  module('shout', {
    setup: function(){
      shout = new Shout();
    },
    teardown: function(){
      shout = null;
    }
  });

  test('single event on', 1, function(){
    var test = false;
    shout.on('foo', function(){
      test = true;
    });
    shout.emit('foo');
    equal(test, true, 'Should fire single event.');
    shout.off('foo');
  });

  test('single event w/ args', 2, function(){
    var test = false;
    shout.on('foo', function( arg ) {
      test = arg;
    });
    shout.emit('foo', true);
    equal(test, true, 'Should pass argument via emit.');
    shout.off('foo');

    test = false;
    shout.on('foo', function( arg1, arg2 ){
      test = arg1 + arg2;
    });
    shout.emit('foo', 1, 2);
    equal(test, 3, 'Should pass multiple arguments via emit');
    shout.off('foo');
  });

  test('single event off', 1, function(){
    var test = false;
    shout.on('foo', function(){
      test = true;
    });
    shout.off('foo');
    equal(test, false, 'Should not fire single event.');
    shout.emit('foo');
  });

  test('bind/unbind multiple events', 3, function(){
    var count = 0;
    shout.on('foo bar', function(){
      count++;
    });
    shout.emit('foo');
    shout.emit('bar');
    equal(count, 2, 'Should fire multiple events.');
    shout.off('bar');
    shout.emit('foo');
    equal(count, 3, 'Should unbind single event.');
    shout.off('foo');
    shout.emit('foo');
    equal(count, 3, 'Should unbind all events.');
  });

  test('bind/unbind specific handlers', 2, function(){
    var count = 0;

    function inc() {
      count++;
    }
    function incDeux() {
      count++;
    }

    shout.on('foo', inc, incDeux);
    shout.emit('foo');
    equal(count, 2, 'Should fire both handlers.');
    shout.off('foo', inc);
    shout.emit('foo');
    equal(count, 3, 'Should fire one handler after `off`.');
    shout.off('foo');
  });

  test('emit multiple events w/ args', 1, function(){
    var test = 0;
    shout.on('foo bar', function( arg ){
      test += arg;
    });
    shout.emit('foo bar', 1);
    equal(test, 2, 'Should emit multiple events w/ arguments');
    shout.off('foo bar');
  });

  test('chainability', 3, function(){
    equal(shout.on('foo'), shout, '`on` should return instance.');
    equal(shout.off('bar'), shout, '`off` should return instance.');
    equal(shout.emit('baz'), shout, '`emit` should return instance.');
    shout.off('foo');
  });

})();
