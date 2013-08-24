/*
 *  Shout.js
 *
 *  A quick and dirty pub/sub messaging plugin 
 *  inspired by the Backbone.js events framework.
 *
 *  Author: Stephen Murray
 *  Shout.js may be freely distributed under the MIT license.
 */

;(function(){

    "use strict";
    
    // Array of callbacks sorted by event keys
    var _callbacks,

    // Regex for the event string delimiter
    _delim = /\s+/;


    // Convenience function to get handlers from `arguments`
    function getHandlers(arrArgs) {
        return Array.prototype.slice.call(arrArgs, 1, arrArgs.length);
    }

    // Is `value` in the given `arr` array? Shallow comparison
    function inArray(value, arr) {
        for (var i = arr.length - 1; i >= 0; i--) {
            var val = arr[i];
            if (val === value) {
                return true;
            }
        }
        return false;
    }


    // Namespace our global and tack it on to `window`
    var Shout = this.Shout = {

        // Binds event(s) to a given callback
        listen: function(events, callback){
            var cbs, ev, sub, handlers;
            if (typeof events === 'undefined') {
                return false;
            }

            handlers = getHandlers(arguments);

            events = events.split(_delim);
            cbs = _callbacks || (_callbacks = {});

            while (ev = events.shift()) {
                sub = cbs[ev] || (cbs[ev] = []);
                for (var i = 0; i < handlers.length; i++) {
                    sub.push(handlers[i]);
                }
            }
        },

        // Unbinds event(s)
        deaf: function(events, handle){
            var cbs, ev, sub, handlers;
            if (typeof events === 'undefined') {
                return false;
            }

            handlers = getHandlers(arguments);
            events = events.split(_delim);

            while (ev = events.shift()) {
                if (typeof handle !== 'undefined' ) {
                    for (var i = _callbacks[ev].length - 1; i >= 0; i--) {
                        var cb = _callbacks[ev][i];
                        if (inArray(cb, handlers)) {
                            delete _callbacks[ev][i];
                        }
                    }
                } else {
                    delete _callbacks[ev];
                }
            }
        },

        // Triggers all callbacks associated with event(s)
        yell: function(events, context){
            var cbs, ev, sub;
            if (typeof events === 'undefined') {
                return false;
            }

            events = events.split(_delim);
            context = context || {};

            while (ev = events.shift()) {
                sub = _callbacks[ev];
                if (typeof sub !== 'undefined') {
                    for (var i = sub.length - 1; i >= 0; i--) {
                        if (typeof sub[i] !== 'undefined') {
                            sub[i].call(context);
                        }
                    }
                }
            }
        },

        // Registers custom namespaces to existing methods
        register: function(newNS, bindToNS){
            if (typeof Shout[bindToNS] !== 'undefined') {
                Shout[newNS] = Shout[bindToNS];
            }
        }

    };


    // Common pub/sub aliases
    Shout.on = Shout.bind = Shout.listen;
    Shout.off = Shout.unbind = Shout.deaf;
    Shout.trigger = Shout.shout = Shout.yell;

}).call(this);
