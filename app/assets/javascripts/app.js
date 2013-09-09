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
        templateUrl: '/views/records/index.html',
        controller: 'recordsCtrl'
    }).
    when('/records/:recordID', {
        templateUrl: '/views/records/show.html',
        controller: 'recordsShowCtrl'
    }).
    when('/records/new', {
        templateUrl: '/views/test.html',
        controller: 'frontPageCtrl'
    }).
    when('/cats', {
        templateUrl: '/views/cats.html',
        controller: 'catsCtrl'
    }).
    when('/cats/:catID', {
        templateUrl: '/views/cats/show.html',
        controller: 'catShowCtrl'
    }).
    when('/settings', {
        templateUrl: '/views/users/edit.html',
        controller: 'userEditCtrl'
    }).
    when('/guide', {
        templateUrl: '/views/guide/index.html',
        controller: 'guideCtrl'
    });
}]);
