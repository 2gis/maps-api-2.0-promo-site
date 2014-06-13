module.exports = function(map, app) {
	// console.log(app.base.footer);
	var loader = app.base.footer.$('[data-footer-state=page1]'),
		timeEl = loader.find('.lightness-panel__counter'),
		newBar = loader.find('.lightness-panel__version_of_new-api .lightness-panel__progress-bar-fill'),
		oldBar = loader.find('.lightness-panel__version_of_old-api .lightness-panel__progress-bar-fill'),
		timer, time = 0, ms, s;


	newBar.add(oldBar).width(0).stop().removeClass('lightness-panel__progress-bar-fill-is_loaded');

	newBar.animate({width: '60%'}, {
		duration: 2000,
		complete: function() {
			newBar.addClass('lightness-panel__progress-bar-fill-is_loaded');
			app.base.$('.map').removeClass('map_has-overlay_dark');
		}
	});
	oldBar.animate({width: '100%'}, {
		duration: 4000,
		start: startTimer,
		always: function() {
			oldBar.addClass('lightness-panel__progress-bar-fill-is_loaded');
	        clearInterval(timer);
		}
	});

	function startTimer() {
		timer = setInterval(function() {
			time += 1;
			s =  Math.floor(time / 60);
			ms = Math.floor(time % 60);
			if (s < 10) {
				s = '0' + s;
			}
			if (ms < 10) {
				ms = '0' + ms;
			}
			timeEl.text(['00', s, ms].join(' : '));
		}, 20);
	};

	return map;
};