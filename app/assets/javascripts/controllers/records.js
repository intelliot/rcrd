app.controller('recordsCtrl', 
['$scope', 'Record', 'Cat', '$location', 'User',      
function($scope, Record, Cat, $location, User) {

  $scope.records = [];
  $scope.newRecord = {};
  $scope.hue = 100;
  $scope.user = {};

  // TODO: Make this reflect users' current time zone
  var d = new Date();
  $scope.newRecord.year = d.getFullYear();
  console.log(d.getFullYear());
  $scope.newRecord.month = d.getMonth();
  $scope.newRecord.day = d.getUTCDate();
  $scope.newRecord.hour = d.getHours();
  $scope.newRecord.minute = d.getMinutes();

  $scope.yearRange = [];
  for (var year = (d.getFullYear() - 5); year <= d.getFullYear(); year++){
    $scope.yearRange.push(year);
  }
  $scope.monthRange = {
    1: "1 - January", 
    2: "2 - February", 
    3: "3 - March",
    4: "4 - April",
    5: "5 - May",
    6: "6 - June",
    7: "7 - July",
    8: "8 - August",
    9: "9 - September",
    10: "10 - October",
    11: "11 - November",
    12: "12 - December"
  };
  // TODO: Make above work
  $scope.monthRange = []; 
  for (var month = 1; month <= 12; month++){
    $scope.monthRange.push(month);
  }
  $scope.dayRange = [];
  for (var day = 1; day <= 31; day++){
    $scope.dayRange.push(day);
  }

  $scope.hourRange = [];
  for (var hour = 0; hour <= 23; hour++){
    $scope.hourRange.push(hour);
  }
  $scope.minuteRange = [];
  for (var minute = 1; minute <= 60; minute++){
    $scope.minuteRange.push(minute);
  }

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
