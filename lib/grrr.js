/*
 * grrr
 * https://github.com/LucM/grrr
 *
 * Copyright (c) 2014 Luc Momal
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var _tasks = [];
  var _registerTask = [];

  var initConfig = function() {
    var _config = {};
    // For each task
    for(var i = 0; i < _tasks.length; i++) {
      var task = _tasks[i];

      _config[task.name] = task.getConfig();

    }
  };

  var registerTask = function(name, tasks) {
    _registerTask.push({ name: name, tasks: tasks});
  };

  var run = function() {
    grunt.initConfig(initConfig());
    for(var i = 0; i < _registerTask.length; i++) {
      grunt.registerTask(_registerTask[i].name, _registerTask[i].tasks);
    }
  };


  function Task(lib, name) {
    grunt.loadNpmTasks('lib');
    this.name = name;
    this.configs = [];
    _tasks.push(this);
  }

  Task.prototype.config = function(name, config) {
    this.configs.push({ name: name, config: config});
    return this.name + ':' + name;
  };


  Task.prototype.getConfig = function() {
    var toReturn = {};

    for(var i = 0; i < this.configs.length; i++) {
      var config = this.configs[i];
      toReturn[config.name] = config.config;
    }

    return toReturn;
  };

  return {
    Task: Task,
    initConfig: initConfig,
    registerTask: registerTask
  };
};
