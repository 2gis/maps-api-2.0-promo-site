module.exports = function(map, app) {
	// console.log(app.base.footer);
	var loader = app.base.footer.$('[data-footer-state=page2]'),
		time = loader.find('.lightness-panel__counter'),
		newBar = loader.find('.lightness-panel__version_of_new-api .lightness-panel__progress-bar'),
		oldBar = loader.find('.lightness-panel__version_of_old-api .lightness-panel__progress-bar');

	console.log(time, oldBar, newBar);
	return map;
};