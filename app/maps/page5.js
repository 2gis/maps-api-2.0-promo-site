var $ = require('jquery');
module.exports = function(map, app) {



	// console.log(app.base.footer);
	var Commits_JSAPI = {
		"2010" : [
			{"date":"2010-06-18T15:42:50Z","author":{"login":"Gaidamak","location":"Kiev, Ukraine"},"latlng":{"lat":50.4501,"lng":30.5234}},
			{"date":"2010-06-23T08:10:16Z","author":{"login":"porqz","location":"Novosibirsk"},"latlng":{"lat":55.00835259999999,"lng":82.9357327}}
		],
		"2011" : [
			{"date":"2011-06-18T15:42:50Z","author":{"login":"Gaidamak","location":"Kiev, Ukraine"},"latlng":{"lat":50.4501,"lng":30.5234}},
			{"date":"2011-06-23T08:10:16Z","author":{"login":"porqz","location":"Novosibirsk"},"latlng":{"lat":55.00835259999999,"lng":82.9357327}}
		],
		"2012" : [
			{"date":"2012-06-18T15:42:50Z","author":{"login":"Gaidamak","location":"Kiev, Ukraine"},"latlng":{"lat":50.4501,"lng":30.5234}},
			{"date":"2012-06-23T08:10:16Z","author":{"login":"porqz","location":"Novosibirsk"},"latlng":{"lat":55.00835259999999,"lng":82.9357327}}
		],
		"2013" : [
			{"date":"2013-06-18T15:42:50Z","author":{"login":"Gaidamak","location":"Kiev, Ukraine"},"latlng":{"lat":50.4501,"lng":30.5234}},
			{"date":"2013-06-23T08:10:16Z","author":{"login":"porqz","location":"Novosibirsk"},"latlng":{"lat":55.00835259999999,"lng":82.9357327}}
		],
		"2014" : [
			{"date":"2014-06-18T15:42:50Z","author":{"login":"Gaidamak","location":"Kiev, Ukraine"},"latlng":{"lat":50.4501,"lng":30.5234}},
			{"date":"2014-06-23T08:10:16Z","author":{"login":"porqz","location":"Novosibirsk"},"latlng":{"lat":55.00835259999999,"lng":82.9357327}}
		]
	};

	var GitHubIcon = DG.icon({
	    iconUrl: '/img/github-mark.png',
	    iconRetinaUrl: '/img/github-mark.png',
	    iconSize: [32, 32],
	    iconAnchor: [16, 16]
	});

	var cLayers = [];

	Object.keys(Commits_JSAPI).forEach(
		function(year){

			var commitMark = [];

			addMarkersToGroup(year, commitMark);

			//cLayers[year] = DG.layerGroup(commitMark).addTo(map);

		}
	);

	map.setZoom(4);
	map.setView([32.657875736955305, 44.25292968750001]);


	function addMarkersToGroup(year, aMarkers){
		if(Commits_JSAPI[year]){
			Commits_JSAPI[year].forEach(
				function(commit){
					aMarkers.push( DG.marker([commit.latlng.lat,commit.latlng.lng], {icon: GitHubIcon}) );
				}
			);
		}
	}

	function showCommits(year){
		if( cLayers[year] || !Commits_JSAPI[year] ) { return; }
		var commits = [];
		addMarkersToGroup(year, commits);
		cLayers[year] = DG.layerGroup(commits).addTo(map);
	}

	function hideCommits(year){
		if ( !cLayers[year] || !Commits_JSAPI[year] ) { return; }
		map.removeLayer(cLayers[year]);
	}

    app.vent.on('changeOpenness', function (data) {
    	console.log(data.id);
    });

	return map;
};
