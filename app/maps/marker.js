var $ = require('jquery');

module.exports = function(map, app) { 

    if (map.marker) {
        return start(map.marker);
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

        start(group);
    });

    function start(group) {
        map.setView([55.698098749057806, 37.59521484375001], 10, {animate: false})
            .setMaxBounds([
                [56.13330691237569, 38.46725463867188],
                [55.28928256326212, 36.81930541992188]
            ])
            .options.minZoom = 10;

        map.addLayer(group);
        anim(group);

        return map;
    };

    function gen(group) {
        var layers = group.getLayers(),
            pos = 0,
            next = function() {
                var value = layers[pos];
                pos++;
                return (value && pos < 6) ? value : false;
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
