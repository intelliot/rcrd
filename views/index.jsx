const React = require('react');
const Record = require('./record');
const Blocks = require('./blocks');

const HelloMessage = React.createClass({
  render: function() {

    const records = this.props.data.records || [];
    const recordDivs = records.map(function (record) {
      return <Record record={record} key={record.id} />;
    });

    const style = {
      marginBottom: '1em'
    };

    return (
      <div style={style}>
        <p>Hello {this.props.data.name}</p>
        <Blocks records={records} />
        {recordDivs}
      </div>
    );
  }
});

module.exports = HelloMessage;
