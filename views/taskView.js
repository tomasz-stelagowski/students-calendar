define([
	"libs/baseView",
	"text!temp/taskTemplate.html"
	],function(baseView, tmpl){
		var myView = baseView.extend({
			//tagName: "div",
			//className: "my_task",
			events: {
				"change input": "toggle"
			},
			toggle: function(){
				if($(this.$("input")).is(':checked')){
					this.model.set("DONE", "Y");
				} else {
					this.model.set("DONE", "Y");
				}
				//this.model.save();
				//this.model.destroy(null, {headers: {page: 3}});
				this.model.save()
			},
			template: _.template(tmpl, {}),
			initialize: function(){
				

			},
			render: function(){
				this.$el.html(this.template(this.model.attributes));
				return this;
			}
		});
		return myView;
	}
);