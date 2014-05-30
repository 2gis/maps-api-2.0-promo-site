var Backbone = require('backbone'),
	$ = require('jquery');
	
Backbone.$ = $;
module.exports = function (app) {
	var BaseView = require('./view/base')(app),
		ControlView = require('./view/control')(app);
	return Backbone.Router.extend({
		routes: {
			'': 'index',
			':page': 'renderPage'
		},

		initialize: function() {
			app.base = new BaseView({el: 'body', model: app.state});
			app.control = new ControlView({model: app.state});
			app.control.$el.appendTo(app.base.$el);

			app.state.on('change:page', this.update, this);
		},

		update: function() {
			// console.log(app.state.hasChanged('page'));
			this.navigate('/' + app.state.get('page'), {trigger: true});
		},

		index: function () {
			app.state.setState(0);
			console.log('ahoy!', app.base);			
		},

		renderPage: function(page) {
			app.state.setState(page);
			console.log(page);
		}
	});
}