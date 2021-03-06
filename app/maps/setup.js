
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


    app.plugins.heat = DG.plugin('./vendors/HeatLayer/heatLayer.js');

    app.plugins.marker = DG.plugin('./vendors/Leaflet.bounceMarker/leaflet.bouncemarker.js');

    if (DG.Browser.chrome && /(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
        app.base.control.$('.features__round-link_name_two-markers').hide();
    } else {
        app.plugins.markers = DG.plugin([
            './vendors/Leaflet.markerCluster/leaflet.markercluster-src.js',
            './vendors/Leaflet.markerCluster/MarkerCluster.Default.css'
        ]);
    }

    return map;
};
