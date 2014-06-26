var $ = require('jquery');

module.exports = function(map, app) {
    DG.Browser.retina = true;
    var device = app.base.control.$('.device'),
        display = device.children(),
        map2 = new DG.Map('mobile-map', {
            'center': new DG.LatLng(54.980156831455, 82.897440725094),
            'zoom': 13,
            'geoclicker': false,
            'worldCopyJump': true,
            'locationControl': false,
            'zoomControl': true,
            'fullscreenControl': false
        }),
        $map2 = $(map2.getContainer()),
        diff;

    function setDiff() {
        var map1C = map.getSize().divideBy(2),
            map2C = map2.getSize().divideBy(2).add([$map2.offset().left, $map2.offset().top]);
        
        diff = map1C.subtract(map2C);
        setView(map, map2);
    };

    function setView(from, to) {
        var center = from.project(from.getCenter()),
            newCenter = center.subtract(diff);

        to.setView(from.unproject(newCenter), from.getZoom(), {animate: false});
    };

    setDiff();

    map.on('resize', function() {
        setDiff();
    });

    map.on('move', function(e) {
        setView(map, map2);
    });

    return {
        enable: function() {
            device.addClass('device_is-visible_true');
            return this;
        },
        disable: function() {
            device.removeClass('device_is-visible_true');
            return this;
        },
        clean: function() {
            device.removeClass('tablet smartphone notepad');
            display.removeClass();
            return this;
        },
        setType: function(type) {
            this.clean();
            device.addClass(type);
            display.addClass(type + '__display');
            map2.invalidateSize();
            setDiff();
            return this;
        },
        map: map2
    };
};
