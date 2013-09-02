app.controller('catsCtrl', 
['$scope', 'Cat',      
function($scope, Cat) {

  $scope.cats = [];
  $scope.hue = 0;
  $scope.intervalID;

  $scope.regenerateHue = function() {
    var now = new Date();
    var minutes = (now.getMinutes())
                + (now.getHours() * 60);
    var hue = (minutes / 1440) * 255;
    $scope.hue = Math.round(hue * 10) / 10; 
    console.log('regenerateHue');
    console.log($scope.hue);
  };

  // Initialization

  if ($scope.intervalID) clearInterval($scope.intervalID);
  $scope.intervalID = setInterval(function(){
    $scope.$apply($scope.regenerateHue)
  }, 1e4);
  $scope.regenerateHue();

  Cat.all(
    function(cats) { // Success
      $scope.cats = cats;
    },
    function() { // Error
  });

}]);
