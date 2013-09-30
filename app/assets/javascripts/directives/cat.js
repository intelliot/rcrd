app.directive('cat', ['Cat', function(Cat) {
    return {
        restrict: 'E',
        transclude: false,
        scope: { 
          raw: '=',
          hue: '=',
          hex: '='
        },
        controller: function($scope, $element, $attrs) {
          $scope.sansMag = Cat.noMag($scope.raw); 
          $scope.path = "/cats/"+$scope.sansMag.toLowerCase(); 
        },
        template:
          '<a href="{{path}}" '+
             'class="cat"'+ 
             'style="'+
               'background-color: hsl({{hue}}, 65%, 48%);'+
               'border-bottom: solid 2px hsl({{hue}}, 80%, 20%);'+
               'text-shadow: 0 -1px 1px hsl({{hue}}, 30%, 0%);'+
             '"><span ng-bind="raw"></span></a>',
        replace: true
    };
}]);
