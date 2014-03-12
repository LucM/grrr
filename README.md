# grrr [![Build Status](https://secure.travis-ci.org/LucM/grrr.png?branch=master)](http://travis-ci.org/LucM/grrr)

A simply way to split grunt config for a better readability

## Getting Started
Install the module with: `npm install grrr --save-dev`

```javascript

'use strict';

module.exports = function (grunt) {
  var grrr = require('grrr');
  
  var copy = new grrr.Task('grunt-contrib-copy', 'copy');
  var clean = new grrr.Task('grunt-contrib-clean', 'clean');
  
  grrr.registerTask('default', [
    clean.config('all', ['dist/']),
    copy.config('html', {
      src: 'src/*',
      dest: 'dest/',
    })
  ]);
  
  grrr.registerTask('html', [
    'copy::html'
  ]);
  
  grrr.run();
};

```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
- **v0.0.1**, *TBD*
    - Big Bang
    
## License
Copyright (c) 2014 Luc Momal. Licensed under the MIT license.
