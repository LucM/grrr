# Grrr [![Build Status](https://secure.travis-ci.org/LucM/grrr.png?branch=master)](http://travis-ci.org/LucM/grrr)

A simply way to split grunt config for a better readability

## Installation
Install the module with: `npm install grrr --save-dev`

## Usage
```javascript

'use strict';

module.exports = function (grunt) {
  var grrr = require('grrr');
  
  var copy = new grrr.Task('grunt-contrib-copy', 'copy');
  var clean = new grrr.Task('grunt-contrib-clean', 'clean');
  
  grrr.registerTask('default', [
    clean.config('all', ['dest/']),
    copy.config('html', {
      src: 'src/*',
      dest: 'dest/',
    })
  ]);
  
  grrr.run();
};

```

## Documentation
Create a new Task object
```javascript
var copy = new grrr.Task('grunt-contrib-copy', 'copy');
```

Create a sub-configuration
```javascript
copy.config('html', {
      src: 'src/*',
      dest: 'dest/',
}); // return "copy:html"
```

Register a new task
```javascript
grrr.registerTask('copyhtml', ['copy:html']);
// or
grrr.registerTask('copyhtml', [
  copy.config('html', {
        src: 'src/*',
        dest: 'dest/',
  })
]);

```

Run grrr (actually configure and register tasks for grunt)
```javascript
grrr.run()
```


## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
- **v0.0.1**, *TBD*
    - Big Bang
    
## License
Copyright (c) 2014 Luc Momal. Licensed under the MIT license.
