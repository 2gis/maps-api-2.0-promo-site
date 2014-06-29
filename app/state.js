var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = function() {
	return Backbone.Model.extend({
		defaults: {
			max: 6,
			pages: [
				'',
				'lightness',
				'modularity',
				'themes',
				'entrances',
				'openness',
				'start'
			],
			sliderId: 0,
			sliderEl: {},
		},

		validate: function(attrs, options) {
			if (attrs.page > attrs.max) {
				return 'error';
			}

			if (attrs.page < 0) {
				return 'error';
			}
		},

		getPageName: function() {
			return this.get('pages')[this.get('page')];
		},

		setPageName: function(page, silent) {
			var pageNum = this.get('pages').indexOf(page);
			if (pageNum === -1) { pageNum = 0; }
			this.set('page', pageNum, {validate:true, silent: silent});
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
