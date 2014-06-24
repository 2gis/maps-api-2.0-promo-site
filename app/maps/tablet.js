module.exports = function(map, app) {
    var map2 = app.device.map;
    app.device.enable().setType('tablet');

    map.on('move', function(e) {
        console.log(e.target.getCenter());
        map2.setView(e.target.getCenter(), map.getZoom(), {animate: false});
    });

    return map;
};