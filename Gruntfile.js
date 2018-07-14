/**
 * Grunt is used for generate responsive images
 * This plugin use GraphicsMagick (gm), for download it:
 * https://github.com/andismith/grunt-responsive-images
 */

const config = {
  clean: {
    build: {
      src: [
        'img/**/*.jpg',
        '!img/original/*.jpg',
      ]
    }
  },
  responsive_images: {
    dev: {
      options: {
        engine: 'gm',
        sizes: [{
          width: 670,
          quality: 85,
        }, {
          width: 570,
          quality: 85,
        }, {
          width: 470,
          quality: 85,
        }],
      },
      files: [{
        expand: true,
        src: ['*.{gif,jpg,png}'],
        cwd: 'img/original',
        custom_dest: 'img/{%= width %}/',
      }]
    }
  },
  // WebP configuration
  cwebp: {
    dynamic: {
      options: {
        q: 70,
      },
      files: [{
        expand: true,
        cwd: 'img/',
        src: ['**/*.{png,jpg,gif}'],
        dest: 'img/',
      }]
    },
  },
  cssmin: {
    target: {
      files: [{
        expand: true,
        src: './css/styles.css',
        dest: 'public',
        ext: '.css'
      }]
    }
  }
};

module.exports = (grunt) => {
  grunt.initConfig(config);
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-cwebp');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  
  grunt.registerTask('images', ['clean', 'responsive_images', 'cwebp']);
  grunt.registerTask('css', ['cssmin']);
};