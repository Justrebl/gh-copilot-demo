// generate a plot with d3js of the selling price of the album by year
// x-axis are the month series and y-axis show the numbers of album selled

import * as d3 from "d3";

export const generatePlot = (data: any) => {
  const margin = { top: 10, right: 30, bottom: 30, left: 60 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  const svg = d3
    .select("#plot")
    .append("svg")
    .attr("id", "plot-svg")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .append("g")
    .attr("id", "plot-g")
    .attr("transform", `translate(${margin.left},${margin.top})`);
  const x = d3
    .scaleBand()
    .range([0, width])
    .domain(
      data.map((d: any) => {
        return d.month;
      })
    )
    .padding(0.2);
  svg
    .append("g")
    .attr("id", "plot-x-axis")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d: any) => d.count)])
    .range([height, 0]);
  svg
    .append("g")
    .attr("id", "plot-y-axis")
    .call(d3.axisLeft(y));
  svg
    .selectAll("plot-bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", (d: any) => x(d.month))
    .attr("y", (d: any) => y(d.count))
    .attr("width", x.bandwidth())
    .attr("height", (d: any) => height - y(d.count))
    .attr("fill", "#69b3a2");
}