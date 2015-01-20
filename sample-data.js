const sampleData = {
  recentRecords: [
    {
      id: 1,
      raw: 'some, things'
    },
    {
      id: 2,
      raw: 'some, more, things, 4.3 miles'
    }
  ],
  recentFewCats: {
    'workout': [
      0,
      2, // days ago
      3
    ],
    'drink': [
      1,
      2,
      5,
      9,
      20,
      29
    ],
    'run': [
      10,
      20,
      30,
      31
    ]
  },
  pastYears: [ // ! months (and days?) are 0-indexed
    '2014-09-14',
    '2014-09-02',
    '2014-08-07',
    '2013-12-25',
    '2013-02-15',
    '2013-03-15',
    '2013-03-12',
    '2012-09-20',
    '2012-11-20',
    '2012-10-20'
  ]
};

module.exports = sampleData;
