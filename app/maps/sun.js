var data = require('./heatData');

module.exports = function(map) {
	// map.setView([55.696351217825494, 37.6426394592835]);
	map.setView([-37.8839, 175.3745188667], 7);

	if (map.heat) {
		return map.addLayer(map.heat);
	}

	DG.plugin('/vendors/HeatLayer/heatLayer.js').then(function() {
		map.heat = DG.heatLayer(data).addTo(map);
		// var heat = L.heatLayer(latlngs, {radius: 25}).addTo(map);
	}, function(err) {
		console.log(err);
	});

	return map;
};