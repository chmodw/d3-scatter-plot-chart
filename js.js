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
    let xScale = d3
      .scaleLinear()
      .domain([
        d3.min(data.map((item) => item.Year - 1)),
        d3.max(data.map((item) => item.Year + 1)),
      ])
      .range([0, width]);

    let time = data.map((item) => {
      let mins = toMinutes(item.Seconds);
      return new Date(Date.UTC(1995, 5, 3, 0, mins[0], mins[1]));
    });

    let yScale = d3
      .scaleTime()
      .range([0, height])
      .domain([d3.min(time), d3.max(time)]);

    svg
      .append("g")
      .call(d3.axisBottom(xScale).tickFormat((d) => d))
      .attr("id", "x-axis")
      .attr("transform", "translate(60, 450)");

    svg
      .append("g")
      .call(d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S")))
      .attr("id", "y-axis")
      .attr("transform", "translate(60, 50)");
  })
  .catch((error) => {
    if (error) throw error;
  });

//convert seconds to minutes -> [mm,ss]
function toMinutes(seconds) {
  let secs = seconds % 60;
  let mins = (seconds - secs) / 60;

  return [mins, secs];
}
