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

    //slider
    app.state.off('change:sliderId');
    if (map.entrance && map.hasLayer(map.entrance)) {
        map.removeLayer(map.entrance);
    }

    !map.geoclicker.enabled() && map.geoclicker.disable();

    if (map.controls.ruler) {
        map.removeControl(map.controls.ruler);
        map.controls.ruler = null;
    }

    map.geoclicker._map._popup && map.closePopup(map.geoclicker._map._popup);

    if (map.githubCommits){
        map.githubCommits.forEach(function(commits){map.removeLayer(commits);});
    }



    app.device.clean().disable();

    return map;
};
