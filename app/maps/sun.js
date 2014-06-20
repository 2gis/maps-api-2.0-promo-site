var data = require('./heatData');


module.exports = function(map) {
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

	var json = [
		{
			"cardId": 4504127908347914,
			"bill": 2000
		},
		{
			"cardId": 4504127908347916,
			"bill": 500
		},
		{
			"cardId": 4504127908347920,
			"bill": 700
		},
		{
			"cardId": 4504127908347922,
			"bill": 600
		}];

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

function errorHandler(e) {
  var msg = '';

  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };

  console.log('Error: ' + msg);
}

function onInitFs(fs) {
	console.log(fs);

  fs.root.getFile('log.txt', {create: true}, function(fileEntry) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function(fileWriter) {

      fileWriter.onwriteend = function(e) {
        console.log('Write completed.');
      };

      fileWriter.onerror = function(e) {
        console.log('Write failed: ' + e.toString());
      };

      // Create a new Blob and write it to log.txt.
      var bb = new Blob(['Lorem Ipsum']); // Note: window.WebKitBlobBuilder in Chrome 12.
      // bb.append('Lorem Ipsum');
      fileWriter.write(bb);

    }, errorHandler);

  }, errorHandler);

}

window.webkitRequestFileSystem(window.PERSISTENT, 1024*1024, onInitFs, errorHandler);

	return map;
};