var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = function() {
	return Backbone.Model.extend({
		defaults: {
			page: 0,
			max: 10
		},

		setState: function(page) {
			this.set('page', page, {silent: true});
		},

		upState: function() {
			this.set('page', 
				Math.min(this.get('page') + 1, this.get('max'))
			);
		},

		downState: function() {
			this.set('page', 
				Math.max(this.get('page') - 1, this.get('max'))
			);
		}
	});
};