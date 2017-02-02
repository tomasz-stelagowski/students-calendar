define([
	"libs/baseView",
	"text!temp/dayTemplate.html",
	"js/tasksDisplayView"
	],function(baseView, tmpl, TasksDisplayView){
		var myView = baseView.extend({
			template: _.template(tmpl),
			initialize: function(option){
				this.dayName = option.dayName;
				this.dayDate = option.dayDate;

				console.log(this.dayDate.format("YYYY-MM-DD"));

			},
			render: function(){
				this.$el.html(this.template({dayName: this.dayName}));

				this.tasksDisplayView = new TasksDisplayView({el: this.$("#task-area-" + this.dayName), day: this.dayDate});

				return this;
			},
			remove: function(){
				this.tasksDisplayView.remove();
				Backbone.View.prototype.remove.call(this);
			}

		});
		return myView;
	}
);