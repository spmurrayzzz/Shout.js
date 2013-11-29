/*
 *  Shout.js
 *
 *  A quick and dirty pub/sub thingamajig
 *
 *  Author: Stephen Murray
 *  Shout.js may be freely distributed under the MIT license.
 */

;(function(){

  this.Shout = function() {
    "use strict";

    var shout,
      _cache = {},
      _delim = /\s+/,
      slice = Array.prototype.slice;

    function getArgs( args ) {
      return slice.call(args, 0);
    }

    function splitEvents( events ) {
      return events.split(_delim);
    }

    shout = {

      on: function(){
        var args = getArgs(arguments),
          events = splitEvents(args[0]),
          handlers = slice.call(args, 1),
          ev;

        while ( ev = events.shift() ) {
          _cache[ev] = _cache[ev] || [];
          for ( var i = 0; i < handlers.length; i++ ) {
            _cache[ev].push(handlers[i]);
          }
        }

        return this;
      },

      off: function(){
        var args = getArgs(arguments),
          events = splitEvents(args[0]),
          ev,
          retains = [],
          handlers = slice.call(args, 1);

        while ( ev = events.shift() ) {
          _cache[ev] = _cache[ev] || [];
          if ( handlers.length ) {
            for ( var i = 0; i < _cache[ev].length; i++ ) {
              for ( var j = 0; j < handlers.length; j++ ) {
                if ( _cache[ev][i] !== handlers[j] ) {
                  retains.push(_cache[ev][i]);
                }
              }
            }
            _cache[ev] = retains;
          } else {
            delete _cache[ev];
          }
        }

        return this;
      },

      emit: function(){
        var args = getArgs(arguments),
          events = splitEvents(args[0]),
          argsToPass = slice.call(args, 1),
          ev,
          handlers;

        while ( ev = events.shift() ) {
          handlers = _cache[ev] || [];
          for ( var i = 0; i < handlers.length; i++ ) {
            handlers[i].apply(null, argsToPass);
          }
        }

        return this;
      }

    };

    shout.trigger = shout.fire = shout.emit;

    return shout;

  };

}).call(this);
