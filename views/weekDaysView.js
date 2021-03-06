define([
	"libs/baseView",
	"js/dayView",
	"moment"
	],function(baseView, DayView, Moment){
		var myView = baseView.extend({
			initDays: function(){
				this.weekDays = {
					Monday: new DayView({dayDate: this.date.day(1).format('DD-MM-YYYY'), dayName: "monday"}),
					Tuesday: new DayView({dayDate: this.date.day(2).format('DD-MM-YYYY'), dayName: "tuesday"}),
					Wednesday: new DayView({dayDate: this.date.day(3).format('DD-MM-YYYY'), dayName: "wednesday"}),
					Thursday: new DayView({dayDate: this.date.day(4).format('DD-MM-YYYY'), dayName: "thursday"}),
					Friday: new DayView({dayDate: this.date.day(5).format('DD-MM-YYYY'), dayName: "friday"}),
					Saturday: new DayView({dayDate: this.date.day(6).format('DD-MM-YYYY'), dayName: "saturday"}),
					Sunday: new DayView({dayDate: this.date.day(7).format('DD-MM-YYYY'), dayName: "sunday"})
				};
			},
			initialize: function(options){
				options = options || {};
				var date = options.date || Moment().format('DD-MM-YYYY'); 
				this.date = Moment(date, 'DD-MM-YYYY').day(1);

				this.initDays();
			},
			taskUpdate: function(option){
				var when = Moment(option, 'DD-MM-YYYY');
				this.weekDays[when.locale('en').format('dddd')].taskUpdate(option);
			},
			render: function(){
				var $myDays = this.$el;
				_.each(this.weekDays, function(day){ 
					day.render();
					$myDays.append(day.$el.children()[0]);
					// day.setElement($myDays);
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