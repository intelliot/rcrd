app.controller('recordsCtrl', 
['$scope', 'Record', 'Cat', '$location', 'User',      
function($scope, Record, Cat, $location, User) {

  $scope.records = [];
  $scope.newRecord = {};
  $scope.hue = 100;
  $scope.user = {};

  User.fetchCurrentUser().then(function(data) {
    $scope.user = data;
    $scope.newRecord.target = $scope.user.local_time;
  });

  $scope.createRecord = function() {
    if ($scope.newRecordForm.$invalid) return;
    Record.create($scope.newRecord).then(function(data) {
      $scope.loadRecords();
      $scope.newRecord.raw = "";
    });    
  };

  $scope.loadRecords = function() {
    Record.all().then(function(data) {
      $scope.records = data;
    });
  };

  // On load
  $scope.loadRecords();

}]);
