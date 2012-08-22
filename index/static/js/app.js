define(
    ["jquery", "underscore","backbone","bootstrap"],
    function ($, _, Backbone) {
        'use strict';
        return {
            initialize:function () {
                var self = this;
                self.init();
                $(document).ready(function () {
                    self.ready();
                });
            },
            init:function(){
                /*realtime code*/
                console.log("app.js init");
            },
            ready:function () {
                /*document ready code*/
                console.log("app.js ready");
            }
        };
    });
