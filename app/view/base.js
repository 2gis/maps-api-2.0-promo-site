var Backbone = require('backbone'),
	_ = require('underscore');
Backbone.$ = require('jquery');

module.exports = function(app) {
	return Backbone.View.extend({
		events: {
			'click .intro': 'start'
		},

		initialize: function() {
			this.render();
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