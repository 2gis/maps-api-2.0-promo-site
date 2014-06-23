var data = require('./cafeHeat');

module.exports = function(map, app) {
    if (map.heat) {
        return map.addLayer(map.heat);
    }

    app.plugins.heat.then(function() {
        map.heat = DG.heatLayer(data, {radius: 25}).addTo(map);
    });

    return map;
};