const React = require('react');
const Cat = require('./cat.jsx');
const DayBar = require('./daybar.jsx');
//const SplitCat = require('./splitcat');
const aux = require('../aux');

const Record = React.createClass({
  render: function () {
    var rec = this.props.record;
    var raw = this.props.raw;

    if (raw) {
      var rawCats = raw.split(',').map(aux.trim);
    }
    else if (rec && rec.raw) {
      var rawCats = rec.raw.split(',').map(aux.trim);
    }
    else {
      var rawCats = [];
    }

    var catSpans = rawCats.map(function(cat, i) {
      // This logic should take place inside Cat
      // TODO: Merge Cat and SplitCat
      /*
      if (aux.hasMag(cat)) {
        return SplitCat({catName: cat});
      }
      else {
  */
        return (
          <Cat
            catName={cat}
            key={i}
            target={rec.target}
            />
        );
      //}
    });

    const style = {
      marginBottom: '0.8em'
    };

    return (
      <div style={style}>
        <DayBar time={rec.target_tz} />
        <div>
          <span>{catSpans}</span>
        </div>
      </div>
    );
  }
});

module.exports = Record;
