const url = "http://localhost:3000/gdp";
//   "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data)
    // console.log(String(data["data"][0][0]));
    // console.log(String(data["data"][data["data"].length - 1][0]));
    const padding = 15;
    const width = 700;
    const height = 400;

    const svg = d3.select(".container");
    svg.attr("width", width).attr("height", height);

    const gdpData = data["data"];
    // console.log(gdpData)
    const yearsDate = gdpData.map((data) => new Date(data[0]));
    const xScale = d3
      .scaleTime()
      .domain([new Date(d3.min(yearsDate)), new Date(d3.max(yearsDate))])
      .range([padding, width - padding]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(gdpData, (d) => d[1])])

      .range([height - padding, 0]);

    const tooltip = svg.append("text").attr("id", "tooltip").text("hello");
    svg
      .selectAll("rect")
      .data(gdpData)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(new Date(d[0])))
      .attr("y", (d) => yScale(d[1]))
      .attr("width", 2)
      .attr("height", (d) => {
        // console.log(d[1]);
        return height - padding - yScale(d[1]);
      })
      .attr("class", "bar")
      .attr("data-date", (d) => d[0])
      .attr("data-gdp", (d) => d[1])
      .on("mouseover", (e, d) => {
        // tooltip.html(d[0])
        // .style("left", (d3.event.width) + "px")
        // .style("top", (d3.event.height) + "px")
        // .attr("data-date", d[i][0])
        // console.log("Hovering ", e);
        // console.log("Hovering ", d);

        // tooltip.attr("x", e["clientX"]).attr("y", e["clientY"])
        tooltip
          .attr("x", xScale(new Date(d[0])))
          .attr("y", yScale(d[1]) - padding).raise()
          .text(`${d[0]}, ${d[1]}`).style("opacity", 1)
          .attr("data-date", data=>{
          // console.log(d)
          return d[0]});
        // .attr("width", 100).attr('height', 100)
        // tooltip.attr("x", d["screenX"]+"px")
        // .attr("y", d["screenY"]+'px').text("hello")
        // console.log("Hovering ", d[1])
      }).on("mouseout", () => tooltip.style("opacity", 0));

    // .append("title")
    // .attr("id", "tooltip")
    // .text(
    //   (d) => `date: ${d[0]}
    //   gdp: $${d[1]}`
    // )
    // .attr("id", "tooltip");
    // .attr("data-date", (d) => d[0])
    // .attr("data-gdp", (d) => d[1]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height - padding})`)
      .attr("id", "x-axis")
      .call(xAxis);

    svg
      .append("g")
      .attr("transform", `translate(${padding} , 0)`)
      .attr("id", "y-axis")
      .call(yAxis);
  });

// const date1 = new Date("1947-01");
// const date2 = new Date("2015-07");

// const myScale = d3.scaleLinear().domain(["1947-01", "2015-07"]).range([1, 20]);
// console.log("using my scale with date values");
// console.log(myScale(1089));

// console.log(date1.getFullYear())
// console.log(date1.getMonth())
// console.log(date1.getDate())
// console.log("------------------------------------")
// console.log(date2.getFullYear())
// console.log(date2.getMonth())
// console.log(date2.getDate())
