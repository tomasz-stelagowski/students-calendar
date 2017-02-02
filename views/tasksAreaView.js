define([
	"libs/baseView",
	"moment",
	"js/tasksDisplayView",
	"text!temp/tasksTemplate.html",
	"js/dateNavigationSingleDayView"
	],function(baseView, Moment, TasksDisplayView, tmpl, DateNavigation){
		var myView = baseView.extend({
			initialize: function(){
				this.listenTo(this.dateNavigation, "date:change", function(options){

				});

				this.render();
				
			},
			dateNavigation: new DateNavigation(),
			render: function(){
				this.$el.html(_.template(tmpl, {}));

				this.tasksDisplayView = new TasksDisplayView({el: this.$("#my_tasks-area"), day: Moment('02-02-2017', 'DD-MM-YYYY').format("DD-MM-YYYY")});

				this.dateNavigation.setElement(this.$("#my_tasks-call-nac")).render();
			},
			remove: function(){
				this.tasksDisplayView.remove();
				this.dateNavigation.remove();
				Backbone.View.prototype.remove.call(this);
			}

		});
		return myView;
	}
);