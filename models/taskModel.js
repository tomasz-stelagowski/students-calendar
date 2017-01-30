define([
		'backbone'
	], function(Backbone){

		var model = Backbone.Model.extend({
			defaults: {
				name: ""
			}
		});

		return model;
});