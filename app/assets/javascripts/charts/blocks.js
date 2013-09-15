var charts = charts || {};

charts.blocks = function(data) {

    /* Data Sample
    var data = [
        { col: 5, row: 1, value: 10, color: "red" }
    ];
    */

    var colors = ["#fff","#edf8b1","#c7e9b4","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494","#081d58"]; // alternatively colorbrewer.YlGnBu[9]
    var buckets = 9;

    var gridSize = 10;

    var viewWidth = 600;
    var viewHeight = d3.max(data, function (d) { return d.row; }) * gridSize;

    var colorScale = d3.scale.quantile()
      .domain([0, buckets - 1, d3.max(data, function (d) { return d.value; })])
      .range(colors);

    var svg = d3.select("#block-chart").append("svg")
      .attr("width", "100%")
      .attr("height", viewHeight)
      .attr("viewBox", "0 0 "+viewWidth+" "+viewHeight)
      .attr("preserveAspectRatio", "xMinYMin meet")
      .append("g");

          //days/rows = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
          //times = ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a", "10a", "11a", "12a", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p", "9p", "10p", "11p", "12p"];

      var heatMap = svg.selectAll(".col")
          .data(data)
          .enter().append("rect")
          .attr("x", function(d) { return (d.col - 1) * gridSize; })
          .attr("y", function(d) { return (d.row - 1) * gridSize; })
          .attr("class", "col")
          .attr("width", gridSize - 2)
          .attr("height", gridSize - 2)
          .style("fill", "white");

      heatMap.transition().duration(100)
          //.style("fill", function(d) { return colorScale(d.value); });
          .style("fill", function(d) { return d.color; });

}
