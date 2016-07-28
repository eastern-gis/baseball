var dataCollection = Backbone.Collection.extend({
    name:"DataCollection",
    url:'/data',
    geoJSON: [],
    fetchData: function(){
	var me = this;
	this.fetch({
	    success: function( collection, response ){
		console.log("We go the data!", response );
		me.setToGeo(response.rows);
		if( typeof me.onDataLoaded == 'function' )
		    me.onDataLoaded();
	    },
	    error: function( err ){
		console.log("Data fetch error!");
	    }
	});
    },
    setToGeo: function( data ){
	for( i in data )
	    this.geoJSON.push(
		{
		    "type": "Feature",
   		    "geometry": JSON.parse(data[i].st_asgeojson),
		    "properties":{
			"name": data[i].aff_1993 
		    }

	});
	    
    },
    logContents: function(){
	console.log("Logging models");
	console.log( this.models );
    },
    
    getDataByIndex: function( index ){
	if( index >= this.geoJSON.length )
	    console.error("Tried to request data out of array range");
	else
	    return this.geoJSON[index];
    }
});
