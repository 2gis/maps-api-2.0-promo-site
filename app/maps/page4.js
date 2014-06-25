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
        entrances[id].addTo(map).show();
    }

    function updateDescription(id) {
        var description = data[id].description;

        titleNode.html(description.company);
        addressNode.html(description.address);
        textNode.html(description.text);
    }

    // init state
    showEntrance();

    return map;
};
