module.exports = function(grunt) {

grunt.initConfig({
  less: {
    style: {
      src: 'index/static/less/style.less',
      dest: 'index/static/css/style.css',
      options: {
        compress: true
      }
    }
  },  
  copy:{
    dist:{
      files:{        
        'index/static/js/lib/':[
          'components/jquery/jquery.min.js',
          'components/backbone/backbone-min.js',
          'components/underscore/underscore-min.js',
          'components/requirejs/require.js',          
          'components/bootstrap/docs/assets/js/bootstrap.min.js',
          'components/html5shiv/dist/*.js'
        ],
        'index/static/css/':[
          'components/normalize-css/normalize.css',
        ],
        'index/static/img/':[
          'components/bootstrap/img/*'
        ]
      },
      options:{
        flatten :true
      }      
    }    
  },  
});

grunt.loadNpmTasks('grunt-less');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.registerTask('default', 'less copy');
};