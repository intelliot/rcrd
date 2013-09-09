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
    var url = '/users/'+params.id+'.json';
    return $http.put(url, params).then(function(res) {
      return res.data;
    });
  };

  return User;
}]);
