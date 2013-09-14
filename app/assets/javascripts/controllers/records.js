app.controller('recordsCtrl', 
['$scope', 'Record', 'Cat', '$location', 'User',      
function($scope, Record, Cat, $location, User) {

  $scope.records = [];
  $scope.newRecord = {};
  $scope.hue = 100;
  $scope.user = {};

  $scope.yearRange = [2000, 2001, 2002];

  User.fetchCurrentUser().then(function(data) {
    $scope.user = data;
  });

  $scope.goToRecord = function() {
    if (!this.record) return;
    $location.path('/records/'+this.record.id);
  };

  $scope.createRecord = function() {
    if ($scope.newRecordForm.$invalid) return;
    Record.create($scope.newRecord).then(function(data) {
    });    
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
