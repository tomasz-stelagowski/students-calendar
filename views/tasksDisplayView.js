define([
	"libs/baseView",
	"coll/tasksCollection",
	"js/taskView",
	"text!temp/taskTemplate.html"
	],function(baseView, Tasks, Task, tmpl){
		var myView = baseView.extend({
			template: _.template(tmpl),
			initialize: function(option){
				this.tasks = new Tasks;

				this.tasks.save();
			},
			addOne: function(task){
				var taskView = new Task({model : task});
				this.$el.append(taskView.render().el);
			},
			render: function(){
				this.$el.html("");
				this.tasks.each(function(task){
					this.addOne(task);
				}, this);	
			}

		});
		return myView;
	}
);