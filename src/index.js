window.getParams = function() {
    var queryDict = {};
    location.search.substr(1).split("&").forEach(function(item) {
        let parts = item.split("=");
        queryDict[parts[0]] = parts[1] === undefined ? undefined : decodeURIComponent(item.split("=")[1]);
    });
    return queryDict;
};

//window.process = require("process");
window.mj = require("mathjs");
window.GD = require("gradient-descent");
window.MP = require("minimize-powell");
window.BFGS = require("bfgs-algorithm");
//window.Optimization = require("optimization").Optimization;
window.THREE = require("three");
require("./test.js");

require("aframe-quick-ui");
require("./components/position-emitter.js");