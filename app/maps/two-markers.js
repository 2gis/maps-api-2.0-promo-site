module.exports = function(map, app) {
    map.setView([55.698098749057806, 37.59521484375001], 10);

    if (map.clusters) {
        return map.addLayer(map.clusters).fitBounds(map.clusters.getBounds());
    }

    app.plugins.markers.then(function() {
        return app.banks;
    }).then(function(data) {
        var result = data.result.markers;

        var markers = map.clusters = L.markerClusterGroup({showCoverageOnHover: false/*, chunkedLoading: true*/});

        function populate() {
            for (var i = 0; i < result.length; i++) {
                var m = L.marker([result[i].lat, result[i].lon]);
                m.bindLabel(result[i].name_ex.primary);
                markers.addLayer(m);
            }
        }

        populate();

        map.addLayer(markers).fitBounds(markers.getBounds());

    });

    return map;
};
