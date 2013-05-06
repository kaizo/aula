$(function() {
	if (!window.aulaApp)
		window.aulaApp = {};
	
	aulaApp.Clas = Backbone.Model.extend({
		initialize: function () {
			if (!this.get('name')) {
				this.save({
					name: 'Sin nombre'
				});
			}

			if (!this.get('students')) {
				this.save({
					students: []
				});
			}
		},

		isStudentEnroled: function (studentName) {
			return this.get('students').indexOf(studentName) > -1;			
		}
	});
});