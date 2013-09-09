app.factory('User', 
['$http',
function($http) {
  var User = {};

  User.fetchCurrentUser = function() {
    return $http.get('/users/current.json')
                .then(function(response) {
      console.log(response);
      return response.data;
    });
  };

  User.save = function(params) {
    console.log(params);
    return $http.put('/users/'+params.id+'.json', params)
                .then(function(response) {
      console.log(response);
      return response.data;
    });
  };

  return User;
}]);
