var data = require('./cafeHeat');

module.exports = function(map, app) {
  map.setView([55.755616894047215, 37.60070800781251]);

  if (map.heat) {
    return map.addLayer(map.heat);
  } else {
    app.plugins.heat.then(function() {
      map.heat = DG.heatLayer(data, {radius: 25}).addTo(map);
    });
  }

  return map;
};