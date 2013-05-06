define([], function () {
	
	var localStorageFake = {
		save: function (){},
		_clear: function (){},
		_storageSize: function (){},
		create: function (){},
		destroy: function (){},
		find: function (){},
		findAll: function (){},
		jsonData: function (){},
		localStorage: function (){},
		update: function (){},
		records: [],
		name: "testLocalStorage"
	};

	return {
		localStorageFake: localStorageFake
	};
});