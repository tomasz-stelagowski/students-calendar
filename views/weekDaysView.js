define([
	"libs/baseView",
	"js/dayView",
	"moment"
	],function(baseView, DayView, Moment){
		var myView = baseView.extend({
			initDays: function(){
				this.weekDays = {
					monday: new DayView({dayDate: this.date.day(1), dayName: "monday"}),
					tuesday: new DayView({dayDate: this.date.day(2), dayName: "tuesday"}),
					wednesday: new DayView({dayDate: this.date.day(3), dayName: "wednesday"}),
					thursday: new DayView({dayDate: this.date.day(4), dayName: "thursday"}),
					friday: new DayView({dayDate: this.date.day(5), dayName: "friday"}),
					saturday: new DayView({dayDate: this.date.day(6), dayName: "saturday"}),
					sunday: new DayView({dayDate: this.date.day(7), dayName: "sunday"})
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
					this.$el.append(day.render().$el.html()); 
				}, this);
			},

			changeDate: function(options){
				if (!(options && options.newDate)) return;

				this.removeElements();
				this.$el.html("");
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