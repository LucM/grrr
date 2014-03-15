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

  /**
  *
  * Merge all config
  *
  **/
  var initConfig = function() {
    var _config = {};
    // For each task
    for(var i = 0; i < _tasks.length; i++) {
      var task = _tasks[i];
      _config[task.name] = task.getConfig();
    }
    return _config;
  };

  /**
  *
  * Add a new task in the register task array
  *
  **/
  var registerTask = function(name, tasks) {
    _registerTask.push({ name: name, tasks: tasks});
  };

  /**
  *
  * Finally set-up grunt
  *
  **/
  var run = function() {
    grunt.initConfig(initConfig());
    for(var i = 0; i < _registerTask.length; i++) {
      grunt.registerTask(_registerTask[i].name, _registerTask[i].tasks);
    }
  };

  /**
  *
  * Task constructor
  *
  **/
  function Task(name, lib) {
    grunt.loadNpmTasks(lib);
    this.name = name;
    this.configs = [];
    _tasks.push(this);
  }


  /**
  *
  * Add a subtask
  *
  */
  Task.prototype.config = function(name, config) {
    this.configs.push({ name: name, config: config});
    return this.name + ':' + name;
  };

  /**
  *
  * return the configuration of the given task
  *
  **/
  Task.prototype.getConfig = function() {
    var toReturn = {};

    for(var i = 0; i < this.configs.length; i++) {
      var config = this.configs[i];
      toReturn[config.name] = config.config;
    }

    return toReturn;
  };


  /**
  *
  * Public API
  *
  **/
  return {
    Task: Task,
    initConfig: initConfig,
    registerTask: registerTask,
    run: run
  };
};
