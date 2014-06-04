var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = function(app) {
	return Backbone.View.extend({
		events: {
			'click .intro': 'start'
		},

		template: {
			intro: require('../../pages/index'),
			map: require('../../partials/map'),
			outro: require('../../pages/start')
		},

		initialize: function() {
			this.model.on('change:page', this.update, this);
			// DG.then(this.render.bind(this));
			this.render();
		},

		update: function() {
			this.$('.map')[(this.model.get('page') == 0 || this.model.get('page') == this.model.get('max') ? 'add' : 'remove') + 'Class']('map_has-overlay_dark');
			this.$('.intro')[(this.model.get('page') != 0 ? 'add' : 'remove') + 'Class']('intro_is-started_true');
			this.$('.start')[(this.model.get('page') != this.model.get('max') ? 'add' : 'remove') + 'Class']('start_is-started_true');
			return this;
		},

		start: function() {
			// console.log(this);
			this.model.upPage();
		},

		render: function() {
			console.log(this);

			this.$el.html([
				this.template.map.render(),
				this.template.intro.render({layout: true}),
				this.template.outro.render({layout: true})
				].join(''));
			// this.model.set('map', new DG.Map('map', {
	  //           'center': new DG.LatLng(54.980156831455, 82.897440725094),
	  //           'zoom': 13,
	  //           'geoclicker': false,
	  //           'worldCopyJump': true,
	  //           'locationControl': false,
	  //           'zoomControl': false,
	  //           'fullscreenControl': false
	  //       }));
	        // this.$el.append(this.template.outro.render());
	        // console.log(this.template.outro.render({layout: true}));
			this.update();
			return this;
		}
	});
};
