define([
	'jquery', 
	'underscore', 
	'backbone',
	'js/mainView',
	'bootstrap'
	], function($, _, Backbone, MainView){
	var SessionView = Backbone.View.extend({
		initialize: function(){
			var mainView = new MainView({el: $("body")});

		},
		render: function(){

		}
	});

	return SessionView;
});