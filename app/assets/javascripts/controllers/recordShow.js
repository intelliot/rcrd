app.controller('recordShowCtrl', 
['$scope', 'Record', 'Cat', '$location', '$routeParams',     
function($scope, Record, Cat, $location, $routeParams) {

  $scope.id = $routeParams.recordID;
  $scope.record = {};

  $scope.loadRecord = function() {
    Record.find($scope.id).then(function(data) {
      $scope.record = data;
    });
  };

  $scope.saveRecord = function() {
    Record.save($scope.record).then(function() {
      $scope.loadRecord();
    });
  };

  // On load

  $scope.loadRecord();

}]);
