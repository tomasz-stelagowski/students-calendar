define([
	"libs/baseView",
	"text!temp/addTaskTemplate.html"
	],function(baseView, tmpl){
		var myView = baseView.extend({
			
			events: {
				"click .close": "closePopup"
			},
			closePopup: function(){
				this.closeCallback();
			},
			template: _.template(tmpl, {}),
			initialize: function(options){
				this.closeCallback = options.close;
				this.task = options.task;
				

			},
			render: function(){
				this.$el.html(this.template());
				return this;
			}
		});
		return myView;
	}
);