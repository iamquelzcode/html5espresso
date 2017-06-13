sap.ui.define(
  ['sap/ui/core/Control','jquery.sap.global'],
  function(Control) {
  return Control.extend("sap.ui.demo.control.BarCharts",{
       metadata: {
            properties: {},
            aggregations: {},
       },
      
     init: function (){ }, 
        
      onAfterRendering: function() {
    
    jQuery.sap.require("sap.ui.demo.d3.d3");
          
 //SVG dimension - Margin, Width and height  
  var   m = {top: 10, right: 10, bottom: 50, left: 20},
        w = 600 - m.left - m.right,
        h = 300 - m.top - m.bottom;


// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);
          
 //Make an SVG Container
 var svg = d3.select(this.getDomRef()).append("svg")
                                     .attr("width", w+m.left + m.right)
                                     .attr("height", h++ m.top + m.bottom)
                     .append("g")
                        .attr("transform", 
                              "translate(" + m.left + "," + m.top + ")");
        
//json data file          
  d3.json("data.json", function(error,data) {

         data.forEach(function(d) {
        d.Country = d.Country;
        d.Sale = +d.Sale;
    });

  // scale the range of the data
  x.domain(data.map(function(d) { return d.Country; }));
  y.domain([0, d3.max(data, function(d) { return d.Sale; })]);

  // add axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + h + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Sale");


  // Add bar chart
  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Country); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.Sale); })
      .attr("height", function(d) { return h - y(d.Sale); });

    });

       },
      
       renderer: function(oRm,oControl){
            oRm.write("<div");
			oRm.writeControlData(oControl);
			oRm.write(">");
			oRm.write("</div>");
       }
       
  });
  }
);