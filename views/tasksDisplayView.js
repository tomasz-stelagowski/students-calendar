define([
	"libs/baseView",
	"moment",
	"coll/tasksCollection",
	"js/taskView",
	"text!temp/taskTemplate.html"
	],function(baseView, Moment, Tasks, Task, tmpl){
		var myView = baseView.extend({
			template: _.template(tmpl),
			initialize: function(options){
				this.day = Moment(options.day, 'DD-MM-YYYY');
				var day = this.day;

				this.refresh();
				//	this.initTasksViews();
			},
			tasks: new Tasks(),
			tasksViews: [],
			initTasksViews: function(){
				this.tasksViews = [];

				this.tasks.each(function(modeltask){
					this.tasksViews.push(new Task({model: modeltask}));
				}, this);

				_.each(this.tasksViews, (function(task){
					this.listenTo(task, "task:update", function(){
						debugger;
						this.trigger("task:update", this.day.format('DD-MM-YYYY'));
					});
				}).bind(this));

			},
			refresh: function(){
				this.tasks.fetch({
					success: (function(){
						this.initTasksViews();
						this.render();
					}).bind(this),
					error: (function(){
						this.render();
					}).bind(this),
					data: {
						date: this.day.format("YYYY-MM-DD")
					},
					reset: true
				})
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