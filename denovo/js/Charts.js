function barChartMain () {
//Width and height
			var w = 650;
			var h = 150;
			
			var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
							11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

			var xScale = d3.scale.ordinal()
							.domain(d3.range(dataset.length))
							.rangeRoundBands([0, w], 0.05);

			var yScale = d3.scale.linear()
							.domain([0, d3.max(dataset)])
							.range([0, h]);
			
			//Create SVG element
			var svg = d3.select("#barchart")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

			//Create bars
			svg.selectAll("rect")
			   .data(dataset)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return xScale(i);
			   })
			   .attr("y", function(d) {
			   		return h - yScale(d);
			   })
			   .attr("width", xScale.rangeBand())
			   .attr("height", function(d) {
			   		return yScale(d);
			   })
			   .attr("fill", function(d) {
					return "rgb(0, 0, " + (d * 10) + ")";
			   })
			   .on("click", function() {
			   		sortBars();
			   });

			//Create labels
			svg.selectAll("text")
			   .data(dataset)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d;
			   })
			   .attr("text-anchor", "middle")
			   .attr("x", function(d, i) {
			   		return xScale(i) + xScale.rangeBand() / 2;
			   })
			   .attr("y", function(d) {
			   		return h - yScale(d) + 14;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "white");
			
			//Define sort order flag
			var sortOrder = false;
			
			//Define sort function
			var sortBars = function() {

				//Flip value of sortOrder
			   	sortOrder = !sortOrder;

				svg.selectAll("rect")
				   .sort(function(a, b) {
				   		if (sortOrder) {
					   		return d3.ascending(a, b);
				   		} else {
					   		return d3.descending(a, b);
				   		}
				   	})
				   .transition()
				   .delay(function(d, i) {
					   return i * 50;
				   })
				   .duration(1000)
				   .attr("x", function(d, i) {
				   		return xScale(i);
				   });

			};
    //return;
};

function pieChartMain (){
    
  //Width and height
			var w = 200;
			var h = 200;

			var dataset = [ 5, 10, 20, 45, 6, 25 ];

			var outerRadius = w / 2;
			var innerRadius = w / 3; //change to ring chart
			var arc = d3.svg.arc()
							.innerRadius(innerRadius)
							.outerRadius(outerRadius);
			
			var pie = d3.layout.pie();
			
			//Easy colors accessible via a 10-step ordinal scale
			var color = d3.scale.category10();

			//Create SVG element
			var svg = d3.select("#piechart")
						.append("svg")
						.attr("width", w)
						.attr("height", h);
			
			//Set up groups
			var arcs = svg.selectAll("g.arc")
						  .data(pie(dataset))
						  .enter()
						  .append("g")
						  .attr("class", "arc")
						  .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");
			
			//Draw arc paths
			arcs.append("path")
			    .attr("fill", function(d, i) {
			    	return color(i);
			    })
			    .attr("d", arc);
			
			//Labels
			arcs.append("text")
			    .attr("transform", function(d) {
			    	return "translate(" + arc.centroid(d) + ")";
			    })
			    .attr("text-anchor", "middle")
			    .text(function(d) {
			    	return d.value;
			    });  
};

function stackBarMain () {
    
  //Width and height
			var w = 400;
			var h = 200;

			//Original data
			var dataset = [
				[
					{ x: 0, y: 5 },
					{ x: 1, y: 4 },
					{ x: 2, y: 2 },
					{ x: 3, y: 7 },
					{ x: 4, y: 23 }
				],
				[
					{ x: 0, y: 10 },
					{ x: 1, y: 12 },
					{ x: 2, y: 19 },
					{ x: 3, y: 23 },
					{ x: 4, y: 17 }
				],
				[
					{ x: 0, y: 22 },
					{ x: 1, y: 28 },
					{ x: 2, y: 32 },
					{ x: 3, y: 35 },
					{ x: 4, y: 43 }
				]
			];

			//Set up stack method
			var stack = d3.layout.stack();

			//Data, stacked
			stack(dataset);

			//Set up scales
			var xScale = d3.scale.ordinal()
				.domain(d3.range(dataset[0].length))
				.rangeRoundBands([0, w], 0.05);
		
			var yScale = d3.scale.linear()
				.domain([0,				
					d3.max(dataset, function(d) {
						return d3.max(d, function(d) {
							return d.y0 + d.y;
						});
					})
				])
				.range([0, h]);
				
			//Easy colors accessible via a 10-step ordinal scale
			var colors = d3.scale.category10();
		
			//Create SVG element
			var svg = d3.select("#stackbar")
						.append("svg")
						.attr("width", w)
						.attr("height", h);
	
			// Add a group for each row of data
			var groups = svg.selectAll("g")
				.data(dataset)
				.enter()
				.append("g")
				.style("fill", function(d, i) {
					return colors(i);
				});
	
			// Add a rect for each data value
			var rects = groups.selectAll("rect")
				.data(function(d) { return d; })
				.enter()
				.append("rect")
				.attr("x", function(d, i) {
					return xScale(i);
				})
				.attr("y", function(d) {
					return yScale(d.y0);
				})
				.attr("height", function(d) {
					return yScale(d.y);
				})
				.attr("width", xScale.rangeBand());
	  
    
    
};