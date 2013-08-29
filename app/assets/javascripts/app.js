var app = angular.module('rcrd', []);

angular.element(document).ready(function() {
  angular.bootstrap(document, ['rcrd']);
});

app.config([
'$routeProvider',
'$locationProvider',
function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $routeProvider.
    when('/', {
        templateUrl: '/views/dashboard.html',
        controller: 'frontPageCtrl'
    }).
    when('/records', {
        templateUrl: '/views/records.html',
        controller: 'recordsCtrl'
    }).
    when('/records/new', {
        templateUrl: '/views/test.html',
        controller: 'frontPageCtrl'
    }).
    when('/people/:personID/events', {
        templateUrl: '/build/events/index.html',
        controller: 'eventListCtrl'
    });
}]);

app.controller('frontPageCtrl', 
['$scope', 'Record',      
function($scope, Record) {

  $scope.records = [];
  $scope.charts = {
    blocks: { rendered: false }
  };

  $scope.generateBlockChart = function() {
    if ($scope.charts.blocks.rendered) return;

    var newData = [];
    angular.forEach($scope.records, function(record, i) {
      newData.push({
         col: 5, 
         row: 1, 
         value: 10, 
         color: "red" 
      });
    });
       
    block_chart(newData); // Declared in application.js
    $scope.charts.blocks.rendered = true;
  };

  Record.all(
    // Success
    function(records) {
      console.log(records);
      $scope.records = records;
      $scope.generateBlockChart();
    },
    // Error 
    function() {
  });

}]);

app.controller('recordsCtrl', 
['$scope', 'Record',      
function($scope, Record) {

  $scope.records = [];

  Record.all(
    function(records) { // Success
      $scope.records = records;
    },
    function() { // Error
  });

}]);

app.factory('Record', 
['$http',      
function($http) {
  var Record = {};
  var _records = [];

  // Will call callback with params (success?, [records])
  Record.all = function(success, error) {
      if (_records.length != 0) {
          return success(_records);
      }
      $http({
          url: '/records.json',
          method: 'GET'
      }).success(function(data) {
          _records = data;
          success(_records);
      }).error(function(data) {
          error();
      });
  };

  return Record;
}]);
