
app.factory('Record', 
['$http', 'Cat',      
function($http, Cat) {
  var Record = {};
  var _records = [];

  // Will call callback with params (success?, [records])
  Record.all = function(success, error) {
      if (_records.length != 0) {
          return success(_records);
      }
      $http({
          url: '/records.json',
          method: 'GET'
      }).success(function(data) {
          _records = data;
          success(_records);
      }).error(function(data) {
          error();
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
