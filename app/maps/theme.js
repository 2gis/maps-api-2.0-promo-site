var $ = require('jquery');

module.exports = function(map, skin) {
	map.setView([54.980156831455, 82.897440725094], 18);
	var css = $('head [rel=stylesheet]:last'),
		url = css.attr('href'),
		regex = /skin=(\w*)/,
		test = url.match(regex);

	!map.geoclicker.enabled() && map.geoclicker.enable();

	if (test) {
		css.attr('href', url.replace(regex, '&skin=' + skin));
	} else {
		css.attr('href', url + '&skin=' + skin);
	}

	return map;
};