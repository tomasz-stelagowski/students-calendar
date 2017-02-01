define([
	'moment',
	'libs/baseView',
	'text!temp/callNacTemplate.html'
	],function(Moment, BaseView, tmpl){
		return BaseView.extend({
			initialize : function(options){
			},

			template: _.template(tmpl),
			render : function(){
				this.$el.html(this.template());
				this.postrender();
			},
			postrender : function(){
				var now = Moment().format("DD-MM-YYYY");
				this.$('[datetimepicker]').datetimepicker({format: 'DD-MM-YYYY'});
				var firstDate = Moment(now, "DD-MM-YYYY").day(1).format("DD-MM-YYYY");
				var lastDate =  Moment(now, "DD-MM-YYYY").day(7).format("DD-MM-YYYY");
				this.$('[datetimepicker]').val(firstDate + " - " + lastDate);
				

				this.$('[datetimepicker]').on('dp.change', (function (e) {
					var value = this.$('[datetimepicker]').val();
					var firstDate = Moment(value, "DD-MM-YYYY").day(1).format("DD-MM-YYYY");
					var lastDate =  Moment(value, "DD-MM-YYYY").day(7).format("DD-MM-YYYY");
					this.$('[datetimepicker]').val(firstDate + " - " + lastDate);
				}).bind(this));
			},

			remove: function(){
				Backbone.View.prototype.remove.call(this);
			}

		});
});