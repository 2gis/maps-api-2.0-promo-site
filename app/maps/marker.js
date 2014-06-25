module.exports = function(map, app) {
    if (map.marker) {
        return map.addLayer(map.marker);
    }

    app.plugins.marker.then(function() {
        return app.banks;
    }).then(function(data) {
        var result = data.result.markers;

        var group = map.marker = DG.featureGroup();
        // var group = map.marker = new L.Marker([55.755616894047215, 37.60070800781251], {bounceOnAdd: true}).addTo(map);

        function populate() {
            for (var i = 0; i < 100; i++) {
                var m = new L.Marker([result[i].lat, result[i].lon], {bounceOnAdd: true});
                group.addLayer(m);
            }
        }

        populate();

        group.on('click', function (e) {
            console.log(e);
            e.layer.bounce({duration: 500, height: 400});
        });

        map.addLayer(group);
        //.fitBounds(group.getBounds());
    });

    return map;
};