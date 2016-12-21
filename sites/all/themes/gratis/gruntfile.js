module.exports = function (grunt) {
  require('time-grunt')(grunt);
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // Define paths.
    paths: {
      sass: 'css-source',
      devCSS: 'css'
    }, // paths

    uglify: {
      global: {
        files: {
          "js/site.min.js": ['js-source/*.js']
        }
      }
    }, // uglify

    csscomb: {
      options: {
        config: 'csscomb.json'
      },
      dynamic_mappings: {
        expand: true,
        cwd: 'css',
        src: ['*.css', '!*.min.css'], // Pattern(s) to match.
        dest: 'css'
      }
    },

    stripCssComments: {
      global: {
        files: [{
          expand: true,
          src: ['css/*.css']
        }]
      }
    }, // stripCssComments

    sass: {
      global: {
        options: {
          sourceMap: true,
          sourceComments: false,
          outputStyle: 'expanded',
        },
        files: [{
          expand: true,
          cwd: '<%= paths.sass %>/',
          src: ['**/*.scss'],
          dest: '<%= paths.devCSS %>/',
          ext: '.css'
        },
        ],
      }
    }, // sass

    watch: {
      options: {
        livereload: true
      },
      site: {
        files: ['templates/**/*.tpl.php', 'js/**/*.{js,json}', 'css/*.css', 'images/**/*.{png,jpg,jpeg,gif,webp,svg}']
      },
      js: {
        files: ['js-source/*.js'],
        tasks: ["uglify"]
      },
      css: {
        files: ['css-source/**/*.scss'],
        tasks: ["sass", "csscomb"]
      }
    } // watch

  });
  require("load-grunt-tasks")(grunt);
  grunt.registerTask("default", ["sass", "csscomb", "watch"]);
};
