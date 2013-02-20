require.config
  paths:
    "jquery": "lib/jquery.min"
    "underscore": "lib/underscore-min"
    "backbone": "lib/backbone-min"
    "bootstrap": "lib/bootstrap.min"
    "foundation": "lib/foundation/foundation.min",
    "foundation-app": "lib/foundation/app",
    "modernizr": "lib/foundation/modernizr.foundation",
    "orbit": 'lib/foundation/jquery.orbit'

  baseUrl: "/static/js"

  shim:
    "underscore":
      exports: '_'

    "backbone":
      deps: [
        "underscore"
        "jquery"
      ]
      exports: "Backbone"

    "bootstrap":
      deps: ["jquery"]

    "modernizr":
      exports: "Modernizr"

    "jquery.placeholder":
      deps:["jquery"]

    "foundation":
      deps:[
        "lib/foundation/jquery.placeholder"
        "modernizr"
      ]

    "foundation-app":
      deps:["foundation"]

    "orbit":
      deps:["jquery"]


require ["app"], (app)->
  app.initialize()
