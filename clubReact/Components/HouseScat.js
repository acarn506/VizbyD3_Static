import React from "react";
import ReactFauxDom from "react-faux-dom";
import { getMax, getMin } from "../HelperFunctions";
import * as d3 from "d3";

const width = d3.min([window.innerWidth, window.innerHeight]);

const dimensions = {
  width: width,
  height: width,
  margin: {
    top: 10,
    right: 10,
    bottom: 70,
    left: 70
  }
};

dimensions.boundedWidth =
  dimensions.width - dimensions.margin.left - dimensions.margin.right;
dimensions.boundedHeight =
  dimensions.width - dimensions.margin.top - dimensions.margin.bottom;

function HouseScat(props) {
  // get label names for each axis
  let tmp = props.data[0];
  let labels = Object.keys(tmp);

  let datasetX = props.data.map(d => {
    return Number(d[labels[0]]);
  });

  let datasetY = props.data.map(d => {
    return Number(d.SalePrice);
  });

  let maxX = getMax(datasetX);
  let minX = getMin(datasetX);
  let maxY = getMax(datasetY);

  let node = ReactFauxDom.createElement("svg");
  let svg = d3
    .select(node)
    .attr("height", dimensions.height)
    .attr("width", dimensions.width);

  const bounds = svg
    .append("g")
    .style(
      "transform",
      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
    );

  const xScale = d3
    .scaleLinear()
    .domain([minX, maxX])
    .range([0, dimensions.boundedWidth]);

  const yScale = d3
    .scaleLinear()
    .domain([0, maxY])
    .range([dimensions.boundedHeight, 0]);

  const rScale = d3
    .scaleLinear()
    .domain([0, maxY])
    .range([4, 5]);

  bounds
    .selectAll("circle")
    .data(props.data)
    .enter()
    .append("circle")
    .attr("cx", d => {
      return xScale(d[labels[0]]);
    })
    .attr("cy", d => {
      return yScale(d.SalePrice);
    })
    .attr("r", d => {
      return rScale(d.SalePrice);
    })
    .attr("fill", "#fdb01c")
    .style("stroke", "black");

  // Define x axis
  const xAxis = d3
    .axisBottom()
    .scale(xScale)
    .ticks(5);

  bounds
    .append("g")
    .attr("class", "axis")
    .call(xAxis)
    .style("transform", `translateY(${dimensions.boundedHeight}px)`)
    .append("text")
    .attr("class", "xlabel")
    .attr("x", dimensions.boundedWidth)
    .attr("y", -6)
    .text(labels[0]);

  // Define y axis
  const yAxis = d3
    .axisLeft()
    .scale(yScale)
    .ticks(10);

  bounds
    .append("g")
    .attr("class", "axis")
    .call(yAxis)
    .append("text")
    .attr("class", "ylabel")
    .attr("transform", "rotate(-90)")
    .attr("dy", ".71em")
    .attr("y", 6)
    .text("SalePrice ($)");

  return node.toReact();
}

export default HouseScat;
