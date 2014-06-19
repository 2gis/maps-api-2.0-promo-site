var theme = require('./theme');

module.exports = function(map) {
	// map.setView([54.980156831455, 82.137440225094]);

	theme(map, 'light');

	return map;
};