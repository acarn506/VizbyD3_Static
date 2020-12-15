import React from "react";
import ReactFauxDom from "react-faux-dom";
import { getMax } from "../HelperFunctions";
import * as d3 from "d3";

const margin = { top: 20, right: 10, bottom: 10, left: 10 };
const width = 800 - margin.left - margin.right,
  height = 250 - margin.top - margin.bottom;
const padding = 1;

function BarChartUpdate(props) {
  let node = ReactFauxDom.createElement("svg");
  node.setAttribute("width", width + margin.left + margin.right);
  node.setAttribute("height", height + margin.top + margin.bottom);

  let max = getMax(props.data);

  const xScale = d3
    .scaleBand()
    .domain(d3.range(props.data.length))
    .rangeRound([0, width])
    .paddingInner(0.05);

  const yScale = d3
    .scaleLinear()
    .domain([0, max])
    .range([0, height - 20]);

  let svg = d3.select(node);

  // rects
  svg
    .selectAll("rect")
    .data(props.data)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
      return xScale(i);
    })
    .attr("y", function(d) {
      return height - yScale(d);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) {
      return yScale(d);
    })
    .attr("fill", function(d) {
      return "rgb(" + Math.round(d * 10) + ",30" + ",150)";
    });

  // text
  svg
    .selectAll("text")
    .data(props.data)
    .enter()
    .append("text")
    .text(function(d) {
      return Math.round(d);
    })
    .attr("x", function(d, i) {
      return (
        i * (width / props.data.length) +
        (width / props.data.length - padding) / 2
      );
    })
    .attr("y", function(d) {
      return height - d * 4;
    })
    .style("text-anchor", "middle")
    .style("fill", "white")
    .style("font-size", "11px");

  return node.toReact();
}

export default BarChartUpdate;
