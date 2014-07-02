var $ = require('jquery');
require('../../polyfill/indexOf');

module.exports = function(map, skin) {
    map.setView([59.94067812167326, 30.327420830726624], 18);
    var css = $('head [rel=stylesheet]').filter(function() {
            return $(this).attr('href').indexOf('maps.api') > -1;
        }),
        url = css.attr('href'),
        regex = /skin=(\w*)/,
        test = url.match(regex);

    map.geoclicker.enable();

    map.fire('click', {latlng: new DG.LatLng(59.94017833263666, 30.32859027385712)});

    css.attr('href', test ? url.replace(regex, 'skin=' + skin) : (url + '&skin=' + skin));

    return map;
};
