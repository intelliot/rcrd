
app.factory('Cat', 
['$http',      
function($http) {
  var Cat = {};
  var _cats = [];

  Cat.all = function(success, error) {
    if (_cats.length != 0) {
      return success(_cats);
    }
    $http({
      url: '/cats.json',
      method: 'GET'
    }).success(function(data) {
      _cats = data;
      success(_cats);
    }).error(function(data) {
      error();
    });
  };

  Cat.new = function(params) {
    // TODO: make real version of this
    if (!params.name) return;
    var cat = {name: params.name, id: 123};
    _cats.push(cat);
    return cat;
  };

  Cat.find = function(options) {
  }; 

  return Cat;
}]);
