define([
	"libs/baseView",
	"text!temp/calAreaTemplate.html",
	"js/dayView"
	],function(baseView, tmpl, DayView){
		var myView = baseView.extend({
			weekDays: {
				monday: new DayView({dayName: "monday"}),
				tuesday: new DayView({dayName: "tuesday"}),
				wednesday: new DayView({dayName: "wednesday"}),
				thursday: new DayView({dayName: "thursday"}),
				friday: new DayView({dayName: "friday"}),
				saturday: new DayView({dayName: "saturday"}),
				sunday: new DayView({dayName: "sunday"})
			},
			initialize: function(){
				this.render();

			},
			render: function(){
				this.$el.html(_.template(tmpl, {}));
				var $myDays = this.$("#my_days");

				_.each(this.weekDays, function(day){ day.setElement($myDays); });
				_.each(this.weekDays, function(day){ day.render(); });
			}

		});
		return myView;
	}
);