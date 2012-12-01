/*
 *	Shout.js
 *
 *	A quick and dirty pub/sub messaging plugin 
 *	inspired by the Backbone.js events framework.
 *
 *	Author: Stephen Murray
 *	Shout.js may be freely distributed under the MIT license.
 */

;(function(){
	
	// Array of callbacks sorted by event keys
	var _callbacks,

	// Regex for the event string delimiter
	_delim = /\s+/,

	_each = function(stuff, callback){

	}

	;

	// Namespace our global and tack it on to `window`
	var Shout = this.Shout = {

		// Binds event(s) to a given callback
		listen: function(events, callback){
			var cbs, ev, sub;
			if (!callback || !events) return;

			events = events.split(_delim);
			cbs = _callbacks || (_callbacks = {});

			while (ev = events.shift()) {
				sub = cbs[ev] || (cbs[ev] = []);
				sub.push(callback);
			}
		},

		// Unbinds event(s)
		deaf: function(events){
			var cbs, ev, sub;
			if (!events) return;

			events = events.split(_delim);

			while (ev = events.shift()) {
				delete _callbacks[ev];
			}
		},

		// Triggers all callbacks associated with event(s)
		yell: function(events){
			var cbs, ev, sub;
			if (!events) return;

			events = events.split(_delim);

			while (ev = events.shift()) {
				sub = _callbacks[ev];
				for (var i = sub.length - 1; i >= 0; i--)
					sub[i]();
			}
		},

		// Registers custom namespaces to existing methods
		register: function(newNS, bindToNS){
			if (Shout[bindToNS])
				Shout[newNS] = Shout[bindToNS];
		}

	};

	// Common pub/sub aliases
	Shout.on = Shout.bind = Shout.listen;
	Shout.off = Shout.unbind = Shout.deaf;
	Shout.trigger = Shout.yell;

}).call(this);
