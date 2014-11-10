module.exports = function(grunt) {
  require('time-grunt')(grunt);
  var config = {
    shell: {
        ungit: {
            command: 'ungit'
        },
        server: {
            command: 'fast-http 80'
        }
    },
    usemin: {
        html: ['index.html']
    },
    htmlmin: {
            dist: {
              options: {
                removeComments: true,
                collapseWhitespace: true
              },
              files: {
                'index.html': 'index.html'
              }
          }
    },
    copy: {
      main: {
          expand: true,
          cwd: 'dev/',
          src: ['**/*.html', 'styles/*.css'],
          dest: ''
      }
    },
    concat: {
        main:{
          files:[
             {
              dest: 'scripts/scripts.js',
              src: [ 'dev/scripts/angular.min.js', 'dev/scripts/app.js' ]
              }
             ]
        }
    },
    uglify:{
      main: {
        files: [
                  {
                    dest: 'scripts/scripts.js',
                    src: [ 'scripts/scripts.js' ]
                  }
               ]
             }
       },
      cssmin: {
        main: {
          files: {
            'styles/styles.css': ['styles/styles.css']
          }
        }
      },
      autoprefixer: {
          main: {
            expand: true,
            flatten: true,
            src: 'styles/*.css',
            dest: 'styles/'
          }
      },
      uncss: {
        main: {
          files: {
            'styles/styles.css': ['index.html']
          }
        }
      }
};

  grunt.initConfig(config);

  // Load all Grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['copy', 'concat', 'uglify', 'uncss', 'cssmin', 'autoprefixer', 'usemin', 'htmlmin']);
  grunt.registerTask('test', ['default', 'shell:server']);
  grunt.registerTask('commit', ['default', 'shell:ungit']);
};