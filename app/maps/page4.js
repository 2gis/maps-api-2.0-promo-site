var data = require('./entrances'),
    $ = require('jquery');

module.exports = function(map, app) {
    var entrances = {},
        titleNode = $('.pseudocard__header'),
        addressNode = $('.pseudocard__address'),
        textNode = $('.pseudocard__route-instructions');

    function addEntrance(id) {
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

    addEntrance(0);
    app.base.control._currEl = $('.entrances-examples__example-link_is-shown_true');

    app.vent.on('showEntrance changeEntrance', function (data) {
        addEntrance(data.id);
    });

    app.vent.on('changeEntrance', function (data) {
        updateDescription(data.id);
    });

    // slider
/*    $('.entrances-examples__list').on('click', 'a', function () {
        var el = $(this),
            id = $(this).text() - 1;

        if (id !== currId) {
            currEl && currEl.toggleClass('entrances-examples__example-link_is-shown_true');
            el.toggleClass('entrances-examples__example-link_is-shown_true');

            currId = id;
            currEl = el;

            addEntrance(id);
            updateDescription(id);
        }
    });

    // show entrance
    $('.pseudocard__find-entrance-link').on('click', function () {
        addEntrance(currId);
    });*/


    return map;
};
