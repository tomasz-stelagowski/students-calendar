define([
	"libs/baseView",
	"text!temp/calAreaTemplate.html",
	"js/weekDaysView",
	"js/dateNavigationSingleWeekView"
	],function(baseView, tmpl, WeekDaysView, DateNavigationView){
		var myView = baseView.extend({
			weekDaysView: new WeekDaysView(),
			dateNavigationView: new DateNavigationView(),
			initialize: function(){
				this.listenTo(this.dateNavigationView, 'date:change', function(newDate){
					this.weekDaysView.changeDate({newDate: newDate.firstDate});
				});

			},
			render: function(){
				this.$el.html(_.template(tmpl, {}));

				this.dateNavigationView.setElement(this.$("#my_call-nac")).render();
				this.weekDaysView.setElement(this.$("#my_days")).render();
				
			},

			remove: function(){
				this.dateNavigationView.remove();
				this.weekDaysView.remove();
				Backbone.View.prototype.remove.call(this);
			}

		});
		return myView;
	}
);