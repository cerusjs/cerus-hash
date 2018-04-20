module.exports = function() {
	var plugin = {};
	var package = require("./package.json");
	var hash;

	plugin.name = package["name"];
	plugin.version = package["version"];
	plugin.dependencies = [
		"cerus-promise"
	];

	plugin._init = function(cerus) {
		hash = new (require("./lib/hash"))(cerus);
	}

	plugin.hash = function() {
		return hash;
	}

	return plugin;
}