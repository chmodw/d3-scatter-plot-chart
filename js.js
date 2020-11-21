// let margin = { top: 10, right: 30, bottom: 30, left: 60 };
let width = 800;
let height = 400;

var svg = d3
  .select("#chart-container")
  .append("svg")
  .attr("id", "chart")
  .attr("width", width + 150)
  .attr("height", height + 100)
  .attr("padding", 20)
  .append("g");

d3.json(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
)
  .then((data) => {
    // Adding X axis
    let xScale = d3
      .scaleLinear()
      .domain([
        d3.min(data.map((item) => item.Year - 1)),
        d3.max(data.map((item) => item.Year + 1)),
      ])
      .range([0, width]);

    svg
      .append("g")
      .call(d3.axisBottom(xScale).tickFormat((d) => d))
      .attr("id", "x-axis")
      .attr("transform", "translate(60, 450)");

    // Adding Y axis
    let yScale = d3
      .scaleTime()
      .range([0, height])
      .domain([
        d3.min(data.map((item) => timeParser(item.Seconds))),
        d3.max(data.map((item) => timeParser(item.Seconds))),
      ]);

    svg
      .append("g")
      .call(d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S")))
      .attr("id", "y-axis")
      .attr("transform", "translate(60, 50)");

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    // Adding Dots
    svg
      .append("g")
      .selectAll(".dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (d) => xScale(d.Year) + 60)
      .attr("cy", (d) => yScale(timeParser(d.Seconds)) + 50)
      .attr("r", 7)
      .style("stroke", "black")
      .style("fill", (d) => color(d.Doping !== ""))
      .style("opacity", 0.7)
      .on("mouseover", (e, d) => {
        d3.select("#tooltip")
          .style("opacity", 0.9)
          .style("top", yScale(timeParser(d.Seconds)) + 100 + "px")
          .style("left", xScale(d.Year) + 130 + "px");
        d3.select("#tooltip-name").text(d.Name);
        d3.select("#tooltip-country").text(d.Nationality);
        d3.select("#tooltip-year").text("Year : " + d.Year);
        d3.select("#tooltip-time").text("Time : " + d.Time);
        d3.select("#tooltip-allegation").text(d.Doping);
      })
      .on("mouseout", function () {
        d3.select("#tooltip").style("opacity", 0);
      });

    // adding label to the y axis
    svg
      .append("text")
      .attr("id", "y-axis-label")
      .attr("transform", "rotate(-90)")
      .attr("y", -2)
      .attr("x", 0 - height / 2)
      .attr("dy", "1.2em")
      .style("text-anchor", "middle")
      .text("Time in Minutes");
  })
  .catch((error) => {
    if (error) throw error;
  });

//convert seconds to minutes -> [mm,ss]
function timeParser(seconds) {
  let secs = seconds % 60;
  let mins = (seconds - secs) / 60;

  return new Date(Date.UTC(1995, 5, 3, 0, mins, secs));
}
