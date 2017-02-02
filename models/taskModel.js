define([
		'libs/baseModel'
	], function(BaseModel){

		var model = BaseModel.extend({
			localeUrl: "tasks.php",
			defaults: {
				NAME: ""
			},
			idAttribute: "ID"
		});

		return model;
});