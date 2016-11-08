module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      development: {
        files: [{
          expand: true, // 支持动态扩展名.
          cwd: 'public/less/', // Src matches are relative to this path.
          src: ['**/*.less'], // Actual pattern(s) to match.
          dest: 'public/stylesheets/', // Destination path prefix.
          ext: '.css', // Dest filepaths will have this extension.
          extDot: 'first' // Extensions in filenames begin after the first dot
        }]
      }
    },
    //watch监视文件的变化，执行对应的任务
    watch: {
      scripts: {
        files: ['**/*.less'],
        tasks: ['less']
      }
    }
  });


  //1,load task plugs
  //2.加载任务插件  
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //任务列表

  grunt.registerTask('default', ['watch']);
}