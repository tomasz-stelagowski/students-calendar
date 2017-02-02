define([
	"libs/baseView",
	"text!temp/addTaskTemplate.html"
	],function(baseView, tmpl){
		var myView = baseView.extend({
			
			events: {
				
			},
			template: _.template(tmpl, {}),
			initialize: function(){
				

			},
			render: function(){
				this.$el.html(this.template());
				return this;
			}
		});
		return myView;
	}
);