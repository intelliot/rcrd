app.directive('cat', function() {
    return {
        restrict: 'E',
        transclude: false,
        scope: { 
          data: '=',
          hue: '='
        },
        template:
          '<a href="/cats/{{data.id}}" '+
             'class="cat"'+ 
             'style="'+
               'background-color: hsl({{hue}}, 65%, 48%);'+
               'border-bottom: solid 2px hsl({{hue}}, 80%, 20%);'+
               'text-shadow: 0 -1px 1px hsl({{hue}}, 30%, 0%);'+
             '"><span>{{data.name}}</span></a>',
        replace: true
    };
});
