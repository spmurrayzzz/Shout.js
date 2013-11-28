/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {
          jQuery: true
        }
      },
      shout: {
        src: 'shout.js'
      }
    },
    qunit: {
      options: {
        '--web-security': 'no',
        coverage: {
          src: ['shout.js'],
          instrumentedFiles: 'temp/',
          htmlReport: 'report/coverage',
          coberturaReport: 'report/',
          linesThresholdPct: 85
        }
      },
      all: ['test/**/*.html']
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-qunit-istanbul');

  // Default task.
  grunt.registerTask('default', ['jshint', 'qunit']);

};
