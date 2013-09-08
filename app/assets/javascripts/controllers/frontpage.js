app.controller('frontPageCtrl', 
['$scope', 'Record', 'Chart',    
function($scope, Record, Chart) {

  Chart.fetchData('blocks').then(function(data) {
    console.log(data);
    charts.blocks(data); // Declared in charts/blocks.js
  });

}]);
