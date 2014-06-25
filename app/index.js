var app = {
		plugins: {}
	},
	State = require('./state')(app),
	Router = require('./router')(app),
	Backbone = require('backbone'),
    _ = require('underscore'),
	$ = require('jquery');

app.root = '/mapsapi';
app.state = new State();
app = _.extend(app, Backbone.Events);

$(document).ready(function () {
	app.router = new Router();
	Backbone.history.start({ pushState: false, root: app.root });
});

