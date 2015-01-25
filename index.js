const express = require('express');
const db = require('./db');
const moment = require('moment-timezone');

var app = express();

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine({}));

app.get('/', function (req, res) {
  db.getRecords(function (records) {

    records.map(function (record) {
      record.target_tz = moment(record.target).tz("America/Los_Angeles");
      //console.log(record.target_tz.format());
      return record;
    });

    res.render('layouts/main', {
      page: 'index',
      name: 'El Jefe',
      records: records
    });
  });
});

app.get('/search/exactly/:catName', function (req, res) {

  const searchStr = req.params.catName || '';

  db.exactSearch(searchStr, function(records) {

    records.map(function (record) {
      record.target_tz = moment(record.target).tz("America/Los_Angeles");
      //console.log(record.target_tz.format());
      return record;
    });

    res.render('layouts/main', {
      page: 'index',
      name: 'El Jefe',
      records: records
    });
  });
});

app.listen(4000, function () {
  console.log('listening on 4000');
});
