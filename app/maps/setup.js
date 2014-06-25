var setup = require('./device');

module.exports = function(map, app) {
    app.banks = DG.ajax('http://catalog.api.2gis.ru/2.0/catalog/branch/search', {
        data: {
            q: 'банкоматы',
            page_size: 1,
            page: 1,
            region_id: 32,
            fields: 'markers',
            key: 'rudcgu3317',
            output: 'json'
        }
    });

    app.plugins.markers = DG.plugin([
        './vendors/Leaflet.markerCluster/leaflet.markercluster-src.js',
        './vendors/Leaflet.markerCluster/MarkerCluster.Default.css'
    ]);

    app.plugins.heat = DG.plugin('./vendors/HeatLayer/heatLayer.js');

    app.plugins.marker = DG.plugin('./vendors/Leaflet.bounceMarker/leaflet.bouncemarker.js');

    app.device = setup(app);

    return map;
};