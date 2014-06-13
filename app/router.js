var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = function (app) {
	var BaseView = require('./view/base')(app);
	return Backbone.Router.extend({
		routes: {
			'': 'index',
			':page': 'renderPage'
		},

		initialize: function() {
			app.base = new BaseView({el: 'body', model: app.state});

			app.state.on('change:page', this.update, this);
		},

		update: function() {
			this.navigate('/' + app.state.getPageName());
		},

		index: function () {
			app.state.setPage(0);
		},

		renderPage: function(page) {
			app.state.setPageName(page);
		}
	});
}