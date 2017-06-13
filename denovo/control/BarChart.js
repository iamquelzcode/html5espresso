sap.ui.define(
  ['sap/ui/core/Control','jquery.sap.global'],
  function(Control) {
  return Control.extend("sap.ui.demo.control.BarChart",{
       metadata: {
            properties: {},
            aggregations: {},
       },
      
    init: function (){ }, 
        
    onAfterRendering: function() {
    
    jQuery.sap.require("sap.ui.demo.d3.d3");
         
 // svg canvas dimensions
 var margin = { top: 30, right: 20, bottom: 30, left: 50},
     width = 400 - margin.left - margin.right,
     height = 350 - margin.top - margin.bottom;
        
  // set the ranges
 var x = d3.scaleBand().range([0, width]).padding(0.1);
 var y = d3.scaleLinear().range([height, 0]);

// append the svg object to the DOM object
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
//this.getDomRef() gives you the jQuery object for this control's DOM element
 var svg = d3.select(this.getDomRef()).append("svg")
              .attr("width", width + margin.left+margin.right)
              .attr("height", height + margin.top+margin.bottom)
              .append("g")
              .attr("transform", 
                      "translate(" + margin.left + "," + margin.top + ")");
  

 // load the data - get data from json file
d3.json("data/data.json", function(error, data) {
 if (error) throw error;
    
    //format data
    data.forEach(function(d) {
       d.Country = d.Country;
        d.Sale = +d.Sale;
    });

    // scale the range of the data in domain - domain of scales
  x.domain(data.map(function(d) { return d.Country; }));
  y.domain([0, d3.max(data, function(d) { return d.Sale; })]);
    
    
     // Add bar chart -append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.Country); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.Sale); })
      .attr("height", function(d) { return height - y(d.Sale); });
    
  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
      .call(d3.axisLeft(y));
   
});
           
        },
      
       renderer: function(oRm,oControl){
            oRm.write("<div");
			oRm.writeControlData(oControl);
            oRm.addClass("MyAppBarChart");
			oRm.writeClasses();
			oRm.write(">");
			oRm.write("</div>");
       }
       
  });
  }
);

/* define the axis - create a new bottom-oriented and left axis generator
var xAxis = d3.axisBottom()
    .scale(x)

var yAxis = d3.axisLeft()
    .scale(y)
    .ticks(10); 
    
    
    // add x axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + h + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );
    
  // add y axis    
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Sale");
*/
 