sap.ui.define(
  ['sap/ui/core/Control','jquery.sap.global'],
  function(Control) {
  return Control.extend("sap.ui.demo.control.BarChartsWorking",{
       metadata: {
            properties: {},
            aggregations: {},
       },
      
     init: function (){ }, 
        
      onAfterRendering: function() {
    
    jQuery.sap.require("sap.ui.demo.d3.d3");
          
 //Width and height
			var w = 400;
			var h = 150;
			var barPadding = 1;
          
  var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25];

 
          
  //Make an SVG Container
 var svg = d3.select(this.getDomRef()).append("svg")
                                     .attr("width", w)
                                     .attr("height", h);
 
 //Draw the Rectangle
             svg.selectAll("rect")
                .data(dataset)
                .enter()
                .append("rect")
                 .attr("x", function(d, i) {
			   		return i * (w / dataset.length);
			   })
			   .attr("y", function(d) {
			   		return h - (d * 4);
			   })
			   .attr("width", w / dataset.length - barPadding)
			   .attr("height", function(d) {
			   		return d * 4;
			   })
			   .attr("fill", function(d) {
					return "rgb(0, 0, " + (d * 10) + ")";
			   });
          
          
			svg.selectAll("text")
			   .data(dataset)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d;
			   })
			   .attr("text-anchor", "middle")
			   .attr("x", function(d, i) {
			   		return i * (w / dataset.length) + (w / dataset.length - barPadding) / 2;
			   })
			   .attr("y", function(d) {
			   		return h - (d * 4) + 14;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "white")
			   .on("click", function() {
			   		sortBars();
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