define([
	'jquery', 
	'underscore', 
	'backbone',
	'js/mainView',
	'bootstrap'
	], function($, _, Backbone, MainView){
	var SessionView = Backbone.View.extend({
		initialize: function(){
			var mainView = new MainView({el: $("#app")});

		},
		render: function(){

		}
	});

	return SessionView;
});