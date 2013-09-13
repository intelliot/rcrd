app.controller('catsCtrl', 
['$scope', 'Cat', 'Helper',
function($scope, Cat, Helper) {

  $scope.cats = [];
  $scope.hue = Helper.currentHue;

  // Initialization
  Cat.all().then(function(data) {
    $scope.cats = data;
  });

}]);
