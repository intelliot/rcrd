app.factory('User', 
['$http',
function($http) {
  var User = {};

  User.fetchCurrentUser = function() {
    var url = '/users/current.json';
    return $http.get(url).then(function(res) {
      return res.data;
    });
  };

  User.save = function(params) {
    var url = '/users/'+params.id+'.json';
    return $http.put(url, params).then(function(res) {
      return res.data;
    });
  };

  return User;
}]);
