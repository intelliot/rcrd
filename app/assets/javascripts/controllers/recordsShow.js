app.controller('recordsShowCtrl', 
['$scope', 'Record', 'Cat', '$location', '$routeParams',     
function($scope, Record, Cat, $location, $routeParams) {

  $scope.id = $routeParams.recordID;
  $scope.record = {};
  $scope.newRecord = {};
  $scope.hue = 100;

  $scope.loadRecord = function() {
    Record.find($scope.id).then(function(data) {
      $scope.record = data;
    });
  };

  // On load

  $scope.loadRecord();

}]);
