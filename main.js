const url = "http://localhost:3000/gdp";
//   "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data["data"])
    const padding = 15;
    const width = 600;
    const height = 400;

    const svg = d3.select(".container");
    svg.attr("width", width + padding).attr("height", height + padding);

    const gdpData = data["data"];
    // console.log(gdpData)
    const xScale = d3
      .scaleLinear()
      .domain([0, gdpData.length])
      .range([padding, width - padding]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(gdpData, (d) => d[1])])
      .range([padding, height - padding]);

    svg
      .selectAll("rect")
      .data(gdpData)
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => height - yScale(d[1]))
      .attr("width", 1)
      .attr("height", (d) => yScale(d[1]) - padding)
      .attr("class", "rect");

  });
