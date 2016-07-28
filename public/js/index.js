function startBaseballApp(){
    console.log("Starting baseball app");
    var map = new mapView();
    var data = new dataCollection();
    data.onDataLoaded = function(){
	//Load 10
	for( var i = 0; i < 10; i++ ){
	    var points = data.getDataByIndex( i );
	    map.loadData( points );
	}
    }
    data.fetchData();
    data.logContents();
}
