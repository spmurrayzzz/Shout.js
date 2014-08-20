/*
 *  Shout.js
 *
 *  A quick and dirty pub/sub thingamajig
 *
 *  Author: Stephen Murray
 *  Shout.js may be freely distributed under the MIT license.
 */

var Shout;

Shout = (function(){

  "use strict";

  // Event string delimiter (spaces)
  var _delim = /\s+/,
  // Convenience for slice cuz, yknow laziness
    slice = Array.prototype.slice,

    _eventNameCache = {};


  // Utility functions

  function getArgs( args ) {
    return slice.call(args, 0);
  }

  function splitEvents( events ) {
    if ( _eventNameCache[events] !== undefined ) {
        return _eventNameCache[events];
    }

    if ( _delim.test(events) ) {
      _eventNameCache[events] = events.split(_delim);
      return _eventNameCache[events];
    } else {
      _eventNameCache[events] = [events];
      return _eventNameCache[events];
    }
  }


  // Primary constructor
  function Shout() {
    this._cache = {};
  }

  // Instance methods
  Shout.prototype = {

    constructor: Shout,

    /**
     * Bind event(s) to handlers
     * @return {self}
     */
    on: function(){
      var args = Array.prototype.slice.call(arguments),
        events = splitEvents(args[0]),
        handlers = slice.call(args, 1),
        e,
        ev;

      for (e = 0; e < events.length; e++) {
        ev = events[e];
        this._cache[ev] = this._cache[ev] || [];
        for ( var i = 0; i < handlers.length; i++ ) {
          this._cache[ev].push(handlers[i]);
        }
      }

      return this;
    },

    /**
     * Unbind event(s)
     * @return {self}
     */
    off: function(){
      var args = getArgs(arguments),
        events = splitEvents(args[0]),
        ev,
        e,
        retains = [],
        handlers = slice.call(args, 1);

      for (e = 0; e < events.length; e++) {
        ev = events[e];
        this._cache[ev] = this._cache[ev] || [];
        if ( handlers.length ) {
          for ( var i = 0; i < this._cache[ev].length; i++ ) {
            for ( var j = 0; j < handlers.length; j++ ) {
              if ( this._cache[ev][i] !== handlers[j] ) {
                retains.push(this._cache[ev][i]);
              }
            }
          }
          this._cache[ev] = retains;
        } else {
          delete this._cache[ev];
        }
      }

      return this;
    },

    /**
     * Emit/trigger events
     * @return {self}
     */
    emit: function(){
      var args = Array.prototype.slice.call(arguments),
        events = splitEvents(args[0]),
        argsToPass,
        e,
        ev,
        handlers;

      args.splice(0, 1);
      argsToPass = args;

      for (e = 0; e < events.length; e++) {
        ev = events[e];
        handlers = this._cache[ev] || [];
        for ( var i = 0; i < handlers.length; i++ ) {
          switch ( argsToPass.length ) {
            case 0:
              handlers[i]();
              break;
            case 1:
              handlers[i](argsToPass[0]);
              break;
            case 2:
              handlers[i](argsToPass[0], argsToPass[1]);
              break;
            case 3:
              handlers[i](argsToPass[0], argsToPass[1], argsToPass[2]);
              break;
            default:
              handlers[i].apply(null, argsToPass);
              break;
          }
        }
      }

      return this;
    }

  };

  return Shout;

}).call(this);

if ( typeof exports !== 'undefined' ) {
  if ( typeof module !== 'undefined' && module.exports ) {
    exports = module.exports = Shout;
  }
  exports.Shout = Shout;
}
