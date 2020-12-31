import React from "react";
import * as d3 from "d3";
import ReactFauxDom from "react-faux-dom";

const width = d3.min([window.innerWidth, window.innerHeight]);

const dimensions = {
  width: width * 0.75,
  height: width * 0.75,
  margin: {
    top: 30,
    right: 10,
    bottom: 50,
    left: 50
  }
};

(dimensions.boundedWidth =
  dimensions.width - dimensions.margin.left - dimensions.margin.right),
  (dimensions.boundedHeight =
    dimensions.height - dimensions.margin.top - dimensions.margin.bottom);

function HouseBar(props) {
  const houseData = props.data;

  const xAccessor = d => d.SalePrice / 1000;
  const yAccessor = d => d.length;

  let node = ReactFauxDom.createElement("svg");
  node.setAttribute("width", dimensions.width);
  node.setAttribute("height", dimensions.height);

  const bounds = d3
    .select(node)
    .append("g")
    .style(
      "transform",
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    );

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(houseData, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice();

  const binsGenerator = d3
    .histogram()
    .domain(xScale.domain())
    .value(xAccessor)
    .thresholds(11);

  const bins = binsGenerator(houseData);

  console.log("bins", bins);

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(bins, yAccessor)])
    .range([dimensions.boundedHeight, 0])
    .nice();

  const binsGroup = bounds.append("g");

  const binGroups = binsGroup
    .selectAll("g")
    .data(bins)
    .enter()
    .append("g");

  const barPadding = 1;

  const barRects = binGroups
    .append("rect")
    .attr("class", "bar")
    .attr("x", d => xScale(d.x0 + barPadding / 2))
    .attr("y", d => yScale(yAccessor(d)))
    .attr("width", d => d3.max([0, xScale(d.x1) - xScale(d.x0) - barPadding]))
    .attr("height", d => dimensions.boundedHeight - yScale(yAccessor(d)));

  const barText = binGroups
    .filter(yAccessor)
    .append("text")
    .attr("x", d => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
    .attr("y", d => yScale(yAccessor(d)) - 5)
    .text(yAccessor)
    .style("text-anchor", "middle")
    .style("fill", "darkgrey")
    .style("font-size", "12px")
    .style("font-family", "sans-serif");

  // Add axis
  const xAxisGenerator = d3.axisBottom().scale(xScale);

  const xAxis = bounds
    .append("g")
    .call(xAxisGenerator)
    .style("transform", `translateY(${dimensions.boundedHeight}px)`)
    .style("font-size", "12px");

  const xAxisLabel = xAxis
    .append("text")
    .attr("x", dimensions.boundedWidth / 2)
    .attr("y", dimensions.margin.bottom - 3)
    .attr("fill", "black")
    .style("font-size", "1.2em")
    .text("SalePrice($) in Hundreds of Thousands");

  const yAxisGenerator = d3.axisLeft().scale(yScale);

  const yAxis = bounds
    .append("g")
    .call(yAxisGenerator)
    .style("font-size", "12px");

  const yAxisLabel = yAxis
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("dy", ".71em")
    .attr("y", 6)
    .attr("fill", "black")
    .style("font-size", "1.2em")
    .text("Number of Houses");

  return node.toReact();
}

export default HouseBar;

/*

  // Add axis
  const xAxis = d3
    .axisBottom()
    .scale(xScaleText)
    .ticks(11);

  const yAxis = d3
    .axisLeft()
    .scale(yScale)
    .ticks(12);

  bounds
    .append("g")
    .attr("transform", "translate(0, " + dimensions.boundedHeight + ")")
    .attr("class", "axis")
    .call(xAxis)
    .append("text")
    .attr("class", "xlabel")
    .attr("x", dimensions.boundedWidth / 2)
    .attr("y", 45)
    .text("SalePrice ($)");

  bounds
    .append("g")
    .attr("class", "axis")
    .call(yAxis)
    .append("text")
    .attr("class", "ylabel")
    .attr("transform", "rotate(-90)")
    .attr("dy", ".71em")
    .attr("y", 6)
    .text("Number of Houses");

  */
