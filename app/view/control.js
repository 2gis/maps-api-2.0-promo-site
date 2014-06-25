var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = function (app) {
    return Backbone.View.extend({
        events: {
            'click .features__arrow-link_to_right': 'next',
            'click .features__arrow-link_to_left': 'prev',
            'click .features__table-of-contents-item': 'goPage',
            'click .features__round-link': 'setState',
            'click .openness-examples__item': 'handleSlider',
            'click .entrances-examples__item': 'handleSlider',
            'click .openness-examples__play-pause-button': 'handleSliderStart',
            'click .entrances-examples__play-pause-button': 'handleSliderStart',
            'click .pseudocard__find-entrance-link': 'showEntrance'
        },

        template: require('../../partials/header'),

        initialize: function () {
            this.model.on('change:page', this.update, this);
            this.model.on('change:sliderEl', this._updateSlider, this);

            this.render().toggle();
        },

        toggle: function () {
            var action = ((this.model.get('page') == 0 ||
                this.model.get('page') == this.model.get('max')) ? 'remove' : 'add') + 'Class';

            this.$('.features')[action]('features_is-visible_true');
            return this;
        },

        setPage: function () {
            var pins = 'features__table-of-contents-item',
                tabs = 'features__list-item',
                active = '_is-active_true',
                highlight = '-examples__example-link_is-shown_true',
                pageName = this.model.getPageName(),
                item = ':eq(' + (this.model.get('page') - 1) + ')';

            var el = this.$('.' + pageName + '-examples__list').children().first().children();
            el.addClass(pageName + highlight);

            this.model.set({sliderEl: el});

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
            this._resetSlider();
            this.model.upPage();
            return this;
        },

        prev: function (e) {
            e.preventDefault();
            this._resetSlider();
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
            this.model.set('state', state);

            return this;
        },

        // slider
        handleSlider: function (e) {
            e.preventDefault();

            var $el = this.$(e.target),
                id = $el.data('id');

            this.model.set({sliderEl: $el, sliderId: id});
        },

        handleSliderStart: function (e) {
            e.preventDefault();

            var playClass = '-examples__play-pause-button_is-played_true',
                type = e.currentTarget.className.split('-')[0],
                $el = this.$(e.target);

            if (!this._interval) {
                this._interval = window.setInterval(this._runSlider.bind(this),
                                            2500);
                $el.addClass(type + playClass);
            } else {
                $el.removeClass(type + playClass);
                this._stopSlider();
            }
        },

        showEntrance: function (e) {
            e.preventDefault();
            this.model.trigger('change:sliderId');
        },

        _updateSlider: function () {
            var activeClass = this.model.getPageName() + '-examples__example-link_is-shown_true',
                $el = this.model.get('sliderEl');

            this.$('.' + activeClass).removeClass(activeClass);
            $el && $el.addClass(activeClass);
        },

        _runSlider: function () {
            var id = this.model.get('sliderId') + 1,
                $el = this.model.get('sliderEl').parent().next().children();

            if (!$el.length) {
                $el = this.model.get('sliderEl').parent().siblings().first().children();
                id = 0;
            }

            this.model.set({sliderEl: $el, sliderId: id});
        },

        _stopSlider: function () {
            window.clearInterval(this._interval);
            this._interval = undefined;
        },

        _resetSlider: function () {
            this.model.set({'sliderId': 0, sliderEl: undefined});

            if (this._interval) {
                var activeClass = this.model.getPageName() + '-examples__play-pause-button_is-played_true';

                this.$('.' + activeClass).removeClass(activeClass);
                this._stopSlider();
            }
        },

        render: function () {
            this.$el.html(this.template.render());
            return this;
        }
    });
};
