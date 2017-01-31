require.config({
	paths: {
		text : 'bower_components/text/text',
		jquery : 'bower_components/jquery/dist/jquery',
		underscore : 'bower_components/underscore/underscore',
		backbone : 'bower_components/backbone/backbone',
		bootstrap : 'bower_components/bootstrap/dist/js/bootstrap',
		datepicker : 'bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min',
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
		},
		datepicker : {
			deps : ["jquery", "moment", "bootstrap"],
		}

	},
	packages : [{
		name: 'moment',
		location: 'bower_components/moment',
		main: 'moment'
	}]
});



require(['main'], function(MainView){
	var main_view = new MainView;
})