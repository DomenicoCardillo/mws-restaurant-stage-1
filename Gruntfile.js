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
};

module.exports = (grunt) => {
  grunt.initConfig(config);
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.registerTask('responsive-img', ['clean', 'responsive_images']);
};