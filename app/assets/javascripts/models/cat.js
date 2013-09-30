
app.factory('Cat', 
['$http', 'Helper',      
function($http, Helper) {
  var Cat = {};
  var _cats = [];

  Cat.all = function() {
    // TODO: Add back in caching
    return $http({
      url: '/cats.json',
      method: 'GET'
    }).then(function(res) {
      return res.data;
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

  Cat.fetchRecords = function(catName) {
    var url = '/cats/'+catName+'/records.json';
    return $http.get(url).then(function(res) {
      return res.data;
    });
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
