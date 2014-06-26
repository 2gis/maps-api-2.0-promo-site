var $ = require('jquery');
var Commits = require('./commits');
module.exports = function(map, app) {

	// console.log(app.base.footer);

	var GitHubIcon = DG.icon({
	    iconUrl: '/mapsapi/img/github-mark.png',
	    iconRetinaUrl: '/mapsapi/img/github-mark.png',
	    iconSize: [32, 32],
	    iconAnchor: [16, 16]
	});

	var cLayers = map.githubCommits = [], commits = [];

	map.setView([52.855864177853995, 3.5156250000000004], 3);


	function addMarkersToGroup(year, aMarkers){
		if(Commits[year]){
			Commits[year].forEach(
				function(commit){
					aMarkers.push( DG.marker([commit.latlng.lat,commit.latlng.lng], {icon: GitHubIcon}).bindPopup(commit.location) );
				}
			);
		}
	}

	function clickSlider() {
		showCommits(app.state.get('sliderId') + 2010);
	}

	function showCommits(year){
		
		if(!Commits[year] ) { return; }
		
		if(year < 2014) {
		for(var hy = year; hy<=2014; hy++) {
			 hideCommits(hy);
			 delete commits[hy];
			}
		}

		for(var y = year; y>=2010; y--) {
		if(!commits[y]) {
			commits[y] = [];
			addMarkersToGroup(y, commits[y]);
			cLayers[y] = DG.layerGroup(commits[y]);
			map.addLayer(cLayers[y]);}
		}
	}

	function hideCommits(year){
		 if ( !cLayers[year] ) { return; }
		 map.removeLayer(cLayers[year]);
	}

    app.state.on('change:sliderId', clickSlider);

    showCommits("2010");

	return map;
};
