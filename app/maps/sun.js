var data = require('./cafeHeat');

module.exports = function(map) {
  map.setView([55.755616894047215, 37.60070800781251]);
  	map.on('click', function(e) {
		console.log(e.latlng);
	});

  if (map.heat) {
    return map.addLayer(map.heat);
  } else {
    DG.plugin('/vendors/HeatLayer/heatLayer.js').then(function() {
      map.heat = DG.heatLayer(data, {radius: 25}).addTo(map);
    });
  }

  return map;
};