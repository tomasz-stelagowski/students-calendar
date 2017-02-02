define([
	"libs/baseView",
	"js/addTaskView",
	"text!temp/taskTemplate.html"
	],function(baseView, AddTask, tmpl){
		var myView = baseView.extend({
			//tagName: "div",
			//className: "my_task",
			events: {
				"change input": "toggle",
				"click": "popup"
			},
			popup: function(){
				this.addTask = new AddTask({task: this, close: this.closePopup.bind(this)});
				$("#popups").append(this.addTask.render().$el);
				$("#popups").removeClass("no-popup");
			},
			closePopup: function(){
				this.addTask = {};
				$("#popups").html("");
				$("#popups").addClass("no-popup");
			},
			toggle: function(){
				if($(this.$("input")).is(':checked')){
					this.model.set("DONE", "Y");
				} else {
					this.model.set("DONE", "N");
				}

				this.model.save()
				this.trigger("task:update");
			},
			template: _.template(tmpl, {}),
			initialize: function(){
				

			},
			render: function(){
				this.$el.html(this.template(this.model.attributes));
				return this;
			}
		});
		return myView;
	}
);