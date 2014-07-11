window.app = {
    plugins: {}
};
var State = require('./state')(app),
    Router = require('./router')(app),
    Backbone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery');

app.root = '/mapsapi';
app.state = new State();

$(document).ready(function () {
    app.router = new Router();
    Backbone.history.start({ pushState: false, root: app.root });
});

function hideAddressBar() {
  if (!window.location.hash) {
        if(document.height < window.outerHeight) {
            document.body.style.height = (window.outerHeight + 50) + 'px';
        }

        setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
    }
}

window.addEventListener('load', function(){ if (!window.pageYOffset) { hideAddressBar(); } });
window.addEventListener('orientationchange', hideAddressBar);