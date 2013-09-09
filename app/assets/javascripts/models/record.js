
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

  Record.save = function(params) {
    var url = '/records/'+params.id+'.json';
    return $http.put(url, params).then(function(res) {
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
    // TODO: Send to server
  };

  return Record;
}]);
