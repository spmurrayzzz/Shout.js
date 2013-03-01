Shout.js
========

A quick and dirty pub/sub messaging plugin inspired by the Backbone.js events framework.  I mainly wrote this because I wanted this type of functionality divorced from any of the larger frameworks (like jQuery or Backbone).

## Usage

To subscribe:

```
Shout.listen('foo', function(){
	alert('bar');
});
```

To publish:

```
Shout.yell('foo');
```

To unsubscribe:

```
Shout.deaf('foo');
```