define([
	"libs/baseView",
	"moment",
	"text!temp/dayTemplate.html",
	"js/tasksDisplayView"
	],function(baseView, Moment, tmpl, TasksDisplayView){
		var myView = baseView.extend({
			template: _.template(tmpl),
			initialize: function(option){
				this.dayName = option.dayName;
				this.dayDate = Moment(option.dayDate, "DD-MM-YYYY");


			},
			render: function(){
				this.$el.html(this.template({dayName: this.dayName}));

				this.tasksDisplayView = new TasksDisplayView({el: this.$("#task-area-" + this.dayName), day: this.dayDate.format("DD-MM-YYYY")});

				return this;
			},
			taskUpdate: function(option){
				this.tasksDisplayView.refresh();
			},
			remove: function(){
				this.tasksDisplayView.remove();
				Backbone.View.prototype.remove.call(this);
			}

		});
		return myView;
	}
);