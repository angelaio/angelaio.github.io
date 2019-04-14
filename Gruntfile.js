module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/js/vendor/*.js', 'src/js/global/*.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      combine: {
        files: {
          'dist/css/global.min.css': ['src/css/**/*.css']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      css: {
        files: 'src/css/*.css',
        tasks: ['cssmin'],
        options: {
          livereload: true
        }
      },
      js: {
        files: 'src/js/global/*.js',
        tasks: ['concat', 'uglify']
      },
      tasks: ['jshint', 'uglify', 'cssmin']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin']);

};