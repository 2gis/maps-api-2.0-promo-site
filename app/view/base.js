var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = function(app) {
	var MapView = require('./map')(app),
		ControlView = require('./control')(app),
		FooterView = require('./footer')(app);
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

			this.map = new MapView({model: this.model});
			this.control = new ControlView({model: this.model});
			this.footer = new FooterView({model: this.model});

			this.render();
		},

		update: function() {
			this.$('.map')[([0, 1, '0', '1', this.model.get('max')].indexOf(this.model.get('page')) !== -1 ? 'add' : 'remove') + 'Class']('map_has-overlay_dark');
			this.$('.intro')[(this.model.get('page') != 0 ? 'add' : 'remove') + 'Class']('intro_is-started_true');
			this.$('.start')[(this.model.get('page') != this.model.get('max') ? 'add' : 'remove') + 'Class']('start_is-started_true');
			return this;
		},

		start: function() {
			this.model.upPage();
		},

		render: function() {
			this.$el.html([
				this.template.map.render(),
				this.template.intro.render({layout: true}),
				this.template.outro.render({layout: true})
				].join(''));

			this.$el.append(this.map.$el);
			this.$el.append(this.control.$el);
			this.$el.append(this.footer.$el);

			this.update();
			return this;
		}
	});
};
