var Backbone = require('backbone'),
	$ = require('jquery');
	
Backbone.$ = $;
module.exports = function (app) {
	var BaseView = require('./view/base')(app);
	return Backbone.Router.extend({
		routes: {
			'': 'index',
			':page': 'renderPage'
		},

		initialize: function() {
			app.base = new BaseView({el: 'body'});
			// console.log($('.intro'));

			app.state.on('change:page', this.update, this);
		},

		update: function() {
			this.navigate('/' + app.state.get('page'), {trigger: true});
		},

		index: function () {
			app.state.setState(0);
			console.log('ahoy!', app.base);			
		},

		renderPage: function(page) {
			console.log(page);
		}
	});
}