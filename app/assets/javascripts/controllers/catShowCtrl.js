app.controller('catShowCtrl', 
['$scope', 'Cat', '$routeParams',     
function($scope, Cat, $routeParams) {

  Cat.all(function(cats){
    var cat = null;
    cats.forEach(function(iCat) {
      if ($routeParams.catID == iCat.id) {
        $scope.cat = iCat;
      }
    }); 
  });

}]);
