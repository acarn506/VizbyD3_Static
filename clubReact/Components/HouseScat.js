import React from "react";
import ReactFauxDom from "react-faux-dom";
import { getMax, getMin } from "../HelperFunctions";
import * as d3 from "d3";

const margin = {
  top: 30,
  right: 20,
  bottom: 0,
  left: 40,
  padding: 50
};

const width = 850 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

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
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const xScale = d3
    .scaleLinear()
    .domain([minX, maxX])
    .range([margin.padding, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0, maxY])
    .range([height - margin.padding, 0]);

  const rScale = d3
    .scaleLinear()
    .domain([0, maxY])
    .range([4, 5]);

  svg
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

  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0, " + (height - margin.padding) + ")")
    .call(xAxis)
    .append("text")
    .attr("class", "xlabel")
    .attr("x", width)
    .attr("y", -6)
    .text(labels[0]);

  // Define y axis
  const yAxis = d3
    .axisLeft()
    .scale(yScale)
    .ticks(10);

  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + margin.padding + ",0)")
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
