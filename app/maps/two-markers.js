module.exports = function(map) {
	DG.plugin([
		'/vendors/Leaflet.markerCluster/leaflet.markercluster-src.js',
		'/vendors/Leaflet.markerCluster/MarkerCluster.Default.css'
	]).then(function() {
		return DG.ajax('http://catalog.api.2gis.ru/2.0/catalog/branch/search',	{
			data: {
				q: 'банкоматы',
				page_size: 1,
				page: 1,
				region_id: 32,
				fields: 'markers',
				key: 'rudcgu3317',
				output: 'json'
			}
		});
	}).then(function(data) {
		var result = data.result.markers;

		var markers = L.markerClusterGroup({showCoverageOnHover: false, chunkedLoading: true});

		function populate() {
			for (var i = 0; i < result.length; i++) {
				var m = DG.marker([result[i].lat, result[i].lon]);
				m.bindLabel(result[i].name_ex.primary);
				markers.addLayer(m);
			}
		}

		populate();

		map.addLayer(markers).fitBounds(markers.getBounds());
		
	}, function(err) {
		console.log(err);
	});

	return map;
};