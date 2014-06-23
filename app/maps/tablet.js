module.exports = function(map, app) {
    app.device.enable().setType('tablet');

    return map;
};