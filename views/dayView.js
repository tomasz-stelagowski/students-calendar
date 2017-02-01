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

				console.log(this.dayDate.format("DD-MM-YYYY"));

			},
			tasksDisplayView: new TasksDisplayView(),
			render: function(){
				this.$el.html(this.template({dayName: this.dayName}));
				this.tasksDisplayView.setElement(this.$("#task-area-" + this.dayName)).render();

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