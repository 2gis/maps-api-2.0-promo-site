var Backbone = require('backbone'),
	_ = require('underscore');
Backbone.$ = require('jquery');

module.exports = function(app) {
	return Backbone.View.extend({
		events: {
			'click .features__arrow-link_to_right': 'next',
			'click .features__arrow-link_to_left': 'prev'
		},

		template: require('../../partials/header'),

		initialize: function() {
			this.model.on('change:page', this.update, this);
			this.render().update();
		},

		update: function() {
			var action = 'fade' + ((this.model.get('page') == 0 ||
				this.model.get('page') == this.model.get('max')) ? 'Out' : 'In');

			console.log(action);
			this.$el[action]();
			// this.$el[
			// 	(this.model.get('page') === 0 ? 'remove' : 'add') + 'Class']('intro__go');
			return this;
		},

		next: function(e) {
			e.preventDefault();
			this.model.upState();
			return this;
		},

		prev: function(e) {
			e.preventDefault();
			this.model.downState();
			return this;
		},

		render: function() {
			console.log(this);
			this.$el.html(this.template.render());
			return this;
		}
	});
};