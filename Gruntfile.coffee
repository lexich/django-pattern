color = 
  red: '\u001b[31m'
  blue: '\u001b[34m'
  reset: '\u001b[0m'

module.exports = (grunt) ->
  grunt.initConfig
    components: "components"
    resource:
      path: "index/static"
      js: "<%= resource.path %>/js"
      css: "<%= resource.path %>/css"
      less: "<%= resource.path %>/less"
      img: "<%= resource.path %>/img"
      font: "<%= resource.path %>/font"
      coffee: "<%= resource.path %>/coffee"

    less:
      style:
        src: ["<%= resource.less %>/style.less"]
        dest: "<%= resource.css %>/style.css"
        options:
          compress: true

    coffee:
      app:
        expand: true
        src: ["*.coffee"]
        dest: "<%= resource.js %>/"
        cwd: "<%= resource.coffee %>/"
        ext: ".js"
        options:
          bare: true

    reload:
      port: 6001
      proxy:
        host: "localhost"
        port: 8000

    watch:
      less:
        files: "<%= resource.less %>/*.less"
        tasks: ["less", "reload"]

      coffee:
        files: "<%= resource.coffee %>/*.coffee"
        tasks: ["coffee", "reload"]

    copy:
      dist:
        files: [
          flatten: true
          expand: true
          src: ["<%= components %>/jquery/jquery.min.js"]
          dest: "<%= resource.js %>/lib/"
        ,
          flatten: true
          expand: true
          src: ["<%= components %>/backbone/backbone-min.js"]
          dest: "<%= resource.js %>/lib/"
        ,
          flatten: true
          expand: true
          src: ["<%= components %>/underscore/underscore-min.js"]
          dest: "<%= resource.js %>/lib/"
        ,
          flatten: true
          expand: true
          src: ["<%= components %>/requirejs/require.js"]
          dest: "<%= resource.js %>/lib/"
        ,
          flatten: true
          expand: true
          src: ["<%= components %>/bootstrap/docs/assets/js/bootstrap.min.js"]
          dest: "<%= resource.js %>/lib/"
        ,
          flatten: true
          expand: true
          src: ["<%= components %>/html5shiv/dist/*.js"]
          dest: "<%= resource.js %>/lib/"
        ,
          flatten: true
          expand: true
          src: ["<%= components %>/normalize-css/*.css"]
          dest: "<%= resource.css %>/"
        ,
          flatten: true
          expand: true
          src: ["<%= components %>/bootstrap/img/*"]
          dest: "<%= resource.img %>/"
        ]

    requirejs:
      compile:
        options:
          name: "main"
          baseUrl: "index/static/js"
          out: "index/static/js/main.compiled.js"
          mainConfigFile: "index/static/js/main.js"

    clean:
      css: "<%= resource.css %>"
      img: "<%= resource.img %>"
      js: "<%= resource.js %>/lib"

    inject:
      dev:
        content: """
        <script data-main=\"{% static 'js/main' %}?t=#{(new Date()).getTime()}\" src=\"{% static 'js/lib/require.js' %}\"></script>
        <script>__reloadServerUrl="ws://localhost:6001";</script>
        <script src="//localhost:6001/__reload/client.js"></script>
        """
        path: "index/templates/base.html"
      rc:
        content: "<script data-main=\"{% static 'js/main.compiled' %}?t=#{(new Date()).getTime()}\" src=\"{% static 'js/lib/require.js' %}\"></script>"
        path: "index/templates/base.html"
      clean:
        content: ""
        path: "index/templates/base.html"

  grunt.registerTask "default", ["clean", "copy", "less", "coffee", "inject:rc", "requirejs"]
  grunt.registerTask "dev", ["clean", "copy", "less", "coffee", "inject:dev", "watch"]
  grunt.registerTask "bower", ->
    done = @async()
    input = process.argv
    cwd = "install"
    require("bower").commands[cwd].line(input).on("data", (data) ->
      console.log data  if data
    ).on("end", (data) ->
      console.log data  if data
      done()
    ).on "error", (err) ->
      console.error err.message
      done()

  grunt.registerMultiTask "inject", ->    
    fs = require 'fs'
    template = "<!-- inject { -->:var<!-- } inject -->"    
    pattern = new RegExp template.replace(":var","([\\s\\S]*)"), "g"
    content = template.replace(":var", @data.content)
    dataPath = if grunt.util._.isString(this.data.path) then [@data.path] else @data.path
    dataPath.forEach (path)->
      data = grunt.file.read path      
      data = if pattern.test(data)
        grunt.log.writeln "#{color.red}Meta tag found"
        data.replace pattern, content
      else
        grunt.log.writeln "#{color.red}Meta tag not found"
        data.replace "</body>", "\n#{content}\n</body>"  
      grunt.file.write path, data
      grunt.log.writeln "#{color.blue}Process: #{color.reset}#{path}"

  grunt.loadNpmTasks "grunt-contrib-less"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-livereload"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-requirejs"
