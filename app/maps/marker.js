module.exports = function(map, app) {
    if (map.marker) {
        return map.addLayer(map.marker);
    } else {
        app.plugins.marker.then(function() {
            map.marker = new L.Marker([55.755616894047215, 37.60070800781251], {bounceOnAdd: true}).addTo(map);
            map.marker.on('click', function () {
                map.marker.bounce({duration: 500, height: 400});
            });
        });
    }

    return map;
};