/*global module:false*/
module.exports = function(grunt) {

  function loadConfig ( name ) {
    return require('./grunt-config/' + name);
  }

  grunt.initConfig({
    jshint: loadConfig('jshint'),
    qunit: loadConfig('qunit'),
    benchmark: loadConfig('benchmark')
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-qunit-istanbul');
  grunt.loadNpmTasks('grunt-benchmark');

  grunt.registerTask('default', ['jshint', 'qunit', 'benchmark']);

};
