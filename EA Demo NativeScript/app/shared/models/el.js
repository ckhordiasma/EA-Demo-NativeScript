var config = require("./config");
var Everlive = require("../../lib/everlive");
module.exports = new Everlive(config.apiKey);
