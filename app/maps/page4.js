var data = require('./entrances'),
    $ = require('jquery');

module.exports = function(map, app) {
    var entrances = {},
        titleNode = $('.pseudocard__header'),
        addressNode = $('.pseudocard__address'),
        textNode = $('.pseudocard__route-instructions');

    function showEntrance(id) {
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

    app.vent.on('showEntrances changeEntrances', function (data) {
        showEntrance(data.id);
    });

    app.vent.on('changeEntrances', function (data) {
        updateDescription(data.id);
    });

    // init state
    console.log('init arrow');
    showEntrance(0);
    updateDescription(0);
    /*$('.entrances-examples__example-link_is-shown_true').trigger('click');
    app.base.control._currEl = $('.entrances-examples__list').children().first().children();
    app.base.control._currEl.trigger('click');*/

    return map;
};
