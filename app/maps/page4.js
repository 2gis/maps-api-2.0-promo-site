var data = require('./entrances');

module.exports = function(map, app) {
    var entrances = {},
        titleNode = app.base.control.$('.pseudocard__header'),
        addressNode = app.base.control.$('.pseudocard__address'),
        textNode = app.base.control.$('.pseudocard__route-instructions');

    app.state.on('change:sliderId', showEntrance);

    function showEntrance() {
        var id = app.state.get('sliderId');
        updateDescription(id);

        if (!entrances[id]) {
            entrances[id] = new DG.Entrance({
                'vectors': data[id].entrance
            });
        }
        map.entrance = entrances[id];
        map.setView([59.99422983908714, 30.438406955084687], 18, {animation: false});
        entrances[id].addTo(map).show();
    }

    function updateDescription(id) {
        var description = data[id].description;

        titleNode.text(description.company);
        addressNode.text(description.address);
        textNode.text(description.text);
    }

    // init state
    showEntrance();
    app.base.control.$('.entrances-examples__play-pause-button').trigger('click');

    return map;
};
