const pg = require('pg');

var db = {};

var client;

var getClient = function(callback) {

  const conString = "postgres://rcrd:timanous@localhost:5433/rcrd";

  pg.connect(conString, function (err, client, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }

    callback(client, done);
  });
};

var query = function(queryStr, args, callback) {
  getClient(function(client, done) {
    client.query(queryStr, args, function(err, result) {

      if (err) {
        // todo: render 500 page
        return console.error('error running query', err);
      }

      // call `done()` to release the client back to the pool
      done();

      callback(result);
    });
  });
};

db.getRecords = function (callback) {

  const queryStr = [
    'SELECT *',
    'FROM records',
    'WHERE user_id = $1',
    'ORDER BY target DESC',
    'LIMIT 50;'
  ].join(' ');

  const queryArgs = [
    '2'
  ];

  query(queryStr, queryArgs, function(result) {
    callback(result.rows);
  });
};

db.exactSearch = function (searchTerm, callback) {

  const queryStr = [
    'SELECT *',
    'FROM records',
//    'WHERE user_id = $1 AND raw ~ /^\s*$2\s*,{0,1}|,\s*$2\s*,|,\s*$2\s*$|^\s*$2\s*$/',
    "WHERE user_id = $1 AND raw ~ $2",
    'ORDER BY target DESC',
    'LIMIT 50;'
  ].join(' ');

  // TODO: see if we're sanitizing
  const queryArgs = [
    '2',
    searchTerm
  ];

  query(queryStr, queryArgs, function(result) {
    callback(result.rows);
  });
};

module.exports = db;
