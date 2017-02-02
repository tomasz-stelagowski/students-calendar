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
				options.cal && options.cal.call(this);
				
				this.day = Moment(options.day, 'DD-MM-YYYY');
				var day = this.day;

				this.tasks.fetch({
					success: (function(){
						this.initTasksViews();
						this.render();
					}).bind(this),
					error: (function(){
						console.log("error");
						this.tasks.add({ name: 'wytryh' });
						this.initTasksViews();
						this.render();
					}).bind(this),
					data: {
						date: this.day.format("YYYY-MM-DD")
					},
					reset: true
				})
				//	this.initTasksViews();
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