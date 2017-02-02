define([
	"jquery",
	"underscore",
	"backbone",
	"moment",
	"datepicker",
	"moment/locale/pl"
	],function($, _, Backbone, Moment){
		var BaseView = function(options){
			Moment.locale('en');
			Backbone.emulateHTTP = true;

			Backbone.View.apply(this, [options]);
		}

		_.extend(BaseView.prototype, Backbone.View.prototype, {

		})
		BaseView.extend = Backbone.View.extend;

		return BaseView;
	}
);