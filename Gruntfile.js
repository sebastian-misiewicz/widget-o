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
            },
            vendor: {
                src: [ 
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-resource/angular-resource.min.js',
                    'bower_components/angular-md5/angular-md5.min.js',
                    'bower_components/angular-sanitize/angular-sanitize.js',
                    'bower_components/jquery-ui/jquery-ui.min.js',
                    'bower_components/angular-ui-sortable/sortable.js',
                    'bower_components/angular-ui-tinymce/src/tinymce.js',
                    'bower_components/angular-translate/angular-translate.js',
                    'bower_components/blueimp-load-image/js/load-image.all.min.js',
                    'bower_components/blueimp-canvas-to-blob/js/canvas-to-blob.min.js',
                    'bower_components/blueimp-file-upload/js/jquery.fileupload.js',
                    'bower_components/blueimp-file-upload/js/jquery.fileupload-process.js',
                    'bower_components/blueimp-file-upload/js/jquery.fileupload-image.js',
                    'bower_components/blueimp-file-upload/js/jquery.fileupload-audio.js',
                    'bower_components/blueimp-file-upload/js/jquery.fileupload-video.js',
                    'bower_components/blueimp-file-upload/js/jquery.fileupload-validate.js',
                    'bower_components/blueimp-file-upload/js/jquery.fileupload-angular.js'
                    ],
                dest: 'dist/vendor.js'
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
                    mangle: false,
                    compress: {
                        drop_console: true
                    }
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
        'jshint', 
        'concat:dist',
        'concat:vendor',
        'copy:login',
        'uglify:dist',
        'clean:temp']);

};