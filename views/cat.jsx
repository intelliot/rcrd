const React = require('react');
const aux = require('../aux');

const Cat = React.createClass({

  propTypes: {
    requiredCatName: React.PropTypes.string
  },

  clicked: function() {
    console.log('wut');
  },

  render: function() {

    const minutesPastMidnight = aux.minutesPastMidnight(this.props.target);
    const hue = minutesPastMidnight / 1440 * 255;
    const catName = this.props.catName.trim();

    var catStyle = {
      display: 'inline-block',
      borderTopRightRadius: '0.4em',
      borderBottomRightRadius: '0.4em',
      color: 'white',
      backgroundColor: 'hsl('+Number(hue).toFixed(2)+', 65%, 48%)',
      margin: '0 0.4em 0.4em 0',
      padding: '0.5em 0.8em',
      fontSize: '0.9em',
    };

    if (aux.hasMag(catName)) {
      const magStyle = {
        display: 'inline-block',
        borderTopLeftRadius: '0.4em',
        borderBottomLeftRadius: '0.4em',
        color: 'white',
        backgroundColor: 'hsl('+Number(hue).toFixed(2)+', 55%, 28%)',
        margin: '0 0 0.4em 0',
        padding: '0.5em 0.8em',
        fontSize: '0.9em',
      };

      return (
        <span>
          <span
            style={magStyle}
            >{aux.magFromRawCat(catName)}</span>
          <span
            style={catStyle}
            >{aux.maglessCat(catName)}</span>
        </span>
      );
    } else {
      catStyle.borderTopLeftRadius = '0.4em';
      catStyle.borderBottomLeftRadius = '0.4em';

      return (
        <span
          style={catStyle}
          >{catName}</span>
      );
    }
  }
});

module.exports = Cat;
