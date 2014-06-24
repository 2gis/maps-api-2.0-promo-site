module.exports = function(map, app) {

    if (map.clusters && map.hasLayer(map.clusters)) {
        map.removeLayer(map.clusters);
    }

    if (map.heat && map.hasLayer(map.heat)) {
        map.removeLayer(map.heat);
    }

    if (map.marker && map.hasLayer(map.marker)) {
        map.removeLayer(map.marker);
    }

    !map.geoclicker.enabled() && map.geoclicker.disable();

    if (map.controls.ruler) {
        map.removeControl(map.controls.ruler);
        map.controls.ruler = null;
    }

    //entrance
   /* app.off('showEntrance');
    app.off('changeEntrance');*/

    map.geoclicker._map._popup && map.closePopup(map.geoclicker._map._popup);

    app.device.clean().disable();

    return map;
};
