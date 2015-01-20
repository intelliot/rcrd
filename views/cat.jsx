const React = require('react');
const aux = require('../aux');

const Cat = React.createClass({
  onClick: function() {
    window.location = '/cats/'+this.props.catName;
  },
  render: function() {

    const minutesPastMidnight = aux.minutesPastMidnight(this.props.target);
    const hue = minutesPastMidnight / 1440 * 255;

    const style = {
      display: 'inline-block',
      borderRadius: '0.4em',
      color: 'white',
      backgroundColor: 'hsl('+Number(hue).toFixed(2)+', 65%, 48%)',
      margin: '0 0.4em 0.4em 0',
      padding: '0.5em 0.8em',
      fontSize: '0.9em',
    };

    return (
      <span
        style={style}
        onClick={this.onClick}
        >{this.props.catName}</span>
    );
  }
});

module.exports = Cat;
