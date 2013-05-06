define(['test/helper', "scripts/clas"], function (helper) {
	suite("Clas test", function () {
		// Subject Under Test
		var Sut;

		setup(function () {
			//The model needs a localStorage or a collection with localStorage
			Sut = aulaApp.Clas.extend({
				localStorage: helper.localStorageFake
			});
		});

		test("Clas adds a default name if the name is not specified", function () {
			var testClas = new Sut({});

			assert.equal(testClas.get('name'), 'Sin nombre', "The default name is not applied");
		});

		test("isStudentEnroled returns true when student is in the class", function () {
			var studentName = 'Student name';
			var clas = new Sut({
				students: [studentName]
			});

			assert.isTrue(clas.isStudentEnroled(studentName), 
				"isStudentEnroled didn't return true when asked for a existing student");

		});
	});
});