define([
	'moment',
	'libs/baseView',
	'text!temp/callNacTemplate.html'
	],function(Moment, BaseView, tmpl){
		return BaseView.extend({
			initialize : function(options){
			},

			template: _.template(tmpl),

			events: {
				'click [left-arrow]' : 'leftClick',
				'click [right-arrow]' : 'rightClick'
			},
			leftClick: function(){
				var newday = Moment(this.$('[datetimepicker]').val(), 'DD-MM-YYYY').subtract(1,'d').format("DD-MM-YYYY");
				this.$('[datetimepicker]').val(newday);
				this.trigger("date:change", {date: newday});
			},
			rightClick: function(){
				var newday = Moment(this.$('[datetimepicker]').val(), 'DD-MM-YYYY').add(1,'d').format("DD-MM-YYYY");
				this.$('[datetimepicker]').val(newday);
				this.trigger("date:change", {date: newday});
			},

			render : function(){
				this.$el.html(this.template());
				this.$el.addClass("my_single-day");
				this.postrender();
			},
			postrender : function(){
				var now = Moment().format("DD-MM-YYYY");
				this.$('[datetimepicker]').datetimepicker({format: 'DD-MM-YYYY', showTodayButton: true});
				this.$('[datetimepicker]').val(now);

				this.$('[datetimepicker]').on('dp.change', (function (e) {
					var val = this.$('[datetimepicker]').val();
					var newval = Moment(val, "DD-MM-YYYY").format("DD-MM-YYYY");
					this.trigger("date:change", {date: newval});
				}).bind(this));
			},

			remove: function(){
				Backbone.View.prototype.remove.call(this);
			}

		});
});