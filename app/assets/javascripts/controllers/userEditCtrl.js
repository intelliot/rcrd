Date.prototype.stdTimezoneOffset = function() {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};

app.controller('userEditCtrl', 
['$scope', 'User',
function($scope, User) {

  $scope.user = {};
  $scope.timeZoneMessage = "";
  $scope.timeZoneNow = "";

  $scope.timeZonesUS = [ 
    {name: "Hawaii", offset: 10},
    {name: "Alaska", offset: 9},
    {name: "Pacific Time (US & Canada)", offset: 8},
    {name: "Mountain Time (US & Canada)", offset: 7},
    {name: "Central Time (US & Canada)", offset: 6},
    {name: "Eastern Time (US & Canada)", offset: 5}
  ];

  $scope.detectAndSuggestTimeZone = function() {
    var d = new Date();
    var offsetNow = d.stdTimezoneOffset() / 60;
    var timeZoneNow = '';
    console.log(offsetNow);

    // Find user's current time zone
    angular.forEach($scope.timeZonesUS, function(zone) {
      if (offsetNow === zone.offset) {
        timeZoneNow = zone.name;
      }
    });


    if (!timeZoneNow) return;

    // If Time Zone Now is different from User's time zone, offer to change
    if (timeZoneNow !== $scope.user.time_zone) {
      $scope.timeZoneNow = timeZoneNow;
    }

  };

  $scope.setTimeZoneToCurrent = function() {
    $scope.user.time_zone = $scope.timeZoneNow;
    User.save($scope.user);
    $scope.timeZoneNow = '';
  };

  $scope.saveUser = function() {
    User.save($scope.user);
  };

  User.fetchCurrentUser().then(function(data) {
    $scope.user = data;
    $scope.detectAndSuggestTimeZone();
  });

}]);
