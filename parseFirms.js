var req = require('request');
var JSONStream = require('JSONStream')
var _ = require('highland');
var fs = require('fs');
var json = require('./cafe.json').records;

var file = fs.createWriteStream('./out.json');

// var json = [
// 	{
// 		"cardId": 4504127908347914,
// 		"bill": 2000
// 	},
// 	{
// 		"cardId": 4504127908347916,
// 		"bill": 500
// 	},
// 	{
// 		"cardId": 4504127908347920,
// 		"bill": 700
// 	},
// 	{
// 		"cardId": 4504127908347922,
// 		"bill": 600
// 	}];

var stream = _(json)
	.map(function(firm) {
		return _(req('http://catalog.api.2gis.ru/profile', {
			qs: {
				version: 1.3,
				key: 'rujrdp3400',
				id: firm.cardId
			}/*,
			json: true,
			encoding: 'utf8'*/
		}));
	})
	.merge()
	.pipe(JSONStream.parse());

_(stream)
	.errors(function (err, push) {
		console.error(err);
        push(null, {});
	    // if (err.statusCode === 404) {
	    //     // not found, return empty doc
	    // } else {
	    //     // otherwise, re-throw the error
	    //     push(err);
	    // }
	})
	.map(function(firm) {
		var bill;

		for (var i = json.length - 1; i >= 0; i--) {
			if (json[i].cardId == firm.id) {
				bill = json[i].bill;
				break;
			}
		};
		return [firm.lat, firm.lon, bill];
	})
	.filter(function(firm) {
		return firm[0];
	})
	// .flatten()
	.map(function(item) {
		console.log(JSON.stringify(item));
		return JSON.stringify(item) + ',\n';
	})
	.pipe(file);
	// .toArray(function(data) {
	// 	// console.log(data);
	// 	// console.log(JSON.parse(data.join('')));
	// });


// module.exports = function(map) {
	// map.setView([55.696351217825494, 37.6426394592835]);
	// map.setView([-37.8839, 175.3745188667], 7);

	// if (map.heat) {
	// 	return map.addLayer(map.heat);
	// }

	// DG.plugin('/vendors/HeatLayer/heatLayer.js').then(function() {
	// 	map.heat = DG.heatLayer(data).addTo(map);
	// 	// var heat = L.heatLayer(latlngs, {radius: 25}).addTo(map);
	// }, function(err) {
	// 	console.log(err);
	// });


	// var res = json.map(function(firm) {
	// 	return DG.ajax('http://catalog.api.2gis.ru/profile?&version=1.3&key=rujrdp3400&id=4504127908347914', {
	// 		data: {
	// 			version: 1.3,
	// 			key: 'rujrdp3400',
	// 			id: firm.cardId
	// 		}
	// 	});
	// });

	// Promise.all(res).then(function(data) {
	// 	var result = data.map(function(firm) {
	// 		var bill;

	// 		for (var i = json.length - 1; i >= 0; i--) {
	// 			if (json[i].cardId == firm.id) {
	// 				bill = json[i].bill;
	// 				break;
	// 			}
	// 		};

	// 		return [firm.lat, firm.lon, bill];
	// 	});
	// 	console.log(result);
	// }, function(err) {
	// 	console.error(err);
	// });



