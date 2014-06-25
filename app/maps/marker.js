var $ = require('jquery');

module.exports = function(map, app) { 
    map.setView([55.698098749057806, 37.59521484375001], 10);

    if (map.marker) {
        map.addLayer(map.marker);
        anim(map.marker);
        return map;
    }

    app.plugins.marker.then(function() {
        return app.banks;
    }).then(function(data) {
        var result = data.result.markers;

        var group = map.marker = DG.featureGroup();

        function populate() {
            for (var i = 0; i < 20; i++) {
                var m = new L.Marker([result[i].lat, result[i].lon], {bounceOnAdd: true});
                group.addLayer(m);
            }
        }

        populate();

        group.on('click', function (e) {
            e.layer.bounce({duration: 500, height: 400});
        });

        map.addLayer(group);
        anim(group);
    });

    function gen(group) {
        var layers = group.getLayers(),
            pos = 0,
            next = function() {
                var value = layers[pos];
                pos++;
                return (value && pos < 10) ? value : false;
            };
        return next;
    };

    function anim(group) {
        setTimeout(function() {
            var next = gen(group),
                markerClass = 'dg-customization__marker_type_mushroom-is_hover',
                timer = setInterval(function() {
                    var marker = next();
                    $('.' + markerClass).removeClass(markerClass);

                    if (!marker) { return clearInterval(timer); }

                    $(marker._icon).addClass(markerClass);
                }, 200);
        }, 800);
    };

    return map;
};