var $ = require('jquery');
module.exports = function(map, app) {



	// console.log(app.base.footer);
var Commits_JSAPI = {
		"2010" : [
			{"location":"Kiev, Ukraine","latlng":{"lat":50.4501,"lng":30.5234}, "numCommits" : 5},
			{"location":"Novosibirsk","latlng":{"lat":55.00835259999999,"lng":82.9357327}, "numCommits":1}
		],
		"2011" : [
			{"location":"Kiev, Ukraine","latlng":{"lat":50.4501,"lng":30.5234}, "numCommits" : 11},
			{"location":"Novosibirsk","latlng":{"lat":55.00835259999999,"lng":82.9357327}, "numCommits":3}
		],
		"2012" : [
			{"location":"Kiev, Ukraine","latlng":{"lat":50.4501,"lng":30.5234}, "numCommits" : 8},
			{"location":"Novosibirsk","latlng":{"lat":55.00835259999999,"lng":82.9357327}, "numCommits":3}
		],
		"2013" : [
			{"location":"Kiev, Ukraine","latlng":{"lat":50.4501,"lng":30.5234}, "numCommits" : 16},
			{"location":"Novosibirsk","latlng":{"lat":55.00835259999999,"lng":82.9357327}, "numCommits":6}
		],
		"2014" : [
			{"location":"Kiev, Ukraine","latlng":{"lat":50.4501,"lng":30.5234}, "numCommits" : 24},
			{"location":"Novosibirsk","latlng":{"lat":55.00835259999999,"lng":82.9357327}, "numCommits":10}
		]
	};

var Commits_Leaflet = {
"2010":
[{"location":"Kiev, Ukraine","latlng":{"lat":50.4501,"lng":30.5234},"numCommits":86}],
"2011":
[{"location":"Novosibirsk","latlng":{"lat":55.00835259999999,"lng":82.9357327}, "numCommits":1},{"location":"Kiev, Ukraine","latlng":{"lat":50.4501,"lng":30.5234},"numCommits":354},{"location":"Charlotte, NC","latlng":{"lat":35.2270869,"lng":-80.8431267},"numCommits":3},{"location":"Cracow, Poland","latlng":{"lat":50.06465009999999,"lng":19.9449799},"numCommits":1},{"location":"Novosibirsk, Russia","latlng":{"lat":55.00835259999999,"lng":82.9357327},"numCommits":1},{"location":"Goshen, IN","latlng":{"lat":41.5822716,"lng":-85.8344383},"numCommits":1},{"location":"Rapid City, SD","latlng":{"lat":44.0805434,"lng":-103.2310149},"numCommits":1},{"location":"Oakland, CA","latlng":{"lat":37.8043637,"lng":-122.2711137},"numCommits":1}],
"2012":
[{"location":"Novosibirsk","latlng":{"lat":55.00835259999999,"lng":82.9357327}, "numCommits": 5},{"location":"Kiev, Ukraine","latlng":{"lat":50.4501,"lng":30.5234},"numCommits":310},{"location":"Hamilton, New Zealand","latlng":{"lat":-37.7870012,"lng":175.279253},"numCommits":13},{"location":"Missouri","latlng":{"lat":37.9642529,"lng":-91.8318334},"numCommits":1},{"location":"New Zealand","latlng":{"lat":-40.900557,"lng":174.885971},"numCommits":47},{"location":"Braga, Portugal","latlng":{"lat":41.5454486,"lng":-8.426506999999999},"numCommits":1},{"location":"San Francisco, CA","latlng":{"lat":37.7749295,"lng":-122.4194155},"numCommits":2},{"location":"Bonn, Germany","latlng":{"lat":50.73743,"lng":7.0982068},"numCommits":1},{"location":"NL","latlng":{"lat":52.132633,"lng":5.291265999999999},"numCommits":2},{"location":"Seattle, WA","latlng":{"lat":47.6062095,"lng":-122.3320708},"numCommits":5},{"location":"Gelendzhik, Russia","latlng":{"lat":44.55,"lng":38.0833333},"numCommits":2},{"location":"Charlotte, NC","latlng":{"lat":35.2270869,"lng":-80.8431267},"numCommits":4}],
"2013":
[{"location":"Novosibirsk","latlng":{"lat":55.00835259999999,"lng":82.9357327}, "numCommits": 27},{"location":"Kiev, Ukraine","latlng":{"lat":50.4501,"lng":30.5234},"numCommits":158},{"location":"San Francisco, CA","latlng":{"lat":37.7749295,"lng":-122.4194155},"numCommits":19},{"location":"The Netherlands","latlng":{"lat":52.132633,"lng":5.291265999999999},"numCommits":1},{"location":"Hamilton, New Zealand","latlng":{"lat":-37.7870012,"lng":175.279253},"numCommits":4},{"location":"New Zealand","latlng":{"lat":-40.900557,"lng":174.885971},"numCommits":15},{"location":"France","latlng":{"lat":46.227638,"lng":2.213749},"numCommits":3},{"location":"Göteborg, Sweden","latlng":{"lat":57.70887,"lng":11.97456},"numCommits":3},{"location":"New Orleans, LA","latlng":{"lat":29.95106579999999,"lng":-90.0715323},"numCommits":2},{"location":"Washington, DC","latlng":{"lat":38.9071923,"lng":-77.0368707},"numCommits":10},{"location":"Moscow, Russia","latlng":{"lat":55.755826,"lng":37.6173},"numCommits":1},{"location":"Berlin, Germany","latlng":{"lat":52.52000659999999,"lng":13.404954},"numCommits":1},{"location":"Germany","latlng":{"lat":51.165691,"lng":10.451526},"numCommits":2},{"location":"Colorado Springs, Colorado","latlng":{"lat":38.8338816,"lng":-104.8213634},"numCommits":1},{"location":"Kiev","latlng":{"lat":50.4501,"lng":30.5234},"numCommits":1},{"location":"Norway","latlng":{"lat":60.47202399999999,"lng":8.468945999999999},"numCommits":2},{"location":"Minneapolis, MN","latlng":{"lat":44.983334,"lng":-93.26666999999999},"numCommits":2},{"location":"Rivne, Ukraine","latlng":{"lat":50.6199,"lng":26.251617},"numCommits":1},{"location":"Macau","latlng":{"lat":22.198745,"lng":113.543873},"numCommits":2},{"location":"portland, or","latlng":{"lat":45.5234515,"lng":-122.6762071},"numCommits":1},{"location":"Waterloo/DC","latlng":{"lat":43.47267249999999,"lng":-80.54221559999999},"numCommits":1},{"location":"Ukraine, Kiev ","latlng":{"lat":50.4501,"lng":30.5234},"numCommits":1},{"location":"Gothenburg","latlng":{"lat":57.70887,"lng":11.97456},"numCommits":1},{"location":"Ukraine","latlng":{"lat":48.379433,"lng":31.16558},"numCommits":1},{"location":"Boston","latlng":{"lat":42.3584308,"lng":-71.0597732},"numCommits":3}],
"2014":
[{"location":"Novosibirsk","latlng":{"lat":55.00835259999999,"lng":82.9357327}, "numCommits":112},{"location":"Kiev, Ukraine","latlng":{"lat":50.4501,"lng":30.5234},"numCommits":6},{"location":"Bremen, Germany","latlng":{"lat":53.07929619999999,"lng":8.8016937},"numCommits":1},{"location":"Austria, Vienna","latlng":{"lat":48.2081743,"lng":16.3738189},"numCommits":3},{"location":"Washington, DC","latlng":{"lat":38.9071923,"lng":-77.0368707},"numCommits":1},{"location":"Novi Sad, Vojvodina, Serbia","latlng":{"lat":45.25,"lng":19.85},"numCommits":1},{"location":"Norway","latlng":{"lat":60.47202399999999,"lng":8.468945999999999},"numCommits":1},{"location":"Göteborg, Sweden","latlng":{"lat":57.70887,"lng":11.97456},"numCommits":1},{"location":"Sofia, Bulgaria","latlng":{"lat":42.6977082,"lng":23.3218675},"numCommits":1},{"location":"New York, NY","latlng":{"lat":40.7127837,"lng":-74.0059413},"numCommits":1},{"location":"New Zealand","latlng":{"lat":-40.900557,"lng":174.885971},"numCommits":1}]

}	

//	var Commits_Leaflet;

	var GitHubIcon = DG.icon({
	    iconUrl: '/img/github-mark.png',
	    iconRetinaUrl: '/img/github-mark.png',
	    iconSize: [32, 32],
	    iconAnchor: [16, 16]
	});

	var cLayers = [];

	Object.keys(Commits_Leaflet).forEach(
		function(year){

			var commitMark = [];

			addMarkersToGroup(year, commitMark);

		}
	);

	map.setZoom(3);
	map.setView([52.855864177853995, 3.5156250000000004]);


	function addMarkersToGroup(year, aMarkers){
		if(Commits_Leaflet[year]){
			Commits_Leaflet[year].forEach(
				function(commit){
					aMarkers.push( DG.marker([commit.latlng.lat,commit.latlng.lng], {icon: GitHubIcon}).bindPopup(commit.location) );
				}
			);
		}
	}

	function showCommits(year){
		if(!Commits_Leaflet[year] ) { return; }
		for(var y = 2010; y<=year; y++) {
		var commits = [];
		addMarkersToGroup(y, commits);
		cLayers[y] = DG.layerGroup(commits).addTo(map);
		}
		if(year < 2014) {
		for(var hy = year+1; hy<=2014; hy++) {
			console.log("hiding "+hy);
			console.log(cLayers[hy]);
			if( cLayers[hy]) hideCommits(hy);
		}
		}
	}

	function hideCommits(year){
		//if ( !cLayers[year] || !Commits_Leaflet[year] ) { return; }
		 console.log("HIDE "+ year);
		 map.removeLayer(cLayers[year]);
	}

    app.vent.on('changeOpennes', function (data) {
    	showCommits(data.id);
    });

    app.base.control._currEl = $('.openness-examples__example-link_is-shown_true');

    showCommits("2010");

	return map;
};
