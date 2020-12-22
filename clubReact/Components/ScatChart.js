import React from "react";
import ReactFauxDom from "react-faux-dom";
import { randomDataScatGenerator, getMax } from "../Util/HelperFunctions";
import * as d3 from "d3";

let sizing = { height: 300, width: 650, padding: 32 };

function ScatChart(props) {
  let datasetX = props.data.map(d => {
    return d[0];
  });

  let datasetY = props.data.map(d => {
    return d[1];
  });

  let maxX = getMax(datasetX);
  let maxY = getMax(datasetY);

  let node = ReactFauxDom.createElement("svg");
  let svg = d3
    .select(node)
    .attr("height", sizing.height)
    .attr("width", sizing.width);

  const xScale = d3
    .scaleLinear()
    .domain([0, maxX])
    .range([sizing.padding, sizing.width - sizing.padding * 2]);

  const yScale = d3
    .scaleLinear()
    .domain([0, maxY])
    .range([sizing.height - sizing.padding, sizing.padding]);

  const rScale = d3
    .scaleLinear()
    .domain([0, maxY])
    .range([2, 8]);

  svg
    .selectAll("circle")
    .data(props.data)
    .enter()
    .append("circle")
    .attr("cx", d => {
      return xScale(d[0]);
    })
    .attr("cy", d => {
      return yScale(d[1]);
    })
    .attr("r", d => {
      return rScale(d[1]);
    })
    .attr("fill", "purple");

  // Define x axis
  const xAxis = d3
    .axisBottom()
    .scale(xScale)
    .ticks(5);

  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0, " + (sizing.height - sizing.padding) + ")")
    .call(xAxis);

  // Define y axis
  const yAxis = d3
    .axisLeft()
    .scale(yScale)
    .ticks(5);

  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + sizing.padding + ",0)")
    .call(yAxis);

  return node.toReact();
}

export default ScatChart;
