app.controller('headerCtrl', 
['$scope', '$location', '$rootScope', 'Helper',
function($scope, $location, $rootScope, Helper) {

  $scope.statusBarColor = Helper.statusBarColor;

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
        'pattern': /guide|gallery|stats/i
    }
  };

  $rootScope.$on('$locationChangeStart', function(event, next, cur) {
      var path = $location.$$path;
      angular.forEach($scope.links, function(link, key) {
          if (path.match(link.pattern)) {
              $scope.links[key].cur = 'current';
          } else {
              $scope.links[key].cur = '';
          }
      });
  });

  $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) {
    console.log("$routeChangeError");
    console.log(event);
    console.log(current);
    console.log(previous);
    console.log(rejection);
    Helper.statusBarColor = $scope.statusBarColor = "red";
  });

}]);
