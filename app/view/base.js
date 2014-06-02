var Backbone = require('backbone'),
	_ = require('underscore');
Backbone.$ = require('jquery');

module.exports = function(app) {
	return Backbone.View.extend({
		events: {
			'click .intro': 'start'
		},

		template: {
			intro: require('../../pages/index'),
			outro: require('../../pages/start')
		},

		initialize: function() {
			this.model.on('change:page', this.update, this);
			DG.then(this.render.bind(this));
			// this.render();
		},

		update: function() {
			this.$('.intro')[(this.model.get('page') == 0 ? 'remove' : 'add') + 'Class']('intro_is-started_true');
			this.$('.map')[(this.model.get('page') == 0 ? 'add' : 'remove') + 'Class']('map_has-overlay_dark');
			return this;
		},

		start: function() {
			// console.log(this);
			this.model.upPage();
		},

		render: function() {
			console.log(this);
			this.model.set('map', new DG.Map('map', {
	            'center': new DG.LatLng(54.980156831455, 82.897440725094),
	            'zoom': 13,
	            'geoclicker': false,
	            'worldCopyJump': true,
	            'locationControl': false,
	            'zoomControl': false,
	            'fullscreenControl': false
	        }));
	        // this.$el.append(this.template.outro.render());
	        // console.log(this.template.outro.render({layout: true}));
			this.update();
			return this;
		}
	});
};
