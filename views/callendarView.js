define([
	"libs/baseView",
	"text!temp/calAreaTemplate.html",
	"js/dayView",
	"js/dateNavigationView"
	],function(baseView, tmpl, DayView, CallNacView){
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
			callNacView: new CallNacView(),
			initialize: function(){
				
				this.render();
			},
			render: function(){
				this.$el.html(_.template(tmpl, {}));

				this.callNacView.setElement(this.$("#my_call-nac"));
				this.callNacView.render();


				var $myDays = this.$("#my_days");
				_.each(this.weekDays, function(day){ 
					day.setElement($myDays); 
					day.render();
				});
			}

		});
		return myView;
	}
);