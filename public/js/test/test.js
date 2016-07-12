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

