
app.factory('Record', 
['$http', 'Cat',      
function($http, Cat) {
  var Record = {};
  var _records = [];

  Record.all = function() {
    var url = '/records.json';
    return $http.get(url).then(function(res) {
      return res.data;
    });
  };

  Record.find = function(id) {
    if (!id) return;
    var url = '/records/'+id+'.json';
    return $http.get(url).then(function(res) {
      return res.data;
    });
  };

  Record.new = function(newRecord) {
    var protoCats = newRecord.raw.split(',');
    angular.forEach(protoCats, function(protoCat) {
      var protoCatName = protoCat.replace(/(^\s+)|(\s+$)/g, ''); // Trim
      // if Cat.find {name: protoCatName}
        // don't do anything?
      // else
        // Cat.new({name: protoCatName})
      Cat.new({name: protoCatName});
    });
    newRecord.target = new Date();
    _records.push(newRecord);
  };

  return Record;
}]);
