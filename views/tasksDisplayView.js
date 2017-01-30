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
				this.addAll();
			},
			addOne: function(task){
				var taskView = new Task({model : task});
				this.$el.append(taskView.render().el);
			},
			addAll: function(){
				this.tasks.each(function(task){
					this.addOne(task);
				}, this);	
			}

		});
		return myView;
	}
);