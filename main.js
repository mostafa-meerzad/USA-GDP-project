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

    const xDataScale = d3
      .scaleLinear()
      .domain([
        d3.min(gdpData, (d) => d[0].split("-")[0]),
        d3.max(gdpData, (d) => d[0].split("-")[0]),
      ])
      .range([padding, width - padding]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(gdpData, (d) => d[1])])
      .range([height - padding, padding]);

    svg
      .selectAll("rect")
      .data(gdpData)
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("y", (d) => yScale(d[1]))
      .attr("width", 1)
      .attr("height", (d) => height - yScale(d[1]) - padding)
      .attr("class", "bar")
      .attr("data-date", (d) => d[0])
      .attr("data-gdp", (d) => d[1])
      .append("title")
      .attr("id", "tooltip")
      .text((d) => `date: ${d[0]} gdp: $${d[1]}`);
    // .attr("data-date", (d) => d[0])
    // .attr("data-gdp", (d) => d[1]);

    const xAxis = d3.axisBottom(xDataScale);
    const yAxis = d3.axisLeft(yScale);

    // xAxis.ticks(10).tickValues([1,155,275])
    // xAxis.tickValues(gdpData.map((d) => {
    // return Number(d[0].split("-")[0])
    // }))
    // xAxis.tickValues([
    //   1947, 1947, 1947, 1947, 1948, 1948, 1948, 1948, 1949, 1949, 1949, 1949,
    //   1950, 1950, 1950, 1950, 1951, 1951, 1951, 1951, 1952, 1952, 1952, 1952,
    //   1953, 1953, 1953, 1953, 1954, 1954, 1954, 1954, 1955, 1955, 1955, 1955,
    //   1956, 1956, 1956, 1956, 1957, 1957, 1957, 1957, 1958, 1958, 1958, 1958,
    //   1959, 1959, 1959, 1959, 1960, 1960, 1960, 1960, 1961, 1961, 1961, 1961,
    //   1962, 1962, 1962, 1962, 1963, 1963, 1963, 1963, 1964, 1964, 1964, 1964,
    //   1965, 1965, 1965, 1965, 1966, 1966, 1966, 1966, 1967, 1967, 1967, 1967,
    //   1968, 1968, 1968, 1968, 1969, 1969, 1969, 1969, 1970, 1970, 1970, 1970,
    //   1971, 1971, 1971, 1971,
    // ]);
    // .tickArguments(100)

    // xAxis.tickValues([100, 400, 200, 600]);

    // console.log(gdpData.map((d) => Number(d[0].split("-")[0])));
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
