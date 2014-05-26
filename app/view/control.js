var Backbone = require('backbone'),
	_ = require('underscore');
Backbone.$ = require('jquery');

module.exports = function(app) {
	return Backbone.View.extend({
		events: {
			'click .next': 'next',
			'click .prev': 'prev'
		}
		initialize: function() {
			this.render();
		},

		render: function() {
			console.log(this);
		}
	});
};