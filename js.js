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
    let years = data.map((item) => item.Year);

    let seconds = data.map((item) => item.Seconds);

    let xScale = d3
      .scaleLinear()
      .domain([d3.min(years), d3.max(years)])
      .range([0, width]);

    var yScale = d3
      .scaleLinear()
      .domain([d3.min(seconds), d3.max(seconds)])
      .range([height, 0]);

    var yAxis = d3.axisLeft(yScale);

    svg
      .append("g")
      .call(d3.axisBottom(xScale).tickFormat((d) => d))
      .attr("id", "x-axis")
      .attr("transform", "translate(60, 450)");

    svg
      .append("g")
      .call(yAxis)
      .attr("id", "y-axis")
      .attr("transform", "translate(60, 50)");
  })
  .catch((error) => {
    if (error) throw error;
  });

//convert seconds to minutes -> [mm:ss, mm:ss, mm:ss]
function toMinutes(seconds) {
  let secs = seconds % 60;
  let mins = seconds - secs / 60;

  return mins + ":" + secs;
}
