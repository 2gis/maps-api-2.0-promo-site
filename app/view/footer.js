var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = function(app) {
	return Backbone.View.extend({
		template: require('../../partials/footer'),

		initialize: function() {
			this.model.on('change:page', this.setPage, this);
			// this.$el.hide();
			this.render().setPage();
		},

		setPage: function() {
			var pins = 'features__table-of-contents-item',
				tabs = 'footer__panel',
				active = '_is-active_true',
				item = ':eq(' + (this.model.get('page') - 1) + ')';
			// console.log(this.$(selector));
			// this.$('.' + pins + active).removeClass(pins + active);
			// this.$('.' + pins + item).addClass(pins + active);
			this.$('.' + tabs + active).removeClass(tabs + active);
			this.$('.' + tabs + item).addClass(tabs + active);
			return this;
		},

		render: function() {
			// console.log(this);
			this.$el.html(this.template.render());
			return this;
		}
	});
};
