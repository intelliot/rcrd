app.factory('Helper', 
['$http',
function($http) {
  var Helper = {};

  Helper.currentHue = 100;

  // TODO: Update with timeout that changes currentHue
/*
  Helper.currentHue = function() {
    return 100;
  };
*/

  return Helper;
}]);
