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
    hasStorage = true;

    if (hasStorage && sessionStorage.hasDraft === "true") {
      // if hasStorage and sessionStorage exists, init newChart with available session data.
      // WARNING: may see issue if using sessionStorage.length if storing other data in sessionStorage
      vm.newChart = {
        title: sessionStorage.draftTitle,
        artist: sessionStorage.draftArtist,
        preText: sessionStorage.draftPreText
      };
      console.log("vm.newChart initialized with draft and storage", vm.newChart);
      sessionStorage.hasDraft = "false";
    }
    else {
      // if no data, or sessionData doesn't exist, init vm.newChart to empty strings
      vm.newChart = {
        title: "",
        artist: "",
        preText: ""
      };
      console.log("vm.newChart initialized without storage draft", vm.newChart);
    }
}
else {
  // Sorry! No Web Storage support.
  hasStorage = false;
	vm.newChart = {
		title: "",
		artist: "",
    preText: ""
  };
  console.log("vm.newChart initialized", vm.newChart);
}

/********* saveChart method ************/
  	vm.saveChart = function() {
      if( vm.newChart.title !== "" && vm.newChart.artist !== "" && vm.newChart.preText !== "") {
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
      }
      else {
        alert('Please complete all fields!!');
      }
  	};

/************ autoSave method *************/
    vm.autoSave = function() {
      console.log("auto saving your work...");
      // if hasStorage and completedChart, then store newChart model in sessionStorage. 
      // requires manual deep copy, sessionStorage.newChart = vm.newChart DOES NOT WORK
      if( hasStorage ) {
        sessionStorage.draftTitle = vm.newChart.title;
        sessionStorage.draftArtist = vm.newChart.artist;
        sessionStorage.draftPreText = vm.newChart.preText;
        sessionStorage.hasDraft = "true";
        console.log("just saved: ", sessionStorage);
      }
      else {
        // alert if data storage doesn't exist
        // SEPARATE THESE OUT IN FUTURE
        alert("Your changes will are not being saved!");
        // clear any local session storage
        sessionStorage.clear();
        sessionStorage.hasDraft = "false";
        // clear any existing localData
        localStorage.clear();
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