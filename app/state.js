var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = function() {
	return Backbone.Model.extend({
		defaults: {
			// page: ,
			max: 7
		},

		validate: function(attrs, options) {
			// console.log(attrs);
			if (attrs.page > attrs.max) {
				return 'error';
			}

			if (attrs.page < 0) {
				return 'error';
			}
		},

		setPage: function(page, silent) {
			this.set('page', page, {validate:true, silent: silent});
		},

		upPage: function() {
			this.set('page', +this.get('page') + 1, {validate:true});
		},

		downPage: function() {
			this.set('page', +this.get('page') - 1, {validate:true});
		}
	});
};