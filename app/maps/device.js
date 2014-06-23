// var $ = require('jquery');

module.exports = function(app) {
    var device = app.base.control.$('.device'),
        display = device.children();

    return {
        enable: function() {
            device.addClass('device_is-visible_true');
            return this;
        },
        disable: function() {
            device.removeClass('device_is-visible_true');
            return this;
        },
        clean: function() {
            device.removeClass('tablet smartphone notepad');
            display.removeClass();
            return this;
        },
        setType: function(type) {
            this.clean();
            device.addClass(type);
            display.addClass(type + '__display');
            return this;
        }
    };
};
