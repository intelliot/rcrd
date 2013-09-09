app.controller('userEditCtrl', 
['$scope', 'User',
function($scope, User) {

  $scope.user = {};

  User.fetchCurrentUser().then(function(data) {
    $scope.user = data;
  });


}]);
