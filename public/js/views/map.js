var mapView = Backbone.View.extend({
    el: '#mapDiv',
    mapMain: null,
    initialize: function(){
	console.log("initializing map view");
	this.mapMain = L.map( this.el ).setView([ 40 , -100 ], 5);
	L.tileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', {
	    attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(this.mapMain);
	
	
    },
    loadData: function( dataIn ){
	console.log("Loading points", dataIn );
	L.geoJson( dataIn ).addTo( this.mapMain );	
    }
});
