var config = require("../shared/models/config");
var el = require("../shared/models/el");
var httpModule = require("http");
var observableModule = require("data/observable");
var observableArray = require("data/observable-array");
var viewModule = require("ui/core/view");

var horses = new observableArray.ObservableArray([]);
var pageData = new observableModule.Observable();
var page;

exports.load = function(args) {
	page = args.object;
    pageData.set("horse", "");
    pageData.set("horses", horses);
	page.bindingContext = pageData;

    // Empty the array for subsequent visits to the page
	while (horses.length) {
		horses.pop();
	}
    loadHorses();
};

exports.add = function() {
    // Dismiss the keyboard before adding to the list
    viewModule.getViewById(page, "horse").dismissSoftInput();

    addHorse(pageData.get("horse"));

    // Clear the text field
    pageData.set("horse", "");
};
/** hardcoded horses
function addHorse( horse ) {
    httpModule.request({
        url: "http://api.everlive.com/v1/" + config.apiKey + "/Horses",
        method: "POST",
        content: JSON.stringify({ Name: horse }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then( function( result ) {
        horses.push({ name: horse });
    });
};

function loadHorses() {
    httpModule.getJSON({
        url: "http://api.everlive.com/v1/" + config.apiKey + "/Horses",
        method: "GET"
    }).then(function(result) {
        result.Result.forEach(function(horse) {
            horses.push({ name: horse.Name });
        });
    });
};
**/

function loadHorses() {
    el.data("Horses").get().then(function(data) {
        data.result.forEach(function(horse) {
            horses.push({ name: horse.Name });
        });
    });
}

function addHorse(horse) {
    el.data("Horses").create({
        Name: horse
    }).then( function(result) {
        horses.push({ name: horse });
    });
}
