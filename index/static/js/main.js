require.config({
    paths:{
        "jquery":"lib/jquery.min",
        "underscore":"lib/underscore-min",
        "backbone":"lib/backbone-min",
        "bootstrap":"lib/bootstrap.min"   
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        bootstrap: {
            deps: ["jquery"]
        }
    }

});

require(["app"],
    function (app) {
        "use strict";
        app.initialize();
    });

