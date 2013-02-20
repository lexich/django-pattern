module.exports = function (grunt) {

  grunt.initConfig({
    components: "components",
    resource: {
      path: "index/static",
      js: "<%= resource.path %>/js",
      css: "<%= resource.path %>/css",
      less: "<%= resource.path %>/less",
      img: "<%= resource.path %>/img",
      images: "<%= resource.path %>/images",
      font: "<%= resource.path %>/font",
      coffee: "<%= resource.path %>/coffee"
    },
    less: {
      style: {
        src: '<%= resource.less %>/style.less',
        dest: '<%= resource.css %>/style.css',
        options: {
          compress: true
        }
      }
    },
    coffee:{
      app:{
        src:"<%= resource.coffee %>/*.coffee",
        dest: "<%= resource.js %>",
        options: {
          bare: true
        }
      }
    },
    reload:{
      port: 6001,
      proxy:{
        host:"localhost",
        port:8000
      }
    },
    watch:{
      less:{
        files:"<%= resource.less %>/*.less",
        tasks:["less","reload"]
      },
      coffee:{
        files:"<%= resource.coffee %>/*.coffee",
        tasks:["coffee","reload"]
      },
      templates:{
        files:["templates/*.html","templates/**/*.html","templates/**/**/*.html"],
        tasks:["reload"]
      },
      templates_index:{
        files:["index/templates/*.html","index/templates/**/*.html","index/templates/**/**/*.html"],
        tasks:["reload"]
      }
    },
    copy: {
      dist: {
        files: [
          { src: "<%= components %>/jquery/jquery.min.js", dest: "<%= resource.js %>/lib/" },
          { src: "<%= components %>/backbone/backbone-min.js", dest: "<%= resource.js %>/lib/" },
          { src: "<%= components %>/underscore/underscore-min.js", dest: "<%= resource.js %>/lib/" },
          { src: "<%= components %>/requirejs/require.js", dest: "<%= resource.js %>/lib/" },
          { src: "<%= components %>/bootstrap/docs/assets/js/bootstrap.min.js", dest: "<%= resource.js %>/lib/" },
          { src: "<%= components %>/html5shiv/dist/*.js", dest: "<%= resource.js %>/lib/" },
          { src: "<%= components %>/normalize-css/*.css", dest: "<%= resource.css %>/" },
          { src: "<%= components %>/bootstrap/img/**", dest: "<%= resource.img %>/" }
        ], options: { flatten: true }
      },
      foundation:{
        files:[
          { src: "<%= components %>/foundation/stylesheets/foundation.css", dest: "<%=resource.css %>/"},
          { src: "<%= components %>/foundation/javascripts/*.js", dest: "<%=resource.js %>/lib/foundation/"},
          { src: "<%= components %>/foundation/images/**/**/*.png", dest: "<%= resource.images %>/foundation/orbit/"}
        ], options: { flatten: true }
      },
      orbit:{
        files:[
          { src: "<%= components %>/orbit/orbit*.css", dest: "<%=resource.css %>/orbit.css"},
          { src: "<%= components %>/orbit/jquery.orbit*.js", dest: "<%=resource.js %>/lib/foundation/jquery.orbit.js"}
        ], options: { flatten: true }
      }
    },
    clean: {
      css: "<%= resource.css %>",
      img: "<%= resource.img %>",
      js: "<%= resource.js %>/lib",
      images: "<%= resource.images %>"
    }
  });


  grunt.registerTask('default', 'clean less coffee copy');
  grunt.registerTask("dev","clean less coffee copy watch");
  grunt.registerTask("bower", function () {
    var done = this.async();
    var input = process.argv;
    var cwd = 'install';
    require('bower').commands[cwd].line(input)
      .on('data', function (data) {
        if (data) {
          console.log(data);
        }
      })
      .on('end', function (data) {
        if (data) {
          console.log(data);
        }
        done();
      })
      .on('error', function (err) {
        console.error(err.message);
        done();
      });

  });

  grunt.loadNpmTasks('grunt-less');
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks('grunt-clean');
  grunt.loadNpmTasks("grunt-coffee");
  grunt.loadNpmTasks('grunt-reload');
};