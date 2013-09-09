app.controller('recordsCtrl', 
['$scope', 'Record', 'Cat', '$location',      
function($scope, Record, Cat, $location) {

  $scope.records = [];
  $scope.newRecord = {};
  $scope.hue = 100;

  $scope.goToRecord = function() {
    if (!this.record) return;
    $location.path('/records/'+this.record.id);
  };

  $scope.createRecord = function() {
    Record.new($scope.newRecord);    
    $scope.loadRecords();
    $scope.newRecord = {};
  };

  $scope.loadRecords = function() {
    Record.all().then(function(data) {
      $scope.records = data;
    });
  };

  // On load

  $scope.loadRecords();

}]);
