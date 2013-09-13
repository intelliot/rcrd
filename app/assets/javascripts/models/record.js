
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

  Record.create = function(record) {
    var url = '/records.json';

    // TODO: Form record.year, record.month, etc.
    // into one coherent timestamp

    return $http.post(url, {record: record}).then(function(res) {
      console.log(res);
      return res.data;
    });
  };

  return Record;
}]);
