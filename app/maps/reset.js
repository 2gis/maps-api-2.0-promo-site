module.exports = function(map) {
	!map.geoclicker.enabled() && map.geoclicker.disable();

	if (map.controls.ruler) {
	    map.removeControl(map.controls.ruler);
	    map.controls.ruler = null;
	}

	map.geoclicker._map._popup && map.closePopup(map.geoclicker._map._popup);

	return map;
};