define([
	"libs/baseView",
	"moment",
	"js/tasksDisplayView",
	"text!temp/tasksTemplate.html",
	"js/dateNavigationSingleDayView"
	],function(baseView, Moment, TasksDisplayView, tmpl, DateNavigation){
		var myView = baseView.extend({
			initialize: function(){
				this.date = Moment().format('DD-MM-YYYY');
				this.listenTo(this.dateNavigation, "date:change", this.reRenderTaskList.bind(this));
			},
			dateNavigation: new DateNavigation(),
			render: function(){
				this.$el.html(_.template(tmpl, {}));

				this.tasksDisplayView = new TasksDisplayView({el: this.$("#my_tasks-area"), day: Moment('02-02-2017', 'DD-MM-YYYY').format("DD-MM-YYYY")});


				this.dateNavigation.setElement(this.$("#my_tasks-call-nac")).render();
			},
			initTaskDisplayView: function(){
				this.tasksDisplayView = new TasksDisplayView({el: this.$("#my_tasks-area"), day: Moment('02-02-2017', 'DD-MM-YYYY').format("DD-MM-YYYY")});
				this.listenTo(this.tasksDisplayView, "task:update", function(options){
					this.trigger("task:update", options);
				});

			},
			reRenderTaskList: function(options){
				this.date = options.date;
				delete 	this.tasksDisplayView;
				this.$("#my_tasks-area").html("");
				this.tasksDisplayView = new TasksDisplayView({el: this.$("#my_tasks-area"), day: Moment(this.date, 'DD-MM-YYYY').format("DD-MM-YYYY")});
			},
			removeElements: function(){
				this.tasksDisplayView && this.tasksDisplayView.remove();
				this.dateNavigation && this.dateNavigation.remove();
			},
			remove: function(){
				this.removeElements();
				Backbone.View.prototype.remove.call(this);
			}

		});
		return myView;
	}
);