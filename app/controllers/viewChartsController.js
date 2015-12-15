app.controller("viewChartsController", ["$firebaseArray", "$firebaseAuth",
  function($firebaseArray, $firebaseAuth) {
  	var vm = this;
    var currChartIndex = 0;

    var chartsRef = new Firebase("https://jcsdevnsscapstone1.firebaseio.com/charts");

    // get authed userID to query charts for user specfic charts
    var authObj = $firebaseAuth(chartsRef);
    console.log("vm.authObj", authObj);
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

    // Display first chart once they have been loaded
    userCharts.$loaded(
      function(charts) {
        console.log("userCharts", charts);
          vm.currChart = charts[currChartIndex];
          // vm.userCharts = charts;
      }, function(error) {
        console.error("Loading Charts Error:", error);
      });

    // Display next user chart by incrementing firebase array index
    vm.getNext = function() {
      console.log("getting next chart...");
      currChartIndex += 1;
      if (currChartIndex > userCharts.length-1) {
        currChartIndex = 0;
      }
      console.log("currChartIndex", currChartIndex);
      vm.currChart = userCharts[currChartIndex];
    };

    // Display previous user chart by decrementing firebase array index
    vm.getPrev = function() {
      console.log("getting previous chart...");
      currChartIndex -= 1;
      if (currChartIndex < 0) {
        currChartIndex = (userCharts.length-1);
      }
      console.log("currChartIndex", currChartIndex);
      vm.currChart = userCharts[currChartIndex];
    };

    
  }
]);