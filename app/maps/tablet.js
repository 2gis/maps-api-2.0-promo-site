module.exports = function(map, app) {
    var map2 = app.device.map;
    app.device.enable().setType('tablet');
    
    var loupe = app.base.control.$('.loupe');

    map2.on('mouseover', function(e) {
        loupe.show();
    });

    map2.on('mouseout', function(e) {
        loupe.hide();
    });

    map2.on('mousemove', function(e) {
        console.log(e);
        loupe.css({
           left:  e.originalEvent.pageX,
           top:   e.originalEvent.pageY
        });
    });

    return map;
};