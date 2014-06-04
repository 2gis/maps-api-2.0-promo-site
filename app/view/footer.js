var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = function(app) {
	return Backbone.View.extend({
		template: require('../../partials/footer'),

		initialize: function() {
			this.model.on('change:state', this.setState, this);
			this.render().setState();
		},

		setState: function() {
			var tabs = 'footer__panel',
				active = '_is-active_true',
				item = '[data-footer-state=' + this.model.get('state') + ']';

			this.$('.' + tabs + active).removeClass(tabs + active);
			this.$(item).addClass(tabs + active);
			return this;
		},

		render: function() {
			this.$el.html(this.template.render());
			return this;
		}
	});
};
