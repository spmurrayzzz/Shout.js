Shout.js
========

Yet another pub/sub implementation.

[![Build Status](https://travis-ci.org/spmurrayzzz/Shout.js.png?branch=master)](https://travis-ci.org/spmurrayzzz/Shout.js)

## Usage

##### shout.on( events, handler1[, handler2, ...] )

```javascript
shout.on('whine', function( arg ) {
  console.log('enough with the' + arg + 'already');
});
```

##### shout.emit( events[, arg1, arg2, ...] )

```javascript
shout.emit('whine', 'Miley');
// 'enough with the Miley already'
```

##### shout.off( events[, handler1, handler2, ...] )

```javascript
shout.off('whine');
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
