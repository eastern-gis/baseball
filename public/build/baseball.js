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

//Class for animated button
//Author - John Talbot July 2016
//Required options object:
/*{
  x: x positioning value for top-left corner of button
  y: y positioning values for top-right corner of button
  w: width of button.
  onDown:{
     handler: function to be called in event of button being pressed down.
        context: 'this' value for hanlder function ( probably the instance of the class containing the handler method )
	},
	onUp{
	   handler: function to be called in even of button being pressed up
	      context: 'this' value for the handler function ( proabably the instance of the class containing the hanlder method )
	      }
	      color1: the color for the button in up mode
	      color2: [ sub-color1, sub-color2]
}
*/
var burstButton = define({
    parentObj:null,
    parentG: null,
    canvas: null,
    button: null,
    onUp: null,
    onDown: null,
    x: null,
    y: null,
    w: null,
    active: true,
    initialize: function( parentGIn, opts  ){
	console.log("Button options ", opts, parentGIn );
	var me = this;
	me.x = opts.x;
	me.y = opts.y;
	me.w = opts.w;
	me.onUp = opts.onUp;
	me.onDown = opts.onDown;
	me.color1 = opts.color1;
	me.color2 = opts.color2;

	me.parentG = parentGIn;
	console.log("ParentGIn", parentGIn);
	//Make g to hold button SVG
	me.canvas = parentGIn.append('g')
	  .attr({
	      'transform': 'translate(' + me.x + ',' + me.y + ')',
	      'width': me.w,
	      'height': me.w
	        });
	
	//Make circle in middle of G
	me.button = me.canvas.append('circle')
	  .attr({
	        'r': me.w ,
	        'opacity': 1 ,
	        'cx': me.w/2 ,
	        'cy': me.w/2 ,
	        'stroke' :"black" ,
	        'stroke-width' :"1" ,
	        'fill': me.color1 
	      });

	//Prime button
	me.setUp();
	me.label();
	
	},
    setUp: function(){
	var me = this;
	
	me.canvas.on('click', function(){
	    if( me.active ) {
		me.onDown.handle.call( me.onDown.context );
		me.animateOut();
		me.setDown();
		}
	    });

	},
    setDown: function(){
	var me = this;
	me.canvas.on('click', function(){
	    if(  me.active ){
		me.onUp.handle.call( me.onUp.context );
		me.animateIn();
		me.setUp();
		}
	    });
	},
    animateOut: function(){
	var me = this;

	var pos = [
	        { x: 0  , y: 0 },
	        { x: me.w , y: 0 },
	        { x: me.w , y: me.w  },
	        { x: 0 , y: me.w  }
	       ]  

	me.button.transition()
	.duration('500')
	.attr('opacity', 0);

	

	for( var i =0 ; i < 4 ; i ++ ){
	    var mini = me.canvas.append('circle')
	    .attr('r', me.w/2.5 )
	    .attr( 'cy', me.w/2 )
	    .attr( 'cx', me.w/2 )
	    .attr('fill', me.color1 )
	    .attr('class', 'miniDot');
	     mini.transition()
	     .duration('500')
	    .attr( 'cy', pos[i].y )
	    .attr( 'cx', pos[i].x )
	    .attr( 'fill', function(){
		return me.color2[ Math.floor( i % 2 ) ]
		})
	    }
	},

    animateIn: function(){
	var me = this;
	var oY = Number( me.button.attr('cy') );
	var oX = Number( me.button.attr('cx') );
	
	me.canvas.selectAll('circle.miniDot')
	.transition()
	.duration('500')
	.attr('cy', oY)
	.attr('cx', oX)
	.attr('fill', me.color1 )
	.remove();

	me.button.transition()
	.duration('500')
	.attr('opacity',1);


	},
    setInactive: function(){
	var me = this;
	me.button.attr( 'fill', 'grey' );
	me.active = false;
	},
    setActive: function(){
	var me = this;
	me.button.transition().duration(300).attr( 'fill', me.color1 )
	me.active = true;
	},
    label: function(){
	var me = this;
	me.parentG.append('div')
	
	}

});

console.log("Hello from test");

var parentG = d3.select('#testDiv').append('svg').append('g');

console.log("ParentG", parentG);


var button = new burstButton( parentG,
			    {
				'x': 1000,
				'y': 1000,
				'w': 100,
				'onUp': null,
				'onDown':null,
				'color1' : 'blue',
				'color2' : ['yellow','red']
			    });


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


    
    
