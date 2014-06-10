var Backbone = require('backbone'),
	_ = require('underscore'),
	maps = require('../maps');
Backbone.$ = require('jquery');

module.exports = function(app) {
	return Backbone.View.extend({

		mapOpts: function () {
			return {
	            'center': new DG.LatLng(54.980156831455, 82.897440725094),
	            'zoom': 13,
	            'geoclicker': false,
	            'worldCopyJump': true,
	            'locationControl': false,
	            'zoomControl': false,
	            'fullscreenControl': false
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

				scene && scene(map);

				return this;
			}, this));
		},

		render: function() {
			this.model.set('map', new DG.Map('map', this.mapOpts()));
			return this;
		}
	});
};
