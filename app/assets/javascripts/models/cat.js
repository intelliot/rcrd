
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

  Cat.mag = function(str) {
    var match = str.match(/^\s*\d+\.*\d*/);
    return match ? match[0] : "";
  };

  Cat.noMag = function(str) {
    if (!str) return '';
    return str.replace(/^\s*\d+\.*\d*\s*/g,"");
  };

  Cat.catsFromRaw = function(raw) {
    // TODO: Improve splitting
    return raw.split(',');
  };


  return Cat;
}]);
