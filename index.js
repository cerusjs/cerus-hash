module.exports = function() {
	var self = {};

	var package = require("./package.json");
	
	self.name = package["name"];
	self.version = package["version"];
	self.dependencies = [
		"cerus-promise"
	];

	var hash = require("./lib/hash")(cerus);

	self.hash = function() {
		return hash;
	}

	return self;
}