// Instantiate main app and module
var app = angular.module("nss-capstone-1", ['ngRoute','firebase']);


// App config
app.config(['$routeProvider','$provide',
  function($routeProvider, $provide) {
    $routeProvider
    	.when('/login', {
        templateUrl: 'partials/login.html',
        controller: 'authController',
        controllerAs: 'authCtrl'
      })
      .when('/mainMenu', {
      	templateUrl: 'partials/main-menu.html',
      	controller: 'mainMenuController',
        controllerAs: 'mainMenuCtrl'
      })
      .when('/createChart', {
        templateUrl: 'partials/create-chart.html',
        controller: 'createChartController',
        controllerAs: 'createCtrl'
      })
      .when('/viewCharts', {
        templateUrl: 'partials/view-charts.html',
        controller: 'viewChartsController',
        controllerAs: 'viewChartsCtrl'
      })
      .when('/chordLibrary', {
        templateUrl: 'partials/chord-library.html',
        controller: '',
        controllerAs: ''
      })
      .otherwise({
        redirectTo: '/login'
      });

    // textAngular toolbar setup
    // $provide.decorator('taOptions', ['$delegate', function(taOptions){
    //   // $delegate is the taOptions we are decorating
    //   // add the button to the default toolbar definition
    //   return taOptions;
    // }]); // end decorator

    // $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions){
    // // $delegate is the taOptions we are decorating

    // // register lyrics mode tool with textAngular, wraps all text in <pre>
    // taRegisterTool('lyrics', {
    //   iconclass: "fa fa-music",
    //   name: "lyrics",
    //   tooltiptext: "Lyrics",
    //   action: function(){
    //       this.$editor().wrapSelection('formatBlock', '<pre>');
    //   },
    //   activeState: function(){ return this.$editor().queryFormatBlockState('pre'); }
    // });

    // /* button to wrap selection in span tags with class="chord" */
    // taRegisterTool('chord', {
    //   buttontext: 'Cm',
    //   tooltiptext: 'Chord',
    //   action: function() {
    //     //this.$editor().wrapSelection('formatBlock', '<SPAN CLASS="ta-a">');
    //     var classApplier = rangy.createClassApplier("chord", {
    //       tagNames: ["span"],
    //       normalize: true
    //     });
    //     /****!!! toggle span/class for selection NOT WORKING ****/
    //     classApplier.toggleSelection(window);
    //   }
    // });

    // // add the buttons to the default toolbar definition
    // taOptions.toolbar = [
    //     [ 'lyrics', 'chord'],
    //     ['redo', 'undo', 'clear']
    //   ];
    //   return taOptions;
    // }]);

  }]);
