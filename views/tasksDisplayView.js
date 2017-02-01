define([
	"libs/baseView",
	"coll/tasksCollection",
	"js/taskView",
	"text!temp/taskTemplate.html"
	],function(baseView, Tasks, Task, tmpl){
		var myView = baseView.extend({
			template: _.template(tmpl),
			initialize: function(options){
				this.day = options.day;
				var day = this.day;

				this.tasks.fetch({
					success: this.initTasksViews.bind(this),
					error: function(){

					},
					data: {
						date: this.day.format("YYYY-MM-DD")
					}
				})
					this.initTasksViews();
			},
			tasks: new Tasks(),
			tasksViews: [],
			initTasksViews: function(){
				this.tasksViews = [];

				this.tasks.each(function(task){
					this.tasksViews.push(new Task({model: task}));
				}, this);
			},

			render: function(){
				this.$el.html("");
				_.each(this.tasksViews, function(task){
					this.$el.append(task.render().el);
				}, this);	
			},
			remove: function(){
				_.each(this.tasksViews, function(task){
					task.remove();
				});
				Backbone.View.prototype.remove.call(this);
			}

		});
		return myView;
	}
);