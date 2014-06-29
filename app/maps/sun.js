var data = require('./cafeHeat');

module.exports = function(map, app) {
    map.setView([55.698098749057806, 37.59521484375001], 10)
        .setMaxBounds([
            [56.13330691237569, 38.46725463867188],
            [55.28928256326212, 36.81930541992188]
        ])
        .options.minZoom = 10;

    if (map.heat) {
        return map.addLayer(map.heat);
    }

    app.plugins.heat.then(function() {
        map.heat = L.heatLayer(data, {radius: 25}).addTo(map);
    });

    return map;
};
