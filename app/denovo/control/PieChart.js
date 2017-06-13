sap.ui.define(
  ['sap/ui/core/Control','jquery.sap.global'],
  function(Control) {
  return Control.extend("sap.ui.demo.control.PieChart",{
       metadata: {
            properties: {},
            aggregations: {},
       },
      
    init: function (){ }, 
        
    onAfterRendering: function() {
    
    jQuery.sap.require("sap.ui.demo.d3.d3");

// svg canvas dimensions
     w = 320,
     h = 200;
         
  //Make an SVG Container
 var svg = d3.select(this.getDomRef()).append("svg")
             .attr("width", w)
             .attr("height", w)
            radius = Math.min(w, h) / 2,
            g = svg.append("g").attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

 // set colour
 var color = d3.scaleOrdinal(["#f4b942", "#ebf441", "#c5cbcc", "#818a8c", "#53baba", "#365d60"]);
        
 var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.Dist; });
       
 var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(w/2); //change to ring chart

var label = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

d3.json("data/data_pie.json", function(error, data) {
  if (error) throw error;

//Set up groups
  var arc = g.selectAll(".arc")
    .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

//Draw arc paths
  arc.append("path")
      .attr("d", path)
      .attr("fill", function(d) { return color(d.data.Product); });

//Labels
  arc.append("text")
      .attr("text-anchor", "middle")
      .attr("transform", function(d) { return "translate(" + path.centroid(d) + ")"; })
      .attr("dy", "0.35em")
      .text(function(d) { return d.data.Product; });
});
    
       
   },
      
       renderer: function(oRm,oControl){
            oRm.write("<div");
			oRm.writeControlData(oControl);
            oRm.addClass("MyAppPie");
			oRm.writeClasses();
			oRm.write(">");
			oRm.write("</div>");
       }
       
  });
  }
);