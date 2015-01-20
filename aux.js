var aux = {};

aux.hasMag = function(catName) {
  return !isNaN(catName[0]);
};

aux.trim = function(str) {
  return str.trim();
};

// num is EXCLUSIVE
aux.rand = function(num) {
  return Math.floor(Math.random()*num);
};

aux.minutesPastMidnight = function(time) {
  return time.getHours() * 60 + time.getMinutes();
};

module.exports = aux;
