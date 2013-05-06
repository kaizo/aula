$(function(){
	if (!window.aulaApp)
		window.aulaApp = {};
	
	aulaApp.AulaView = Backbone.View.extend({
		el: $('#aulaApp'),
		
		events: {
			'click #reservationButton': 'showReservationForm',
			'click #classReservationOkButton': 'saveClass',
			'click #classReservationCancleButton': 'cancelReservation',
			'click #showReservationsButton': 'showReservedTimes'
		},

		initialize: function () {
			this.reservationButton = $('#reservationButton');
			this.reservationForm = $('#reservationForm');
			this.reservedTimes = $('#reservedTimes');
			this.reservedTimesList = $('#reservedTimesList');
			this.aula = aulaApp.Aula.getInstance();

			//listening to the collection
			this.listenTo(this.aula, 'add', this.addAll);
			this.listenTo(this.aula, 'reset', this.addAll);
			
			this.aula.fetch();
		},

		showReservationForm: function () {
			this.reservationForm.show();
			this.reservedTimes.hide();
		},

		cancelReservation: function () {
			this.reservationForm.hide();
			this.reservedTimes.show();
		},

		saveClass: function () {
			var day = $("#classReservationDayInput").val(),
				hour = $("#classReservationHourInput").val();

			if (hour < 10) {
				hour = "0" + hour;
			}

			if (!this.aula.isTimeOk(day, hour)) {
				alert("El horario para empezar una clase es de 9-13 y de 15 a 16 y los días del 0 al 4");
				return;
			}

			if (!this.aula.isAulaFree(day, hour)) {
				alert("Esta franja horaria está ocupada, por fabor elija otra.");
				return;
			}

			this.aula.create({
				id: day + "-" + hour,
				name: $("#classReservationNameInput").val(),
				day: day,
				hour: hour,
				students: []
			});
			this.reservationForm.hide();
			this.reservedTimes.show();

		},

		showReservedTimes: function () {
			this.reservedTimes.show();
			this.reservationForm.hide();
		},

		addAll: function () {
			this.reservedTimesList.html('');
			this.aula.each(this.addClas, this);
		},

		addClas: function (clas) {
			var view = new aulaApp.ClasView({model: clas});
			this.reservedTimesList.append(view.render().el);
		}
	});

	new aulaApp.AulaView();

});