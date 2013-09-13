app.controller('catShowCtrl', 
['$scope', 'Cat', '$routeParams', 'Helper',     
function($scope, Cat, $routeParams, Helper) {

  $scope.name = $routeParams.catName;
  $scope.hue = Helper.currentHue; 
  $scope.records = [];

  Cat.fetchRecords($scope.name).then(function(data) {
    $scope.records = data;
  });

/*
  Cat.all(function(cats){
    var cat = null;
    cats.forEach(function(iCat) {
      if ($routeParams.catID == iCat.id) {
        $scope.cat = iCat;
      }
    }); 
  });
*/

}]);
