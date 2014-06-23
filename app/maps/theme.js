var $ = require('jquery');
require('../../polyfill/indexOf');

module.exports = function(map, skin) {
	map.setView([54.980156831455, 82.897440725094], 18);
	var css = $('head [rel=stylesheet]').filter(function() {
			return $(this).attr('href').indexOf('maps.api') > -1;
		}),
		url = css.attr('href'),
		regex = /skin=(\w*)/,
		test = url.match(regex);

	!map.geoclicker.enabled() && map.geoclicker.enable();
	if (!map.controls.ruler) {
	    map.controls.ruler = DG.control.ruler().addTo(map);
	}

	// map.closePopup(map.geoclicker._map._popup);
	map.fire('click', {latlng: new DG.LatLng(54.98018731490755, 82.89802551269531)});

	// map.on('click', function(e) {
	// 	console.log(e.latlng);
	// });

	css.attr('href', test ? url.replace(regex, '&skin=' + skin) : (url + '&skin=' + skin));

	return map;
};