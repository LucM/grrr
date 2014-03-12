'use strict';

var grunt = {
  loadNpmTasks: function() {},
  registerTask: function() {},
  initConfig: function() {}
};

var grrr = require('../lib/grrr.js')(grunt);

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

suite('Module', function(){
  test('#grrr', function(done){
    assert.equal(typeof grrr, 'object');
    done();
  });

});

suite('Task', function(){
  test('#Task', function(done){
    assert.equal(typeof grrr.Task, 'function');
    done();
  });

  test('#Task config', function(done){
    var task = new grrr.Task('fakelib', 'task');

    assert.equal(typeof task.config, 'function');
    task.config('subconfig', {});
    assert.equal(task.configs.length, 1);
    assert.equal(task.configs[0].name, 'subconfig');
    assert.equal(typeof task.configs[0].config, 'object');

    assert.deepEqual(task.getConfig(), { subconfig: {} });

    task.config('foo', { bar: true });
    assert.deepEqual(task.getConfig(), { subconfig: {}, foo: { bar: true } });

    done();
  });

});