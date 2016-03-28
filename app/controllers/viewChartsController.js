app.controller("viewChartsController", ["$firebaseArray", "$firebaseAuth", "filterFilter", "$location",
  function($firebaseArray, $firebaseAuth, filterFilter, $location) {
  	// initialize this as vm for view-model to refer to $scope
    var vm = this;
    var currChartIndex = 0;
    console.log("saveIndex = ", sessionStorage.currChartIndex);
    if( (typeof(Storage) !== "undefined") && (sessionStorage.currChartIndex) ) {
      currChartIndex = sessionStorage.currChartIndex;
    }

    // model for search input
    vm.navbarSearch = "";

    var chartsRef = new Firebase("https://jcsdevnsscapstone1.firebaseio.com/charts");

    // get auth-ed userID to query charts for user specfic charts
    var authObj = $firebaseAuth(chartsRef);
    var authData = authObj.$getAuth();
    if (authData) {
      console.log("Logged in as:", authData.uid);
    } 
    else {
      console.log("Logged out");
    }

    // Query firebase for user charts and create firebase array of user charts
    var userChartsQuery = chartsRef.orderByChild("createdBy").equalTo(authData.uid);
    var userCharts = $firebaseArray(userChartsQuery);
    vm.chartTitles = [];
    var alphaCharts = [];


    // initialize user charts and data when array loads
    userCharts.$loaded(
      function(charts) {
        // ORDER ALPHABETCALLY HERE BEFORE CONSTRUCTING TITLES ARRAY
        alphaCharts = alphaObjArray(charts, "title");
        console.log("alphaCharts", alphaCharts);
        // build array of chart titles w/ indexes corresponding to charts in userCharts for searching
        angular.forEach(alphaCharts, function(value, key) {
          vm.chartTitles.push(value.title);
        });
        // Display first chart once they have been loaded
        vm.currChart = alphaCharts[currChartIndex];
      }, function(error) {
        console.error("Loading Charts Error:", error);
      });


    // Display next user chart by incrementing firebase array index
    vm.getNext = function() {
      currChartIndex += 1;
      if (currChartIndex > alphaCharts.length-1) {
        currChartIndex = 0;
      }
      vm.currChart = alphaCharts[currChartIndex];
    };


    // Display previous user chart by decrementing firebase array index
    vm.getPrev = function() {
      currChartIndex -= 1;
      if (currChartIndex < 0) {
        currChartIndex = (alphaCharts.length-1);
      }
      vm.currChart = alphaCharts[currChartIndex];
    };


    // set current chart index to that of title from user input in search bar
    vm.setCurrChart = function() {
      var selectedTitle = document.getElementById("search-bar").value;
      var titleIndex = vm.chartTitles.indexOf(selectedTitle);
      if (titleIndex > -1 ) {
        currChartIndex = titleIndex;
        vm.currChart = alphaCharts[currChartIndex];
        vm.navbarSearch = "";
      }
    };

    vm.setCurrChart2 = function(index) {
      console.log("index", index); 
    };

    // alphabetize array of objects by property
    var alphaObjArray = function(input, attribute) {
      // return input if not an array is not an object
      if (!angular.isObject(input)) return input;
      var array = [];
      // add only chart objects to array, no $angular methods or objects
      for(var objectKey in input) {
        if (typeof(input[objectKey])  === "object" && objectKey.charAt(0) !== "$") {
          array.push(input[objectKey]);
        }
      }

      // sort/alphabetize the array of chart objects by attribute
      array.sort(function(a, b){
        var alc = a[attribute].toLowerCase(),
            blc = b[attribute].toLowerCase();
        return alc > blc ? 1 : alc < blc ? -1 : 0;
      });
      return array;
    };


    vm.deleteChart = function() {
      console.log("deleting chart $id...", vm.currChart.$id);
      console.log("deleting currChart", vm.currChart);
      // delete item from firebase array
      userCharts.$remove(vm.currChart).then(function(ref) {
        // remove song title from search data-list
        vm.chartTitles.splice(currChartIndex,1);
        // remove chart from viewer
        alphaCharts.splice(currChartIndex,1);
        // reset chart index if out of bounds
        if (currChartIndex > alphaCharts.length-1) {
          currChartIndex = alphaCharts.length-1;
        }
        else if (currChartIndex < 0) {
           currChartIndex = (alphaCharts.length-1);
        }
        vm.currChart = alphaCharts[currChartIndex];
        console.log("delete success");
      });
    };

    vm.saveCurrChartView = function() {
      if( typeof(Storage) !== "undefined" ) {
        console.log("saving index...", currChartIndex);
        sessionStorage.currChartIndex = currChartIndex;
        console.log("sessionStorage.currChartIndex", sessionStorage.currChartIndex);
      }
    };


/********* AUTO SCROLL *************/
    vm.scrollSpeed = 51;
    var scrolling = false;

    var scrollAuto = function() {
      if (scrolling) {
        console.log("autoScrolling...speed = ", vm.scrollSpeed);
        window.scrollBy(0,1);
        scrolldelay = setTimeout(scrollAuto, vm.scrollSpeed);
      }
    };

    vm.startScroll = function() {
      console.log("starting scroll...", vm.scrollSpeed);
      scrolling = true;
      scrollAuto();
    };

    vm.pauseScroll = function() {
      console.log("stopping scroll...");
      scrolling = false;
    };

    vm.scrollSlower = function() {
      console.log("speeding up scroll...");
      vm.scrollSpeed += 5;
      if (vm.scrollSpeed > 100)
        vm.scrollSpeed = 101;
    };

    vm.scrollFaster = function() {
      console.log("speeding up scroll...");
      vm.scrollSpeed -= 5;
      if (vm.scrollSpeed < 1)
        vm.scrollSpeed = 1;
    };

  }
]);