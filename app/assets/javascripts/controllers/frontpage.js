app.controller('frontPageCtrl', 
['$scope', 'Record',      
function($scope, Record) {

  $scope.records = [];

  $scope.generateBlockChart = function() {

    var newData = [];
    angular.forEach($scope.records, function(record, i) {
      newData.push({
         col: i+1, 
         row: 1, 
         value: 10, 
         color: "red" 
      });
    });
       
    charts.blocks(newData); // Declared in application.js
  };

  Record.all(
    // Success
    function(records) {
      $scope.records = records;
      $scope.generateBlockChart();
    },
    // Error 
    function() {
  });

}]);
