define([
	"libs/baseView",
	"coll/tasksCollection",
	"js/taskView",
	"text!temp/taskTemplate.html"
	],function(baseView, Tasks, Task, tmpl){
		var myView = baseView.extend({
			template: _.template(tmpl),
			initialize: function(option){
				

			},
			tasks: new Tasks(),

			render: function(){
				this.$el.html("");
				this.tasks.each(function(task){
					this.$el.append(task.render().el);
				}, this);	
			},
			remove: function(){
				Backbone.View.prototype.remove.call(this);
			}

		});
		return myView;
	}
);