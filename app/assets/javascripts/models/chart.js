app.factory('Chart', 
['$http',
function($http) {
  var Chart = {};

  Chart.fetchData = function(chartName) {
    console.log('fetchData');
    if (chartName = 'blocks') {
      return $http.get('/charts/blocks.json')
                  .then(function(response) {
        console.log(response);
        return response.data;
      });
    }
  };

  return Chart;
}]);
