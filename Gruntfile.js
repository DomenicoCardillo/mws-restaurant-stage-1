/**
 * Grunt is used for generate responsive images
 * This plugin use GraphicsMagick (gm), for download it:
 * https://github.com/andismith/grunt-responsive-images
 */

const config = {
  responsive_images: {
    dev: {
      options: {
        engine: 'gm',
        sizes: [{
          width: 800,
          quality: 85,
        }, {
          width: 400,
          quality: 85,
        }, {
          width: 200,
          quality: 85,
        }],
      },
      files: [{
        expand: true,
        src: ['*.{gif,jpg,png}'],
        cwd: 'src/img/',
        dest: 'img/',
      }]
    }
  },
};

module.exports = (grunt) => {
  grunt.initConfig(config);
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.registerTask('responsive-img', ['responsive_images']);
};