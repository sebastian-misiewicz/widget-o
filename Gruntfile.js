'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
             all: [ 'js/*.js', 'js/**/*.js' ]
        },
        html2js: {
            dist: {
                src: [ 'html/*.html' ],
                dest: 'tmp/templates.js'
            }
        },
        
        concat: {
            dist: {
                src: [ 'js/angular.*.js', 'tmp/*.js' ],
                dest: 'dist/app.js'
            }
        },
        copy: {
            login: {
                src: 'js/jquery.login.js',
                dest: 'dist/login.js'
            }
        },
        
        uglify: {
            dist: {
                files: {
                    'dist/app.js': [ 'dist/app.js' ],
                    'dist/login.js': ['dist/login.js']
                },
                options: {
                    mangle: false
                }
            }
        },
        clean: {
            temp: {
                src: [ 'tmp' ]
            }
        }
                // Task configuration will be written here
    });
    
    // Loading of tasks and registering tasks will be written here
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-copy');
    
    grunt.registerTask('minified', [ 'bower', 'connect:server', 'watch:min' ]);
    grunt.registerTask('package', [
        'jshint', 'concat:dist', 'copy:login', 'uglify:dist', 'clean:temp']);

};