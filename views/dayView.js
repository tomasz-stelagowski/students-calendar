define([
	"libs/baseView",
	"text!temp/dayTemplate.html",
	"js/tasksDisplayView"
	],function(baseView, tmpl, TasksDisplayView){
		var myView = baseView.extend({
			template: _.template(tmpl),
			initialize: function(option){
				this.dayName = option.dayName;

			},
			tasksDisplayView: new TasksDisplayView(),
			render: function(){
				this.$el.append(this.template({dayName: this.dayName}));
				this.tasksDisplayView.setElement(this.$("#task-area-" + this.dayName));
				this.tasksDisplayView.render();
			}

		});
		return myView;
	}
);