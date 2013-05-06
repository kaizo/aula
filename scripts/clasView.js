$(function() {
	if (!window.aulaApp)
		window.aulaApp = {};
	
	aulaApp.ClasView = Backbone.View.extend({
		tagName: 'div',

		template: _.template($('#clasTemplate').html()),

		events: {
			'click .addStudent': 'addStudent',
			'click .newStudent': 'showAddStudentContainer',
			'click .cancelAddStudent': 'cancelAddStudent'
		},

		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));

			this.studentName = this.$el.find(".studentName");
			
			return this;
		},

		addStudent: function () {
			var studentName = this.studentName.val();
			if (this.model.isStudentEnroled(studentName)) {
				alert("Este alumno ya está apuntado en esta clase");
				return;
			}

			if (aulaApp.Aula.getInstance().numberOfClassesForStudent(studentName) === 3) {
				alert("Ya estás participando en tres clases.");
				return;
			}

			var students = this.model.get('students');

			this.model.save({
				students: students.concat([studentName])
			});
		},

		showAddStudentContainer: function () {
			this.$el.find(".addStudentContainer").show();
		},

		cancelAddStudent: function () {
			this.$el.find(".addStudentContainer").hide();
		}
	});
});