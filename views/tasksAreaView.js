define([
	"libs/baseView",
	"js/tasksDisplayView",
	"text!temp/tasksTemplate.html",
	"js/dateNavigationView"
	],function(baseView, TasksDisplayView, tmpl, CallNacView){
		var myView = baseView.extend({
			initialize: function(){
				this.render();
				
			},
			tasksDisplayView: new TasksDisplayView(),
			callNacView: new CallNacView(),
			render: function(){
				this.$el.html(_.template(tmpl, {}));

				this.tasksDisplayView.setElement(this.$("#my_tasks-area"));
				this.tasksDisplayView.render();
				
				this.callNacView.setElement(this.$("#my_tasks-call-nac"));
				this.callNacView.render();
			}

		});
		return myView;
	}
);