define([
	"libs/baseView",
	"text!temp/mainTemplate.html",
	"js/callendarView",
	"js/tasksAreaView",
	"js/navView"
	],function(baseView, tmpl, CallendarView, TasksView, NavView){
		var myView = baseView.extend({
			initialize: function(){
				this.render();
				var callendarView = new CallendarView({el: this.$("#cal-col")});
				var tasksView = new TasksView({el: this.$("#task-col")});
				var navView = new NavView({el: this.$("nav")});
			},
			render: function(){
				this.$el.html(_.template(tmpl, {}));
			}

		});
		return myView;
	}
);