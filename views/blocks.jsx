const React = require('react');
const aux = require('../aux');
const sampleData = require('../sample-data');

const Blocks = React.createClass({

  propTypes: {
    requiredRecords: React.PropTypes.object
  },

  width: 460,

  getInitialState: function() {

    var recentFewCats = sampleData.recentFewCats;
    var blocks = [];
    var blockWidth = this.width/10;

    Object.keys(recentFewCats).forEach(function(key, i) {
      var catDaysAgo = recentFewCats[key];
      var hue = aux.rand(256);

      catDaysAgo.forEach(function(dayAgo) {
          blocks.push({
            fill: "hsl("+hue+", 50%, 50%)",
            x: (blockWidth - dayAgo) * 10,
            y: i*10,
            width: 10,
            height: 10
          });
      });
    });

    return {
      blocks: blocks
    };
  },

  render: function() {

    var backgroundRects = [];
    var numRows = Object.keys(sampleData.recentFewCats).length;

    for (var y=0; y<numRows; y++) {
      var hue = aux.rand(256);
      for (var x=0; x<this.width/10; x++) {
        var block = React.DOM.rect({
          fill: '#f4f4f4',
          x: x*10+2,
          y: y*10+2,
          width: 6,
          height: 6
        });
        backgroundRects.push(block);
      }
    }

    var rects = this.state.blocks.map(function(block) {
      return React.DOM.rect({
        x: block.x,
        y: block.y,
        width: block.width,
        height: block.height,
        fill: block.fill
      });
    });

    const style = {
      marginBottom: '1em'
    };

    return (
      <svg
        width={this.width}
        height={numRows * 10}
        style={style}
        xmlns='http://www.w3.org/2000/svg'
        version='1.1'>
        {backgroundRects}
        {rects}
      </svg>
    );
  }
});

module.exports = Blocks;
