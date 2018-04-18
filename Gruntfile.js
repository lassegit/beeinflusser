module.exports = function(grunt) {
  'use strict';
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        sourceMap: false,
      },
      dist: {
        files: {
          'assets/style.css': 'assets/sass/style.scss',
        }
      }
    },
    assets_inline: {
      all: {
        options: {
          inlineImg: false,
          inlineSvg: true,
          inlineSvgBase64: true,
          minify: true,
        },
        files: {
          'index.html': 'assets/index.html'
        }
      },
    },
    htmlmin: {
      dist: {
        options: { // Reference: https://github.com/kangax/html-minifier#options-quick-reference
          removeComments: true,
          conservativeCollapse: false,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
        },
        files: {
          'index.html': 'index.html'
        }
      }
    },
    replace: {
      dist: {
        options: {
          patterns: [
            {
              match: 'buildstamp',
              replacement: '<%= new Date().toUTCString() %>'
            }
          ]
        },
        files: [
          {src: ['index.html'], dest: 'index.html'}
        ]
      }
    },
    watch: {
      scripts: {
        files: ['assets/**/*.html', 'assets/**/*.scss', 'assets/**/*.svg'],
        tasks: ['sass','assets_inline', 'htmlmin', 'replace'],
      }
    },
    connect: {
      server: {
        options: {
          port: 8080,
          livereload: false,
          keepalive: false,
        }
      }
    },
  });

  grunt.registerTask('build', ['sass', 'assets_inline', 'htmlmin', 'replace']);
  grunt.registerTask('serve', ['connect', 'watch']);
};