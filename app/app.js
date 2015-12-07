var app = angular.module("nss-capstone-1", ['firebase','']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'partials/splash-login.html',
        controller: ''
      }).
      otherwise('/main');
  }]);
