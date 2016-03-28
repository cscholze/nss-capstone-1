app.factory("authData", function() {
  var appRef = "https://jcsdevnsscapstone1.firebaseio.com";

  return {
  	getAppRef: function() {
  		return appRef;
  	}

  };
});
