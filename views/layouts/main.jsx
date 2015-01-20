const React = require('react');

const HelloMessage = React.createClass({
  render: function() {

    const Page = require('../'+this.props.page);

    const bodyStyle = {
      fontSize: '16px',
      fontFamily: 'Lucida Grande',
      WebkitFontSmoothing: 'antialiased',
    };

    const containerStyle = {
      margin: '0 auto',
      width: '600px',
    };

    return (
      <html>
        <head>
          <title>rcrd - track anything</title>
        </head>
        <body style={bodyStyle}>
          <div style={containerStyle}>
            <h1>rcrd</h1>
            <Page data={this.props} />
          </div>
        </body>
      </html>
    );
  }
});

module.exports = HelloMessage;
