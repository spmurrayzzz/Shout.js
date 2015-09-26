/*
 *  Shout.js
 *
 *  A quick and dirty pub/sub thingamajig for the browser.
 *
 *  Author: Stephen Murray
 *  Shout.js may be freely distributed under the MIT license.
 */

;(function(){

  "use strict";

  var _delim = /\s+/,
    handlerCache = {},
    _eventNameCache = {},
    empty = [],
    globalId = 0;


  function splitEvents( events ) {
    if ( _eventNameCache[ events ] !== undefined ) {
        return _eventNameCache[ events ];
    }

    if ( _delim.test( events ) ) {
      _eventNameCache[ events ] = events.split( _delim );
      return _eventNameCache[ events ];
    } else {
      _eventNameCache[ events ] = [ events ];
      return _eventNameCache[ events ];
    }
  }

  function Shout() {
    var id = ++globalId;
    Object.defineProperty( this, 'shoutId', {
      get: function() {
        return '#' + id;
      },
      writeable: false
    });
    handlerCache[ this.shoutId ] = {};
  }

  Shout.prototype.on = function( ev, fn ) {
    var events = splitEvents( ev ),
      cache = handlerCache[ this.shoutId ];

    events.forEach(function( ev ) {
      ( cache[ ev ] || ( cache[ ev ] = [] ) ).push( fn );
    });

    return this;
  };

  Shout.prototype.emit = function( ev ) {
    var events = splitEvents( ev ),
      args = Array.prototype.slice.call( arguments, 1 ),
      cache = handlerCache[ this.shoutId ],
      self = this;

    events.forEach(function( ev ) {
      ( cache[ ev ] || empty ).forEach(function( handler ) {
        handler.apply( self, args );
      });
    });

    return this;
  };

  Shout.prototype.off = function( ev, fn ) {
    var events = splitEvents( ev ),
      cache = handlerCache[ this.shoutId ];

    events.forEach(function( ev ) {
      var retains;

      if ( typeof fn === 'function' && cache[ ev ] ) {
        retains = cache[ ev ].filter(function( handler ) {
          return handler !== fn;
        });
        cache[ ev ] = retains;
      } else {
        delete cache[ ev ];
      }
    });

    return this;
  };

  Shout.prototype.once = function( ev, fn ) {
    var self = this,
      wrap;

    wrap = function() {
      fn.apply( self, arguments );
      self.off( ev, wrap );
    };

    return this.on( ev, wrap );
  };

  this.Shout = Shout;

  return Shout;

}).call( this );
