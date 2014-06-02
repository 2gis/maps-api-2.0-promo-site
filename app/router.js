var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = function (app) {
	var BaseView = require('./view/base')(app),
		MapView = require('./view/map')(app),
		ControlView = require('./view/control')(app),
		FooterView = require('./view/footer')(app);
	return Backbone.Router.extend({
		routes: {
			'': 'index',
			':page': 'renderPage'
		},

		initialize: function() {
			app.base = new BaseView({el: 'body', model: app.state});
			app.mapView = new MapView({model: app.state});
			app.mapView.$el.appendTo(app.base.$el);

			app.control = new ControlView({model: app.state});
			app.control.$el.appendTo(app.base.$el);

			app.footer = new FooterView({model: app.state});
			app.footer.$el.appendTo(app.base.$el);

			app.state.on('change:page', this.update, this);
		},

		update: function() {
			// console.log(app.state.hasChanged('page'));
			this.navigate('/' + app.state.get('page'), {trigger: true});
		},

		index: function () {
			app.state.setPage(0);
			console.log('ahoy!', app.base);			
		},

		renderPage: function(page) {
			app.state.setPage(page);
			console.log(page);
		}
	});
}