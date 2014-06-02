var Backbone = require('backbone'),
	_ = require('underscore');
Backbone.$ = require('jquery');

module.exports = function(app) {
	return Backbone.View.extend({
		events: {
			'click .features__arrow-link_to_right': 'next',
			'click .features__arrow-link_to_left': 'prev',
			'click .features__table-of-contents-item': 'goPage'
		},

		template: require('../../partials/header'),

		initialize: function() {
			this.model.on('change:page', this.update, this);
			this.$el.hide();
			this.render().update();
		},

		toggle: function() {
			var action = 'fade' + ((this.model.get('page') == 0 ||
				this.model.get('page') == this.model.get('max')) ? 'Out' : 'In');

			// console.log(action, this.model.get('page'), this.model.get('page') == 0);
			this.$el[action]();
			// this.$el[
			// 	(this.model.get('page') === 0 ? 'remove' : 'add') + 'Class']('intro_is-started_true');
			return this;
		},

		setState: function() {
			var pins = 'features__table-of-contents-item',
				tabs = 'features__list-item',
				active = '_is-active_true',
				item = ':eq(' + (this.model.get('page') - 1) + ')';
			// console.log(this.$(selector));
			this.$('.' + pins + active).removeClass(pins + active);
			this.$('.' + pins + item).addClass(pins + active);
			this.$('.' + tabs + active).removeClass(tabs + active);
			this.$('.' + tabs + item).addClass(tabs + active);
			return this;
		},

		update: function() {
			this.toggle().setState();
			return this;
		},

		next: function(e) {
			e.preventDefault();
			this.model.upPage();
			return this;
		},

		prev: function(e) {
			e.preventDefault();
			this.model.downPage();
			return this;
		},

		goPage: function(e) {
			this.model.setPage(this.$(e.target).index() + 1);
			// this.model.downPage();
			return this;
		},

		render: function() {
			// console.log(this);
			this.$el.html(this.template.render());
			return this;
		}
	});
};
