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



// Running Test jQuery
$('#spanishFlag').hover(
        function(){
            $('#englishDiv').fadeOut('normal');

        },
        function(){
            console.log('B');
            $('#englishDiv').fadeIn('normal');
        });


    
    
