module.exports = function(app) {
    var device = app.base.control.$('.device'),
        display = device.children(),
        map = new DG.Map('mobile-map', {
            'center': new DG.LatLng(54.980156831455, 82.897440725094),
            'zoom': 13,
            'geoclicker': false,
            'worldCopyJump': true,
            'locationControl': false,
            'zoomControl': true,
            'fullscreenControl': false
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
            map.invalidateSize();
            return this;
        },
        map: map
    };
};
