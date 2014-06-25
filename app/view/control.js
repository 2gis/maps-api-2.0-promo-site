var Backbone = require('backbone');
Backbone.$ = require('jquery');

module.exports = function (app) {
    return Backbone.View.extend({
        events: {
            'click .features__arrow-link_to_right': 'next',
            'click .features__arrow-link_to_left': 'prev',
            'click .features__table-of-contents-item': 'goPage',
            'click .features__round-link': 'setState',
            'click .openness-examples__list': 'handleSlider',
            'click .entrances-examples__list': 'handleSlider',
            'click .openness-examples__play-pause-button': 'handleSlider',
            'click .entrances-examples__play-pause-button': 'handleSlider',
            'click .pseudocard__find-entrance-link': '_showEntrance'
        },

        template: require('../../partials/header'),

        initialize: function () {
            this.model.on('change:page', this.update, this);
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
                pageNum = this.model.get('page'),
                pageName = this.model.get('pages')[pageNum],
                item = ':eq(' + (pageNum - 1) + ')';

            // initSlider
            var el = this.$('.' + pageName + '-examples__list').children().first().children();
            this.model.set({sliderEl: el, sliderId: 0});

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
            var type = e.currentTarget.className.split('-')[0],
                $el = this.$(e.target);

            e.preventDefault();

            if ($el.hasClass(type + '-examples__example-link')) {
                var id = $el.data('id');
                this.model.get('sliderId') !== id && this._handleSliderItem(id, $el, type);

            } else if ($el.hasClass(type + '-examples__play-pause-button')) {
                this._handleSliderBtn($el, type);
            }
        },

        _handleSliderItem: function (id, el, type) {
            var activeClass = type + '-examples__example-link_is-shown_true',
                eventName = type.charAt(0).toUpperCase() + type.slice(1);

            this.model.get('sliderEl').removeClass(activeClass);
            el.addClass(activeClass);

            this.model.set({sliderEl: el, sliderId: id});

            app.vent.trigger('change' + eventName, {id: this.model.get('sliderId')});
        },

        _handleSliderBtn: function (el, type) {
            var playClass = '-examples__play-pause-button_is-played_true';

            if (!this._interval) {
                this._interval = window.setInterval(this._stopRunSlider.bind(this),
                                            2500,
                                            type);
                el.addClass(type + playClass);

            } else {
                el.removeClass(type + playClass);

                window.clearInterval(this._interval);
                this._interval = undefined;
            }
        },

        _stopRunSlider: function (type) {
            var id = this.model.get('sliderId') + 1,
                 el = this.model.get('sliderEl').parent().next().children();

            if (!el.length) {
                el = this.model.get('sliderEl').parent().siblings().first().children();
                id = 0;
                this.model.set({'sliderId': id});
            }

            this._handleSliderItem(id, el, type);
        },

        _showEntrance: function (e) {
            e.preventDefault();
            app.vent.trigger('showEntrances', {id: this.model.get('sliderId')});
        },

        render: function () {
            this.$el.html(this.template.render());
            return this;
        }
    });
};
