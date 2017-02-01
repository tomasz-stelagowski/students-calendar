define([
	'moment',
	'libs/baseView',
	'text!temp/callNacTemplate.html'
	],function(Moment, BaseView, tmpl){
		return BaseView.extend({
			initialize : function(options){
			},
			events: {
				'click [left-arrow]' : 'leftClick',
				'click [right-arrow]' : 'rightClick'
			},
			leftClick: function(){
				var value = this.$('[datetimepicker]').val();
				var firstDate = Moment(value, "DD-MM-YYYY").subtract(7, 'd').day(1).format("DD-MM-YYYY");
				var lastDate =  Moment(value, "DD-MM-YYYY").subtract(7, 'd').day(7).format("DD-MM-YYYY");
				this.$('[datetimepicker]')[0].value = firstDate + " - " + lastDate;
				this.trigger("date:change", {firstDate: firstDate, lastDate: lastDate});
				
			},
			rightClick: function(){
				var value = this.$('[datetimepicker]').val();
				var firstDate = Moment(value, "DD-MM-YYYY").add(7, 'd').day(1).format("DD-MM-YYYY");
				var lastDate =  Moment(value, "DD-MM-YYYY").add(7, 'd').day(7).format("DD-MM-YYYY");
				this.$('[datetimepicker]')[0].value = firstDate + " - " + lastDate;
				this.trigger("date:change", {firstDate: firstDate, lastDate: lastDate});
			},

			template: _.template(tmpl),
			render : function(){
				this.$el.html(this.template());
				this.$el.addClass("my_single-week");
				this.postrender();
			},
			postrender : function(){
				var now = Moment().format("DD-MM-YYYY");
				this.$('[datetimepicker]').datetimepicker({format: 'DD-MM-YYYY', showTodayButton: true});
				var firstDate = Moment(now, "DD-MM-YYYY").day(1).format("DD-MM-YYYY");
				var lastDate =  Moment(now, "DD-MM-YYYY").day(7).format("DD-MM-YYYY");
				this.$('[datetimepicker]')[0].value = firstDate + " - " + lastDate;
				

				this.$('[datetimepicker]').on('dp.change', (function (e) {
					var value = this.$('[datetimepicker]').val();
					var firstDate = Moment(value, "DD-MM-YYYY").day(1).format("DD-MM-YYYY");
					var lastDate =  Moment(value, "DD-MM-YYYY").day(7).format("DD-MM-YYYY");
					this.$('[datetimepicker]')[0].value = firstDate + " - " + lastDate;
					this.trigger("date:change", {firstDate: firstDate, lastDate: lastDate});
				}).bind(this));
			},

			remove: function(){
				Backbone.View.prototype.remove.call(this);
			}

		});
});