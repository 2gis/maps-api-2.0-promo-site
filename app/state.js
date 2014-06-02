var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = function() {
	return Backbone.Model.extend({
		defaults: {
			page: 0,
			max: 10
		},

		validate: function(attrs, options) {
			console.log(attrs);
			if (attrs.page > attrs.max) {
				return 'error';
			}

			if (attrs.page < 0) {
				return 'error';
			}
		},

		setPage: function(page) {
			this.set('page', page, {validate:true});
		},

		upPage: function() {
			this.set('page', +this.get('page') + 1, {validate:true});
		},

		downPage: function() {
			this.set('page', +this.get('page') - 1, {validate:true});
		}
	});
};