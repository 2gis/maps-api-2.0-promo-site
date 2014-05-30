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
			this.render();
		},

		update: function() {
			this.$('.intro')[(this.model.get('page') == 0 ? 'remove' : 'add') + 'Class']('intro__go');
			return this;
		},

		start: function() {
			// console.log(this);
			this.model.upState();
		},

		render: function() {
			console.log(this);
			this.update();
			return this;
		}
	});
};