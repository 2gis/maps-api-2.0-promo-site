var app = {},
	State = require('./state')(app),
	Router = require('./router')(app),
	Backbone = require('backbone'),
	$ = require('jquery');

app.root = '/';
app.state = new State();
$(document).ready(function() {
	app.router = new Router();
	Backbone.history.start({ pushState: true, root: app.root });
});

