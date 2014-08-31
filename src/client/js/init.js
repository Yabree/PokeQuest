require.config({
    baseUrl: 'js/',
    paths : {
        jquery : 'lib/jquery',
        underscore : 'lib/underscore',
        crafty      : 'lib/crafty'
    },
    shim : {
        jquery : {
            exports : 'jquery'
        },
        underscore : {
            exports : '_'
        }
    }
});

define(['jquery', 'lib/class', 'lib/modernizr', 'utils', 'underscore', 'crafty'], function($) {
    require(["main"]);
});