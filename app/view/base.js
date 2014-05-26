var Backbone = require('backbone'),
	_ = require('underscore');
Backbone.$ = require('jquery');

module.exports = function(app) {
	return Backbone.View.extend({
		events: {
			'click .intro': 'start'
		},

		initialize: function() {
			app.state.on('change:page', this.update, this);
			this.render();
		},

		update: function() {
			this.$('.intro')[(app.state.get('page') === 0 ? 'remove' : 'add') + 'Class']('intro__go');
		},

		start: function() {
			// console.log(this);
			app.state.upState();
		},

		render: function() {
			console.log(this);
		}
	});
};