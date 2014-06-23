module.exports = function(map) {
	// map.setView([55.696351217825494, 37.6426394592835], 10);
	// map.setView([55.755616894047215, 37.60070800781251], 11);

	if (map.clusters) {
		return map.addLayer(map.clusters).fitBounds(map.clusters.getBounds());
	}

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

		var markers = map.clusters = L.markerClusterGroup({showCoverageOnHover: false, chunkedLoading: true});

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