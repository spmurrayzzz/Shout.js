Shout.js
========

[![Build Status](https://travis-ci.org/spmurrayzzz/Shout.js.png?branch=master)](https://travis-ci.org/spmurrayzzz/Shout.js)

Yet another pub/sub implementation.

## Usage

```javascript
var vent = new Shout();
```

##### Shout.on( events, handler1[, handler2, ...] )

```javascript
vent.on('whine', function( arg ) {
  console.log('enough with the' + arg + 'already');
});
```

##### Shout.emit( events[, arg1, arg2, ...] )

```javascript
vent.emit('whine', 'Miley');
// 'enough with the Miley already'
```

##### Shout.off( events[, handler1, handler2, ...] )

```javascript
vent.off('whine');
```

## To contribute

- Get set up

```bash
npm install -g grunt-cli
npm install
```

- Run the lint/test suite

```bash
grunt
```

- Submit a pull request!
