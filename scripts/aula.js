$(function() {
	if (!window.aulaApp)
		window.aulaApp = {};

	aulaApp.Aula = Backbone.Collection.extend({
		model: aulaApp.Clas,

		localStorage: new Backbone.LocalStorage("aula2"),

		initialize: function () {
			
		},

		comparator: function(clas) {
			return clas.get("id");
		},

		isTimeOk: function (day, hour) {
			if (day > 4 || day < 0) {
				return false;
			}

			if (hour < "09" || hour > "16" || hour === "14") {
				return false;
			}

			return true;
		},

		isAulaFree: function (day, hour) {
			return !this.get(day  + "-" + hour);
		},

		numberOfClassesForStudent: function (name) {
			var count = 0;
			this.each(function (clas) {
				if(clas.isStudentEnroled(name)) {
					count++;
				}
			}, this);
			return count;
		}
	});

	aulaApp.Aula.getInstance = function () {
		if (!this._instance) {
			this._instance = new aulaApp.Aula();
		}
		return  this._instance;
	}
});