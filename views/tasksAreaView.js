define([
	"libs/baseView",
	"js/tasksDisplayView",
	"text!temp/tasksTemplate.html"
	],function(baseView, TasksDisplayView, tmpl){
		var myView = baseView.extend({
			initialize: function(){
				this.render();
				
				var tasksDisplayView = new TasksDisplayView({el: this.$("#my_tasks-area")});
			},
			render: function(){
				this.$el.html(_.template(tmpl, {}));
			}

		});
		return myView;
	}
);