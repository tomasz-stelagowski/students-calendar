define([
		'libs/baseModel'
	], function(BaseModel){

		var model = BaseModel.extend({
			localeUrl: "tasks",
			defaults: {
				NAME: ""
			},
			idAttribute: "ID"
		});

		return model;
});