var $ = require('jquery');
require('../../polyfill/indexOf');

module.exports = function(map, skin) {
    map.setView([54.980496831455, 82.897140725094], 18);
    var css = $('head [rel=stylesheet]').filter(function() {
            return $(this).attr('href').indexOf('127') > -1;
        }),
        url = css.attr('href'),
        regex = /skin=(\w*)/,
        test = url.match(regex);

    map.geoclicker.enable();

    map.fire('click', {latlng: new DG.LatLng(54.98018731490755, 82.89802551269531)});

    css.attr('href', test ? url.replace(regex, 'skin=' + skin) : (url + 'skin=' + skin));

    return map;
};
