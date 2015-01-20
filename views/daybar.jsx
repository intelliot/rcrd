const React = require('react');
const aux = require('../aux');
const moment = require('moment-timezone');

const DayBar = React.createClass({
  propTypes: {
    requiredMessage: React.PropTypes.instanceOf(Date),
  },
  render: function () {

    //const newmins = moment(this.props.time).startOf('day').fromNow();

    //const minutes = aux.minutesPastMidnight(moment(this.props.time));
    const minutes = 100;
    const leftOffset = minutes / 1440 * (600 - 4);

    const style = {
      height: '4px',
      width: '600px',
      backgroundColor: 'rgb(240, 240, 240)',
      margin: '0 0 0.4em',
      position: 'relative',
    };

    const indicatorStyle = {
      height: '4px',
      width: '4px',
      backgroundColor: '#222',
      position: 'absolute',
      top: '0px',
      left: leftOffset+'100px',
    };

    return (
      <div style={style}>
        <span style={indicatorStyle}></span>
      </div>
    );
  }
});

module.exports = DayBar;
