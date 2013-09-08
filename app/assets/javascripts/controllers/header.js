app.controller('headerCtrl', 
['$scope', '$location', '$rootScope',
function($scope, $location, $rootScope) {

  $scope.links = {
    'dashboard': { 
      'pattern': /^\/$/i
    },
    'records': { 
        'pattern': /records/i
    },
    'settings': { 
        'pattern': /settings/i
    },
    'guide': { 
        'pattern': /guide/i
    }
  };

  $rootScope.$on('$locationChangeStart', function(event, next, cur) {
      var path = $location.$$path;
      angular.forEach($scope.links, function(link, key) {
          console.log(path);
          if (path.match(link.pattern)) {
              $scope.links[key].cur = 'current';
          } else {
              $scope.links[key].cur = '';
          }
      });
  });

}]);
