module.exports = function(map, app) {
    var loader = app.base.footer.$('[data-footer-state=page1]'),
        timeElNew = loader.find('.lightness-panel__counter_of_new-api'),
        timeElOld = loader.find('.lightness-panel__counter_of_old-api'),
        newBar = loader.find('.lightness-panel__version_of_new-api .lightness-panel__progress-bar-fill'),
        oldBar = loader.find('.lightness-panel__version_of_old-api .lightness-panel__progress-bar-fill'),
        loaded = 'lightness-panel__progress-bar-fill-is_loaded',
        timer1, timer2

    newBar.add(oldBar).width(0).stop().removeClass(loaded);

    newBar.animate({width: '60%'}, {
        duration: 2000,
        start: function() {
            timer1 = startTimer(timeElNew);
        }, 
        complete: function() {
            newBar.addClass(loaded);
            clearInterval(timer1);
            app.base.$('.map').removeClass('map_has-overlay_dark');
        }
    });

    oldBar.animate({width: '100%'}, {
        duration: 4000,
        start: function() {
            timer2 = startTimer(timeElOld);
        }, 
        always: function() {
            oldBar.addClass(loaded);
            clearInterval(timer2);
        }
    });

    function startTimer(el) {
        var time = 0, ms, s;
        // console.log(el);
        return setInterval(function() {
            time += 1;
            s =  Math.floor(time / 60);
            ms = Math.floor(time % 60);
            if (s < 10) {
                s = '0' + s;
            }
            if (ms < 10) {
                ms = '0' + ms;
            }
            el.text(['00', s, ms].join(' : '));
        }, 20);
    };

    return map;
};