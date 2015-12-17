app.controller("createChartController",
  ["$firebaseArray", "$firebaseAuth", "$location", "$rootScope",
  function($firebaseArray, $firebaseAuth, $location, $rootScope) {
  	// assign this $scope to vm, standing for 'view-model'
    var vm = this;

    // ref to firebase app, used for saving.
  	var appRef = new Firebase("https://jcsdevnsscapstone1.firebaseio.com");

/************ Setup seesion storage to cache charts befored being save *************/
var hasSessStorage = false;

// Check for browser storage support and setup newChart model
if( typeof(Storage) !== "undefined" ) {
    // Code for localStorage/sessionStorage.
    hasStorage = true;
    console.log("has Storage?", hasStorage);

    // unpack session storage if it is defined
    // console.log("unpack? ", sessionStorage);
    console.log("session length", sessionStorage.length);
    console.log("check", hasStorage && sessionStorage.length !== 0);
    if (hasStorage && sessionStorage.length !== 0) {
      // if hasStorage and sessionStorage exists, init newChart with available session data.
      // WARNING: may see issue if using sessionStorage.length if storing other data in sessionStorage
      vm.newChart = {
        title: sessionStorage.draftTitle,
        artist: sessionStorage.draftArtist,
        createdBy: "",
        chartHTML: "",
        preText: sessionStorage.draftPreText
      };
    }
    else {
      // if no data, or sessionData doesn't exist, init vm.newChart to empty strings
      vm.newChart = {
        title: "",
        artist: "",
        createdBy: "",
        chartHTML: "",
        preText: ""
      };
    }
}
else {
  // Sorry! No Web Storage support.
  hasStorage = false;
	vm.newChart = {
		title: "",
		artist: "",
		createdBy: "",
    chartHTML: "",
    preText: ""
  };
  console.log("vm.newChart initialized");
}

/********* saveChart method ************/
  	vm.saveChart = function() {
  		console.log("saving chart...");
  		
  		// attach userID to chart about to be saved.
  		var authObj = $firebaseAuth(appRef);
  		// console.log("vm.authObj",authObj);
			var authData = authObj.$getAuth();
			if (authData) {
			  vm.newChart.createdBy = authData.uid;
			} 
			else {
			  console.log("Logged out");
			}

  		// add newChart object to firebase array
  		var charts = $firebaseArray(new Firebase("https://jcsdevnsscapstone1.firebaseio.com/charts"));
			charts.$add(vm.newChart).then(function(ref) {
			  var id = ref.key();
			  // console.log("added record with id " + id);
			  charts.$indexFor(id); // returns location in the array
			  $location.url("/viewCharts");
			});
  	};

/************ autoSave method *************/
    vm.autoSave = function() {
      console.log("auto saving your work...");
      // Check if all fields have been completed
      var completedChart = false;
      if( vm.newChart.title !== "" && vm.newChart.artist !== "" && vm.newChart.preText !== "") {
        completedChart = true;
        console.log("completedChart", completedChart);
      }

      // if hasStorage and completedChart, then store newChart model in sessionStorage. 
      // requires manual deep copy, sessionStorage.newChart = vm.newChart DOES NOT WORK
      if( hasStorage && completedChart ) {
        sessionStorage.draftTitle = vm.newChart.title;
        sessionStorage.draftArtist = vm.newChart.artist;
        sessionStorage.draftPreText = vm.newChart.preText;
        console.log("just saved: ", sessionStorage);
      }
      else {
        // alert if not completed, or data storage doesn't exist
        // SEPARATE THESE OUT IN FUTURE
        alert("Your changes will are not being saved!");
        // clear any local session storage
        sessionStorage.clear();
        // clear any existing localData
        localStorage.clear();
        console.log("sessionStorage on cancel", sessionStorage);
      }
    };

/************ addChord method *************/
    // vm.addChord = function() {
    //   console.log("calling addChord...");
    //   var classApplier = rangy.createClassApplier("chord", {
    //     tagNames: ["span"],
    //     normalize: true
    //   });
    //   console.log("classApplier", classApplier);
    //    classApplier.toggleSelection(); 
    // };
}]);