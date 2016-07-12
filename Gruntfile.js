module.exports = function(grunt){
     
    grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	concat:{
	    options:{
		seperator: ':'
		},
	    dist:{
		src:['./public/js/utils/*.js','public/js/test/*.js','./public/js/*.js'],
		dest:'./public/build/baseball.js'
	    }
	},
	watch: {
	    files:['./public/js/*.js','./public/js/test/*.js'],
	    tasks: ['concat']
	}
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default',['concat','watch']);
}
