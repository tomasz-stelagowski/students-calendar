require.config({
	paths: {
		text : 'bower_components/text/text',
		jquery : 'bower_components/jquery/dist/jquery',
		underscore : 'bower_components/underscore/underscore',
		backbone : 'bower_components/backbone/backbone',
		bootstrap : 'bower_components/bootstrap/dist/js/bootstrap',
		temp : 'templates',
		coll : 'collections',
		js : 'views'
	},
	shim: {
		underscore : {
			exports : '_'
		},
		backbone : {
			deps : ["underscore", "jquery"],
			exports : "Backbone"
		},
		bootstrap : {
			deps : ["jquery"]
		}
	}
});



require(['main'], function(MainView){
	var main_view = new MainView;
})