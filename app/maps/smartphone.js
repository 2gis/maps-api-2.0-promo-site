module.exports = function(map, app) {
    app.device.enable().setType('smartphone');

    return map;
};