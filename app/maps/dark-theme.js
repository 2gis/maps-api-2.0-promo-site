var theme = require('./theme');

module.exports = function(map) {
    theme(map, 'dark');

    return map;
};