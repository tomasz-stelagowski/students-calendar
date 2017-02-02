define([
		'backbone'
	], function(Backbone){

		var model = Backbone.Model.extend({
			defaults: {
				NAME: ""
			},
			idAttribute: "ID"
		});

		return model;
});