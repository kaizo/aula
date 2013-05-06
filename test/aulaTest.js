define(['test/helper', "scripts/aula"], function (helper) {
	suite("Aula tests", function () {
		// Subject Under Test
		var Sut;

		setup(function () {
			//The model needs a localStorage or a collection with localStorage
			Sut = aulaApp.Aula.extend({
				model: aulaApp.Clas,
				localStorage: helper.localStorageFake
			});
		});

		test("isAulaFree returs true when aula empty", function () {
			var aula = new Sut();

			assert.isTrue(aula.isAulaFree(1,"13"));
		});

		test("isAulaFree returs false when aula is in use", function () {
			var aula = new Sut();
			var day = 1;
			var hour = "13";
			var name = "name";

			aula.create({
				id: day + "-" + hour,
				name: name,
				day: day,
				hour: hour,
				students: []
			});


			assert.isFalse(aula.isAulaFree(1,"13"));
		});
	});
});