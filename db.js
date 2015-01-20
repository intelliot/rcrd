const pg = require('pg');

var db = {};

db.getRecords = function (callback) {
  var conString = "postgres://rcrd:timanous@localhost:5433/rcrd";

  pg.connect(conString, function (err, client, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }

    const query = [
      'SELECT *',
      'FROM records',
      'WHERE user_id = $1',
      'ORDER BY target DESC',
      'LIMIT 50;'
    ].join(' ');

    client.query(query, ['2'], function (err, result) {
      // call `done()` to release the client back to the pool
      done();

      if (err) {
        return console.error('error running query', err);
      }
      //console.log(result.rows);

      // wouldn't normally do this, but:
      //client.end();

      callback(result.rows);
    });
  });
};

module.exports = db;
