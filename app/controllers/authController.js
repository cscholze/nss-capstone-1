app.controller("authController", ["$firebaseAuth", "$location",
  function($firebaseAuth, $location) {
  	var vm = this;
  	
  	vm.userEmail = "";
  	vm.userPassword = "";
  	vm.authError = "";

  	// Create global auth object for app
    var ref = new Firebase("https://jcsdevnsscapstone1.firebaseio.com");
    var authObj = $firebaseAuth(ref);

    // Register and login new user with email/password
    vm.registerNewUser = function() {
			authObj.$createUser({
			  "email": vm.userEmail,
			  "password": vm.userPassword
			})
			.then(function(userData) {
			  console.log("User " + userData.uid + " created successfully!");
			  // If user register correctly, then authenticate user
			  return authObj.$authWithPassword({
			    "email": vm.userEmail,
			    "password": vm.userPassword
			  });
			})
			.then(function(authData) {
			  console.log("Logged in as:", authData.uid);
			  $location.url("/mainMenu");
			})
			.catch(function(error) {
			  // Assign error to authError, which is displayed on DOM
			  vm.authError = error.message;
			  console.error("Error: ", error);
			});
    };

		// Authorize user with email and password
    vm.loginUser = function() {
			authObj.$authWithPassword({
			  email: vm.userEmail,
			  password: vm.userPassword
			})
			.then(function(authData) {
			  console.log("Logged in as:", authData.uid);
			  $location.url("/mainMenu");
			})
			.catch(function(error) {
			  // Assign error to authError, which is displayed on DOM
			  vm.authError = error.message;
			  console.error("Authentication failed:", error);
			});  
    };

    // Logout user
    vm.logout = function() {
    	console.log("calling logout and unauthorizing...");
    	authObj.$unauth();
    	sessionStorage.clear();
    	console.log("clearing sessionStorage", sessionStorage);
    	localStorage.clear();
    	console.log("clearinglocalStorage", localStorage);
    };
  }
]);


