define([
	"libs/baseView",
	"text!temp/addTaskTemplate.html"
	],function(baseView, tmpl){
		var myView = baseView.extend({
			
			events: {
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
				this.$("[close]").on("click", this.closePopup.bind(this));
				return this;
			}
		});
		return myView;
	}
);