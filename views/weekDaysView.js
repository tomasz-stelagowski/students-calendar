define([
	"libs/baseView",
	"js/dayView",
	"moment"
	],function(baseView, DayView, Moment){
		var myView = baseView.extend({
			initDays: function(){
				this.weekDays = {
					monday: new DayView({dayDate: this.date.day(1).format('DD-MM-YYYY'), dayName: "monday"}),
					tuesday: new DayView({dayDate: this.date.day(2).format('DD-MM-YYYY'), dayName: "tuesday"}),
					wednesday: new DayView({dayDate: this.date.day(3).format('DD-MM-YYYY'), dayName: "wednesday"}),
					thursday: new DayView({dayDate: this.date.day(4).format('DD-MM-YYYY'), dayName: "thursday"}),
					friday: new DayView({dayDate: this.date.day(5).format('DD-MM-YYYY'), dayName: "friday"}),
					saturday: new DayView({dayDate: this.date.day(6).format('DD-MM-YYYY'), dayName: "saturday"}),
					sunday: new DayView({dayDate: this.date.day(7).format('DD-MM-YYYY'), dayName: "sunday"})
				};
			},
			initialize: function(options){
				options = options || {};
				var date = options.date || Moment().format('DD-MM-YYYY'); 
				this.date = Moment(date, 'DD-MM-YYYY').day(1);

				this.initDays();
			},
			render: function(){
				var $myDays = this.$el;
				_.each(this.weekDays, function(day){ 
					day.setElement($myDays);
					day.render();
					//this.$el.append(day.render().$el.html()); 
				}, this);
			},

			changeDate: function(options){
				if (!(options && options.newDate)) return;

				//this.removeElements();
				this.$el.html("");
				delete this.weekDays;
				this.date = Moment(options.newDate, 'DD-MM-YYYY').day(1);

				this.initDays();
				this.render();
			},

			removeElements: function(){
				_.each(this.weekDays, function(el){
					el.remove();
				});
			},

			remove: function(){
				this.removeElements();
				Backbone.View.prototype.remove.call(this);
			}

		});
		return myView;
	}
);