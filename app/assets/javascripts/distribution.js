if (document.getElementById('distribution-chart')){

  console.log(frequencies);

  var data = frequencies; // In tpl

  console.log(600 / data.length);

  var width = 600;
  var height = 100;

  var barWidth = width / data.length;

  var x = d3.scale.linear()
      .domain([0, data.length])
      .range([0, width]);

  var y = d3.scale.linear()
      .domain([0, d3.max(data, function(d) { return d.times; })])
      .range([0, height]);

  var svg = d3.select("#distribution-chart").append("svg")
      .attr("width", "100%")
      .attr("height", 400)
      .attr("viewBox", "0 0 "+width+" 100")
      .attr("preserveAspectRatio", "xMinYMin meet")
    .append("g")

 svg.selectAll("rect")
     .data(data)
   .enter().append("rect")
     .attr("x", function(d, i) { return x(i); })
     .attr("y", function(d) { return height - y(d.times); })
     .attr("width", barWidth)
     .attr("height", function(d) { return y(d.times); })
     .attr("fill", "steelblue")

}
