var setup = require('./device');

module.exports = function(map, app) {
    var device = setup(app);

    device.enable().setType('smartphone');

    return map;
};