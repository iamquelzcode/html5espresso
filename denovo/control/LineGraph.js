sap.ui.define(
  ['sap/ui/core/Control','jquery.sap.global'],
  function(Control) {
  return Control.extend("sap.ui.demo.control.LineGraph",{
       metadata: {
            properties: {},
            aggregations: {},
       },
      
    init: function (){ }, 
        
    onAfterRendering: function() {
    
    jQuery.sap.require("sap.ui.demo.d3.d3");

        
// Set the dimensions of the canvas / graph
var margin = {top: 30, right: 20, bottom: 30, left: 50},
    width = 450 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

// Parse the date / time
var parseDate = d3.timeParse("%d-%b-%y");

// Set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// Define the line
var valueline = d3.line()
    .x(function(d) { return x(d.Date); })
    .y(function(d) { return y(d.Sale); });
               
    
// Adds the svg canvas
// append the svg object to the DOM object
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
//this.getDomRef() gives you the jQuery object for this control's DOM element
var svg = d3.select(this.getDomRef()).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.json("data/data_line.json", function(error, data) {
    if (error) throw error;
    
    data.forEach(function(d) {
        d.Date = parseDate(d.Date);
        d.Sale = +d.Sale;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.Date; }));
    y.domain([0, d3.max(data, function(d) { return d.Sale; })]);

    // Add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);

    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));

});
    
       
   },      
       renderer: function(oRm,oControl){
            oRm.write("<div");
			oRm.writeControlData(oControl);
            oRm.addClass("MyLineGraph");
			oRm.writeClasses();
			oRm.write(">");
			oRm.write("</div>");
       }
       
  });
  }
);