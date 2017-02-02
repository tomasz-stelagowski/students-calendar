define([
	"libs/baseView",
	"text!temp/mainTemplate.html",
	"js/callendarView",
	"js/tasksAreaView",
	"js/navView"
	],function(baseView, tmpl, CallendarView, TasksView, NavView){
		var myView = baseView.extend({
			initialize: function(){

				this.callendarView = new CallendarView();
				this.tasksView = new TasksView();
				this.navView = new NavView();
				
				this.listenTo(this.tasksView, "task:update", function(option){
					this.callendarView.taskUpdate(option);
				});

				this.render();
			},
			render: function(){
				this.$el.html(_.template(tmpl, {}));
				
				this.callendarView.setElement(this.$("#cal-col")).render();
				this.tasksView.setElement(this.$("#task-col")).render();
				this.navView.setElement(this.$("nav")).render();
			},

			remove: function(){
				this.callendarView.remove();
				this.tasksView.remove();
				this.navView.remove();
				Backbone.View.prototype.remove.call(this);
			}

		});
		return myView;
	}
);