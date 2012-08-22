require.config({
    paths:{
        "jquery":"lib/jquery-1.8.0",
        "underscore":"lib/underscore",
        "backbone":"lib/backbone",
        "bootstrap":"../plugins/bootstrap/js/bootstrap"
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

