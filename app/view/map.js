var Backbone = require('backbone'),
    _ = require('underscore'),
    maps = require('../maps');
Backbone.$ = require('jquery');

module.exports = function(app) {
    return Backbone.View.extend({

        mapOpts: function () {
            return {
                'center': new DG.LatLng(59.940409, 30.309482),
                'zoom': 13,
                'geoclicker': false,
                'worldCopyJump': true,
                'locationControl': false,
                'zoomControl': false,
                'fullscreenControl': false,
                'poi': false
            };
        },

        initialize: function() {
            this.model.on('change:state', this.update, this);
            DG.then(_.bind(this.render, this));
        },

        update: function() {
            DG.then(_.bind(function() {
                var map = this.model.get('map'),
                    scene = maps[this.model.get('state')];

                maps.reset(map, app);
                scene && scene(map, app);

                if (this.model.get('page') == 0 ||
                this.model.get('page') == this.model.get('max')) {
                    map.removeControl(map.controls.zoom);
                    map.controls.fullscreen = null;
                    map.controls.zoom = null;
                }

                return this;
            }, this));
        },

        render: function() {
            var map = new DG.Map('map', this.mapOpts());
            maps.setup(map, app);
            map.controls = {};

            this.model.set('map', map);
            return this;
        }
    });
};
