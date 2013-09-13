app.controller('statsCtrl', 
['$scope', '$http', '$timeout',     
function($scope, $http, $timeout) {

  var interval;
  $scope.stats = {};

  $scope.refreshStats = function() {
    console.log('refreshStats');
    $http.get('/stats.json').then(function(res) {
      $scope.stats = res.data;
    });
  };
   
  // On Load
  $scope.refreshStats();

  interval = window.setInterval(function() {
    $scope.$apply(function() {
      $scope.refreshStats();
    });
  }, 5000);

  // On Destroy

  $scope.$on('$destroy', function() {
    window.clearInterval(interval);
  })

}]);
