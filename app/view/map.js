var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = function(app) {
	return Backbone.View.extend({
		initialize: function() {
			this.model.on('change:state', this.update, this);
			DG.then(this.render.bind(this));
			// this.render();
		},

		update: function() {
			console.log(this.model.get('state'));
			this.model.get('map').setView([54.980156831455, 82.837440225094]);
			switch(this.model.get('state')) {
				case 'marker':
					this.model.get('map').setView([54.980156831455, 82.437440225094]);
				break;
				case 'sun':
					this.model.get('map').setView([54.980156831455, 82.137440225094]);
				break;
				case 'two-markers':
					this.model.get('map').setView([54.980156831455, 82.737440225094]);
				break;
			}
			// this.$('.intro')[(this.model.get('page') == 0 ? 'remove' : 'add') + 'Class']('intro_is-started_true');
			// this.$('.map')[(this.model.get('page') == 0 ? 'add' : 'remove') + 'Class']('map_has-overlay_dark');
			return this;
		},

		// start: function() {
		// 	// console.log(this);
		// 	this.model.upPage();
		// },

		render: function() {
			// console.log(this);
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
			// this.update();
			return this;
		}
	});
};
