app.directive('record', ['$location', function($location) {
    return {
        restrict: 'E',
        transclude: false,
        scope: { 
          data: '='
        },
        controller: function($scope, $element, $attrs) {

          $scope.goToRecord = function() {
            console.log(this.data);
            if (!this.data) return;
            if (!this.data.id) return;
            $location.path('/records/'+this.data.id);
          };

        },
        template:
          '<div>'+
            '<div ng-bind="data.target|date:\'medium\'"'+
                 'class="small grey mcb click"'+
                 'ng-click="goToRecord()"></div>'+
            '<cat ng-repeat="cat_name in data.cats"'+
                 'raw="cat_name"'+
                 'hue="data.hue"></cat>'+
          '</div>',
        replace: true
    };
}]);
