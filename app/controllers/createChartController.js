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
if(typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    hasStorage = true;
    console.log("hasStorage", hasStorage);
    console.log("sessionStorage", sessionStorage);
    console.log("localStorage", localStorage);
    vm.newChart = {
      title: sessionStorage.draftTitle,
      artist: sessionStorage.draftArtist,
      createdBy: "",
      chartHTML: "",
      preText: sessionStorage.draftPreText
    };
} else {
    // Sorry! No Web Storage support.
    hasStorage = false;
  	vm.newChart = {
  		title: "",
  		artist: "",
  		createdBy: "",
      chartHTML: "",
      preText: ""
    };
}

/********* saveChart method ************/
  	vm.saveChart = function() {
  		console.log("saving chart...");
  		
  		// attach userID to chart about to be saved.
  		var authObj = $firebaseAuth(appRef);
  		console.log("vm.authObj",authObj);
			var authData = authObj.$getAuth();
			if (authData) {
			  console.log("Logged in as:", authData.uid);
			  vm.newChart.createdBy = authData.uid;
			} 
			else {
			  console.log("Logged out");
			}

  		// add newChart object to firebase array
  		var charts = $firebaseArray(new Firebase("https://jcsdevnsscapstone1.firebaseio.com/charts"));
			charts.$add(vm.newChart).then(function(ref) {
			  var id = ref.key();
			  console.log("added record with id " + id);
			  charts.$indexFor(id); // returns location in the array
			  $location.url("/viewCharts");
			});
  	};

/************ autoSave method *************/
    vm.autoSave = function() {
      console.log("auto saving your work...");
      if( hasStorage ) {
        sessionStorage.draftTitle = vm.newChart.title;
        sessionStorage.draftArtist = vm.newChart.Artist;
        sessionStorage.draftPreText = vm.newChart.preText;
        console.log("just saved: ", sessionStorage);
      }
      else {
        alert("Your changes will are not being saved!");
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