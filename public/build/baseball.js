/*
Tu Hoang
ESRGC
2014

class.js
utility functions that implements OOP
*/

/*
function that defines a new class by passing a new
prototype object (literal) as parameter. New classes
can extend/inherit from other classes by passing the 
inherit class name to extend property of the new class 
prototype object

Example:
var newClass = dx.define({
extend: OtherClass,
initialize: function(options){
};
});
*/
var define = function(child) {
  var ch = child;
  var p = ch.extend;
  var _class_ = null;
  if (p == null || typeof p == 'undefined') {
    _class_ = function() {
      if (typeof this.initialize != 'undefined')
        this.initialize.apply(this, arguments);
    };
    _class_.prototype = ch;
  }
  else {
    _class_ = function() {
      var init = typeof this.initialize == 'function' ? this.initialize : 'undefined';
      //run child initialize function if exists
      if (typeof init == 'function') {
        init.apply(this, arguments);
      }
    };
    extend(_class_, p); //inherit prototype
    copy(_class_.prototype, ch); //augment prototype
  }
  return _class_;
};
/*
Deep copy object prototype by new keyword.
This method creates a new prototype object, whose prototype 
is a copy of the parent's prototype, and assign it to the child prototype.
Finally, sets the child's prototype constructor to the child's constructor
*/
var extend = function(child, parent) {
  var F = function() { };
  F.prototype = parent.prototype;
  child.prototype = new F();
  child.prototype.constructor = child;
  child.parent = parent.prototype;
};
//copy object properties
var copy = function(dest, source) {
  dest = dest || {};
  if (source) {
    for (var property in source) {
      var value = source[property];
      if (value !== undefined) {
        dest[property] = value;
      }
    }
    /**
    * IE doesn't include the toString property when iterating over an object's
    * properties with the for(property in object) syntax.  Explicitly check if
    * the source has its own toString property.
    */
    /*
    * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
    * prototype object" when calling hawOwnProperty if the source object
    * is an instance of window.Event.
    */

    var sourceIsEvt = typeof window.Event == "function"
                          && source instanceof window.Event;

    if (!sourceIsEvt &&
                source.hasOwnProperty && source.hasOwnProperty("toString")) {
      dest.toString = source.toString;
    }
  }
  return dest;
};

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

//Lets do some simple objects

//Define a "class"
//This is our 'constructor' function it will assebmle new objects of our class
//We will pass it a name and a job
var simpleDeveloper = function( nameIn, jobIn ){
    //It assigns the names to 'this'. WTF is 'this'? This refers to
    //all the variables in the scope of this function.
    this.name = nameIn;
    this.job = jobIn;

    //Now lets give our class a method. It can print its own information here
    this.whoAmI = function(){
	console.log("Name: ", this.name );
	console.log("Name: ", this.job );
	console.log("\n\n");
    }
}


//Now lets make an object of our developer class!
var jeff = new simpleDeveloper( "Jeff", "Frontend-Developer");

//Then call the objects whoAmI method.
console.log("Printing Jeffs object");
jeff.whoAmI();

//Lets make another variable, but we are lazy and will just do
console.log("Assinging var carl = jeff");
var carl = jeff;

//Then change the name

carl.name = "Carl";

//Lets see carl
console.log("Printing carls object");
carl.whoAmI();

//Thats good, lets print Jeff agian though....
console.log("Printing Jeff agian");
jeff.whoAmI();

//As you can see, Jeffs name is carl now! What happend is that the '=' operator 
//can do two diferent things and this is very fucking important. When you are dealing with
//objects, the = operator does not create a copy. It assigned the same object that the jeff
//variable is pointing to as carl. So now we have two variables 'referencing' the same object.
//This can really screw you up so remeber, objects are passed around by 'reference' not by value!


//Here is an example of 
console.log("Making function call and passing carl");
var myFunction = function( obj ){
    obj.name = "John"
}


myFunction( carl );
console.log("Printing jeff and carl after passing to function");
jeff.whoAmI();
carl.whoAmI();

//They both have the name John now.


    
    
