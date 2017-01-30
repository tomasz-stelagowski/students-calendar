define([
	"libs/baseView",
	"text!temp/navbarTemplate.html"
	],function(baseView, tmpl){
		var myView = baseView.extend({
			template: _.template(tmpl),
			initialize: function(option){
				this.render();
				
			},
			render: function(){
				this.$el.append(this.template());
			}

		});
		return myView;
	}
);