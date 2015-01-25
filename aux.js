var aux = {};

aux.hasMag = function(catName) {
  return !isNaN(catName[0]);
};

aux.magFromRawCat = function(catName) {
  const results = catName.match(/^\s*\d+\.*\d*/);
  if (results.length) {
    return results[0];
  } else {
    return '';
  }
};

aux.maglessCat = function(catName) {
  return catName.replace(/^\s*\d+\.*\d*\s*/, '');
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
