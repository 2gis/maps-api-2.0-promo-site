module.exports = function(map) {

	if (map.clusters && map.hasLayer(map.clusters)) {
		map.removeLayer(map.clusters);
	}

	if (map.heat && map.hasLayer(map.heat)) {
		map.removeLayer(map.heat);
	}

	!map.geoclicker.enabled() && map.geoclicker.disable();

	if (map.controls.ruler) {
	    map.removeControl(map.controls.ruler);
	    map.controls.ruler = null;
	}

	map.geoclicker._map._popup && map.closePopup(map.geoclicker._map._popup);

	return map;
};