Shout.js
========

A quick and dirty pub/sub messaging plugin inspired by the Backbone.js events framework.  I mainly wrote this because I wanted this type of functionality divorced from any of the larger frameworks (like jQuery or Backbone).

## Usage

To subscribe:

```
Shout.listen('foo', function(){ // Binds anonymous handler to event 'foo'
	alert('bar');
});
```

To publish:

```
Shout.yell('foo'); // Triggers all handlers bound to 'foo'
```

To unsubscribe:

```
Shout.deaf('foo'); // Unbinds all handlers bound to 'foo'
```

Shout also supports unbinding specific handlers:

```
var dothis = function(){
    console.log('this');
};

var dothat = function(){
    console.log('that');
};

Shout.on('foo', dothis);
Shout.on('foo', dothat);

Shout.yell('foo'); // Logs 'that' and 'this'

Shout.off('foo', dothis);
Shout.yell('foo'); // Logs 'that'

```