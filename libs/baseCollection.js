define([
	'backbone',
	], function(Backbone){
		return Backbone.Collection.extend({
			baseUrl: 'http://students.mimuw.edu.pl/~ts340234/api/',
			url: function(){
				return (this.baseUrl + this.localeUrl); 
			}
		});
});