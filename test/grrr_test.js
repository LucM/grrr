'use strict';

var grunt = {
  loadNpmTasks: function() {},
  registerTask: function() {},
  initConfigargs: {},
  initConfig: function(args) {
    this.initConfigargs = args;
  }
};

/*
  ======== A Handy Little Mocha Reference ========
  https://github.com/visionmedia/mocha/

  Test assertions:
    assert.fail(actual, expected, message, operator)
    assert(value, message), assert.ok(value, [message])
    assert.equal(actual, expected, [message])
    assert.notEqual(actual, expected, [message])
    assert.deepEqual(actual, expected, [message])
    assert.notDeepEqual(actual, expected, [message])
    assert.strictEqual(actual, expected, [message])
    assert.notStrictEqual(actual, expected, [message])
    assert.throws(block, [error], [message])
    assert.doesNotThrow(block, [message])
    assert.ifError(value)

    Apart from assert, Mocha allows you to use any of the following assertion libraries:
    - should.js
    - chai
    - expect.js
    - better-assert
*/

var assert = require('assert');


suite('Task Object', function(){

  var grrr = require('../lib/grrr.js')(grunt);

  test('Constructor', function(done) {
    assert.equal(typeof grrr.Task, 'function');

    var task = new grrr.Task('name', 'lib');
    assert.equal(task.name, 'name');
    assert.equal(task.configs.length, 0);
    done();
  });

  test('config()', function(done) {
    var task = new grrr.Task('fakelib', 'task');
    task.config('foo', { foo: 'bar' });

    assert.deepEqual(task.configs[0], {name: 'foo', config: { foo: 'bar'}});
    assert.deepEqual(task.config('bar', { bar: 'foo' }), 'fakelib:bar');

    done();

  });

  test('getConfig()', function(done) {
    var task = new grrr.Task('foo', 'task');
    task.config('first', { foo: 'bar' });
    task.config('second', { bar: 'foo'});

    assert.equal(typeof task.getConfig, 'function');
    assert.deepEqual(task.getConfig(), {
      first: { foo: 'bar' },
      second: { bar: 'foo'}
    });

    done();
  });
});


suite('Main functions', function(){

  var grrr = require('../lib/grrr.js')(grunt);
  var foo = new grrr.Task('foo', 'foo');
  foo.config('foo1', {foo: 'foo'});
  foo.config('foo2', {foo: 'foo'});

  var bar = new grrr.Task('bar', 'bar');
  bar.config('bar', {bar: 'bar'});

  var expectedConfig = {
    foo: { foo1: { foo: 'foo'}, foo2: { foo: 'foo'} },
    bar: { bar: { bar: 'bar' } }
  };

  test('initConfig()', function(done) {
    assert.equal(typeof grrr.initConfig, 'function');
    assert.deepEqual(grrr.initConfig(), expectedConfig);
    done();
  });

  test('registerTask()', function(done) {
    assert.equal(typeof grrr.registerTask, 'function');
    done();
  });

  test('run()', function(done) {
    grrr.run();
    assert.deepEqual(grunt.initConfigargs, expectedConfig);
    done();
  });

});

