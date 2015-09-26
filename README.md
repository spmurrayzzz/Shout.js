Shout.js
========

[![Build Status](https://travis-ci.org/spmurrayzzz/Shout.js.png?branch=master)](https://travis-ci.org/spmurrayzzz/Shout.js)

Yet another pub/sub implementation.

## To install via Bower

```bash
bower install shout
```

## Usage

```javascript
var vent = new Shout();
```

##### Shout.prototype.on( events, handler )

```javascript
vent.on('whine', function( arg ) {
  console.log('enough with the' + arg + 'already');
});
```

##### Shout.prototype.emit( events[, arg1, arg2, ...] )

```javascript
vent.emit('whine', 'Miley');
// 'enough with the Miley already'
```

##### Shout.prototype.off( events[, handler ] )

```javascript
vent.off('whine');
```

##### Shout.prototype.once( events, handler )

```javascript
vent.once('whine' function() {
  console.log('This callback will only fire once.');
});
```

## To contribute

- Get set up

```bash
sudo npm install -g grunt-cli
npm install
```

- Run the lint/test suite

```bash
grunt
```

- Submit a pull request!
