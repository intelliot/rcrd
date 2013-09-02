app.controller('recordsCtrl', 
['$scope', 'Record', 'Cat',      
function($scope, Record, Cat) {

  $scope.records = [];
  $scope.newRecord = {};
  $scope.hue = 100;

  $scope.createRecord = function() {

    // Great
    Record.new($scope.newRecord);    
    $scope.loadRecords();
    $scope.newRecord = {};
  };

  $scope.catsFromRaw = function(raw) {
    // TODO: Improve
    var cats = [];
    raw.split(',').forEach(function(catName) {
      // If !Cat.find({name: catName})
      cats.push({name: catName, id: 321});
    }); 
    return cats;
  };

  $scope.loadRecords = function() {
    Record.all(
      function(records) { // Success
        $scope.records = records;
        $scope.records.map(function(record) {
          record.cats = $scope.catsFromRaw(record.raw);
        });
        console.log($scope.records);
      },
      function() { // Error
    });
  };

  $scope.loadRecords();

}]);
