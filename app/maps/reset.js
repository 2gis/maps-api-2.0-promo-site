module.exports = function(map, app) {

    map.setMaxBounds([
        [85, 1400],
        [-85, -1400]
        ]);
    map.options.minZoom = 0;
    map.options.maxZoom = 18;

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

    map.geoclicker.enabled() && map.geoclicker.disable();
    !map.projectDetector.enabled() && map.projectDetector.enable();

    if (!map.controls.zoom) {
        map.controls.zoom = DG.control.zoom({position: DG.Browser.touch ? 'bottomright' : 'topright'}).addTo(map);
    }

    map.geoclicker._map._popup && map.closePopup(map.geoclicker._map._popup);

    if (map.githubCommits) {
        map.githubCommits.forEach(function(commits){map.removeLayer(commits);});
    }

    return map;
};
