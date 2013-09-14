app.factory('Helper', 
['$http',
function($http) {
  var Helper = {};

  Helper.currentHue = 100;
  Helper.statusBarColor = "#ddd";

  /* PRIVATE ================================================================ */

  var _interval;

  var _regenerateHue = function() {
    console.log('regen');
    var now = new Date();
    var minutes = (now.getMinutes())
                + (now.getHours() * 60);
    var hue = (minutes / 1440) * 255;
    Helper.currentHue = Math.round(hue * 10) / 10; 
  };

  /* INITIALIZATION ========================================================= */

  if (_interval) clearInterval(_interval);
  _interval = setInterval(_regenerateHue, 1e4);
  _regenerateHue(); 

  return Helper;
}]);
