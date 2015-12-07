app.controller("loginCtrl", function($scope, $firebaseArray) {
  var ref = new Firebase("https://jcsdevnsscapstone1.firebaseio.com/");
  $scope.data = $firebaseArray(ref);
  console.log("data",$scope.data);
}); 