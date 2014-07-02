var $ = require('jquery');
var gitCommits = require('./commits');
module.exports = function(map, app) {

	var GitHubIcon = DG.icon({
	    iconUrl: '/mapsapi/img/github-mark.png',
	    iconRetinaUrl: '/mapsapi/img/github-mark.png',
	    iconSize: [32, 32],
	    iconAnchor: [16, 16]
	});

	var commitLayers = map.githubCommits = [], commits = [];

	map.projectDetector.disable();
	map.setView([52.855864177853995, 3.5156250000000004], 3);
	map.options.minZoom = 3;
	map.options.maxZoom = 7;

	function addMarkersToGroup(year, markers){
		if(gitCommits[year]){
			gitCommits[year].forEach(
				function(commit){
					
					var marker = DG.marker([commit.latlng.lat,commit.latlng.lng], {
							icon: GitHubIcon
						});

					marker.addTo(map).bindLabel(commit.location + '<br>' + commit.numCommits + getPlural(commit.numCommits), {
						offset: new DG.Point(-100,-54)
					});
					
					markers.push(marker);
				}
			);
		}
	}

	function getPlural(n) { //(Int) -> (String)
		var lastDigit = n % 10;
		if ( lastDigit > 5 || lastDigit === 0 ) { return ' коммитов';}
		 else if ( lastDigit > 1 ) {return ' коммита';}
		 return ' коммит';
	}

	function clickSlider() {
		showCommits(app.state.get('sliderId') + 2010);
	}

	function showCommits(year){

		if(!gitCommits[year] ) { return; }

		if(year < 2014) {
		for(var hy = year; hy<=2014; hy++) {
			 hideCommits(hy);
			 delete commits[hy];
			}
		}

		for(var y = 2010; y<=year; y++) {
		if(!commits[y]) {
			commits[y] = [];
			addMarkersToGroup(y, commits[y]);
			commitLayers[y] = DG.layerGroup(commits[y]);
			map.addLayer(commitLayers[y]);}
		}
	}

	function hideCommits(year){
		 if ( !commitLayers[year] ) { return; }
		 map.removeLayer(commitLayers[year]);
	}

    app.state.on('change:sliderId', clickSlider);
    showCommits('2010');
    app.base.control.handleSliderStart(null, '.openness-examples__play-pause-button');

	return map;
};
