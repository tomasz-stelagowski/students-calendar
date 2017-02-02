define([
		'backbone'
	], function(Backbone){

		return Backbone.Model.extend({
			baseUrl: 'http://students.mimuw.edu.pl/~ts340234/students-calendar/api/',
			//baseUrl: 'students-calendar/api/',
			urlRoot: function(){
				if(this.localeUrl) return (this.baseUrl + this.localeUrl);
				else return this.baseUrl; 
			}
		});

});