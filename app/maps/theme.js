var $ = require('jquery');
require('../../polyfill/indexOf');

module.exports = function(map, skin) {
    map.setView([59.94067812167326, 30.327420830726624], 18);
    var css1 = $('head [rel=stylesheet]').filter(function() {
            return $(this).attr('href').indexOf('maps.api') > -1;
        }),
        css2 = css1.clone(),
        url = css1.attr('href'),
        regex = /skin=(\w*)/,
        test = url.match(regex);

    map.geoclicker.enable();

    css2.attr('href', test ? url.replace(regex, 'skin=' + skin) : (url + '&skin=' + skin));

    css2.one('load', function() {
        map.fire('click', {latlng: new DG.LatLng(59.94017833263666, 30.32859027385712)});
        css1.remove();
    });

    css1.after(css2);

    return map;
};
