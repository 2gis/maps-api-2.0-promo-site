var Backbone = require('backbone'),
	_ = require('underscore');
Backbone.$ = require('jquery');

module.exports = function(app) {
	return Backbone.View.extend({
		events: {
			'click .intro': 'start'
		},

		initialize: function() {
			this.model.on('change:page', this.update, this);
			DG.then(this.render.bind(this));
			// this.render();
		},

		update: function() {
			this.$('.intro')[(this.model.get('page') == 0 ? 'remove' : 'add') + 'Class']('intro__go');
			this.$('.map')[(this.model.get('page') == 0 ? 'add' : 'remove') + 'Class']('map_has-overlay_dark');
			return this;
		},

		start: function() {
			// console.log(this);
			this.model.upState();
		},

		render: function() {
			console.log(this);
			this.model.map = new DG.Map('map', {
	            'center': new DG.LatLng(54.980156831455, 82.897440725094),
	            'zoom': 13,
	            'geoclicker': false,
	            'worldCopyJump': true,
	            'locationControl': false,
	            'zoomControl': false,
	            'fullscreenControl': false
	        });
			this.update();
			return this;
		}
	});
};