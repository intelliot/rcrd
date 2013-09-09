app.controller('catShowCtrl', 
['$scope', 'Cat', '$routeParams',     
function($scope, Cat, $routeParams) {

  $scope.name = $routeParams.catName;

  // TODO: Use Color service (Color.currentHue)
  $scope.hue = 100; 

  Cat.all(function(cats){
    var cat = null;
    cats.forEach(function(iCat) {
      if ($routeParams.catID == iCat.id) {
        $scope.cat = iCat;
      }
    }); 
  });

}]);
