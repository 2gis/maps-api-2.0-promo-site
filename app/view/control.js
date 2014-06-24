var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = function (app) {
    return Backbone.View.extend({
        events: {
            'click .features__arrow-link_to_right': 'next',
            'click .features__arrow-link_to_left': 'prev',
            'click .features__table-of-contents-item': 'goPage',
            'click .features__round-link': 'setState',
            'click .entrances-examples': 'handleSlider',
            'click .pseudocard__find-entrance-link': '_showEntrance'
        },

        template: require('../../partials/header'),

        initialize: function () {
            this.model.on('change:page', this.update, this);
            this._currId = 0;
            this._currEl = 222;

            this.render().toggle();
        },

        toggle: function () {
            var action = ((this.model.get('page') == 0 ||
                this.model.get('page') == this.model.get('max')) ? 'remove' : 'add') + 'Class';

            //this._currEl = this.$('.entrances-examples__example-link_is-shown_true');
            this.$('.features')[action]('features_is-visible_true');
            return this;
        },

        setPage: function () {
            var pins = 'features__table-of-contents-item',
                tabs = 'features__list-item',
                active = '_is-active_true',
                item = ':eq(' + (this.model.get('page') - 1) + ')';

            this.$('.' + pins + active).removeClass(pins + active);
            this.$('.' + tabs + active).removeClass(tabs + active);

            this.$('.' + pins + item).addClass(pins + active);
            this.$('.' + tabs + item).addClass(tabs + active);
            return this;
        },

        update: function () {
            this.toggle().setPage().setState();
            return this;
        },

        next: function (e) {
            e.preventDefault();
            this.model.upPage();
            return this;
        },

        prev: function (e) {
            e.preventDefault();
            this.model.downPage();
            return this;
        },

        goPage: function (e) {
            this.model.setPage(this.$(e.target).index() + 1);
            return this;
        },

        setState: function (e) {
            var $el,
                state,
                activeClass = 'features__round-link-is-active_true';
            if (e) {
                e.preventDefault();
                $el = this.$(e.target);
            } else {
                $el = this.$('.features__list-item_is-active_true .features__round-link:eq(0)');
            }
            this.$('.' + activeClass).removeClass(activeClass);
            $el.addClass(activeClass);
            state = $el.data('state') ? $el.data('state') : 'page' + this.model.get('page');
            // console.log(state);
            this.model.set('state', state);
            return this;
        },

        // slider
        handleSlider: function (e) {
            var $el = this.$(e.target);
            e.preventDefault();

            if ($el.hasClass('entrances-examples__example-link')) {
                var id = $el.data('id');

                this._currId != id && this._handleSliderPos(id, $el);
            } else if ($el.hasClass('entrances-examples__play-pause-button')) {
                this._handleSliderStart();
            }
        },

        _handleSliderPos: function (id, el) {
            // console.log('CHANGE STATE', id, this._currId, this._currEl);
            var activeClass = 'entrances-examples__example-link_is-shown_true';

            this._currEl.removeClass(activeClass);
            el.addClass(activeClass);

            this._currId = id;
            this._currEl = el;

            app.vent.trigger('changeEntrance', {id: this._currId});
        },

        _handleSliderStart: function () {
            if (!this._interval) {
                console.log(this._currId + 1, this._currEl, this._currEl.parent().next().children());
                var id = this._currId + 1,
                    el = this._currEl.parent().next().children();

                this._interval = window.setInterval(this._handleSliderPos.bind(this),
                                            1500,
                                            id,
                                            el);

            } else {
                window.clearInterval(this._interval);
            }
        },

        _showEntrance: function (e) {
            e.preventDefault();
            app.vent.trigger('showEntrance', {id: this._currId});
        },

        render: function () {
            this.$el.html(this.template.render());
            return this;
        }
    });
};
