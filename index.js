module.exports = function() {
	var self = {};

	var package = require("./package.json");
	
	self.name = package["name"];
	self.version = package["version"];
	self.dependencies = [
		"cerus-promise"
	];

	var hash;

	self.init_ = function(cerus_) {
		hash = require("./lib/hash")(cerus_);
	}

	self.hash = function() {
		return hash;
	}

	return self;
}