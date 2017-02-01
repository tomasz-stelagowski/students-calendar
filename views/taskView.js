define([
	"libs/baseView",
	"text!temp/taskTemplate.html"
	],function(baseView, tmpl){
		var myView = baseView.extend({
			//tagName: "div",
			//className: "my_task",
			template: _.template(tmpl, {}),
			initialize: function(){
				
			},
			render: function(){
				this.$el.html(this.template(this.model.attributes));
				return this;
			},
			remove: function(){
				Backbone.View.prototype.remove.call(this);
			}
		});
		return myView;
	}
);