app.factory('Helper', 
['$http',
function($http) {
  var Helper = {};

  Helper.currentHue = 100;

  /* PRIVATE ================================================================ */

  var _interval;

  var _regenerateHue = function() {
    var now = new Date();
    var minutes = (now.getMinutes())
                + (now.getHours() * 60);
    var hue = (minutes / 1440) * 255;
    Helper.currentHue = Math.round(hue * 10) / 10; 
  };

  /* INITIALIZATION ========================================================= */

  if (_interval) clearInterval(_interval);
  _interval = setInterval(function() {
    _regenerateHue(); 
  }, 1e4);
  _regenerateHue(); 

  return Helper;
}]);
