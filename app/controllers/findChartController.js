app.controller('findChartController', 
	["$firebaseArray", "$firebaseAuth",
	function($firebaseArray, $firebaseAuth) {
		var vm = this;
		vm.test = "cat";
    vm.usrSearch = "";

		// firebase ref to all charts
    var chartsRef = new Firebase("https://jcsdevnsscapstone1.firebaseio.com/charts");

		// get auth uid to save charts to update createdBy;
    var authObj = $firebaseAuth(chartsRef);
    var authData = authObj.$getAuth();
    if (authData) {
      console.log("Logged in as:", authData.uid);
    } 
    else {
      console.log("Logged out");
    }

    // make array of all charts
    vm.allCharts = $firebaseArray(chartsRef);

    vm.getChartPrev = function(chart) {
    	vm.chartToPrev = chart;
    };

    
/********* saveChart method ************/
  	vm.addChart = function() {
  		// attach uid to user chart library
  		vm.chartToPrev.createdBy = authData.uid;
  		// add newChart object to firebase array
			vm.allCharts.$add(vm.chartToPrev).then(function(ref) {
				// close modal
				$('#modalPreview').modal('hide');
			});
  	};

	
}]);