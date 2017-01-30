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
			render: function(){
				this.$el.append(this.template({dayName: this.dayName}));
				this.tasksDisplayView = new TasksDisplayView({el: this.$("#task-area-" + this.dayName)});
			}

		});
		return myView;
	}
);