define([
	'libs/baseCollection',
	'models/taskModel'
	], function(Collection, Task){
		var tasks = Collection.extend({
			model: Task,
			localeUrl: 'tasks',
			initialize: function(){
				debugger;
				this.add({name: "cos"});
				this.add({name: "cos1"});
				this.add({name: "cos2"});
			},
			save: function(){
				this.each(function(task){
					task.save();
				});
			}
		});

		return tasks;
});