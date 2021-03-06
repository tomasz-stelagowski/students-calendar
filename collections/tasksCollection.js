define([
	'libs/baseCollection',
	'models/taskModel'
	], function(Collection, Task){
		var tasks = Collection.extend({
			model: Task,
			localeUrl: 'tasks.php',
			initialize: function(){
			},
			save: function(){
				this.each(function(task){
					task.save();
				});
			}
		});

		return tasks;
});