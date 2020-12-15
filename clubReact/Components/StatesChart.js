import React from "react";
import * as d3 from "d3";
import ReactFauxDom from "react-faux-dom";
import { getMax } from "../HelperFunctions";

const margin = { top: 20, right: 10, bottom: 94, left: 80 };
const width = 1000 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

function StatesChart(props) {
  const stateData = props.data;
  // for range
  const stateLength = stateData.length;
  // passed to D3

  // used to get max
  const statePop = stateData.map(state => {
    return state.population;
  });
  // used for ticks on x-axis
  const stateNames = stateData.map(state => {
    return state.state;
  });

  const max = getMax(statePop);

  let node = ReactFauxDom.createElement("svg");
  node.setAttribute("width", width + margin.left + margin.right);
  node.setAttribute("height", height + margin.top + margin.bottom);

  const xScale = d3
    .scaleBand()
    .domain(d3.range(stateLength))
    .rangeRound([0, width])
    .paddingInner(0.1);

  const yScale = d3
    .scaleLinear()
    .domain([0, max])
    .rangeRound([height, 0]);

  let svg = d3.select(node);

  let g = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Add axis
  const xAxis = d3
    .axisBottom()
    .scale(xScale)
    .tickFormat((d, i) => stateNames[i]);

  const yAxis = d3
    .axisLeft()
    .scale(yScale)
    .ticks(10);

  g.append("g")
    .attr("transform", "translate(0, " + height + ")")
    .attr("class", "axisx")
    .call(xAxis)
    .selectAll("text")
    .attr("y", 0)
    .attr("x", 9)
    .attr("dy", ".35em")
    .attr("transform", "rotate(90)")
    .style("text-anchor", "start")
    .style("font-size", "12px");

  g.append("g")
    .attr("class", "axisy")
    .call(yAxis)
    .selectAll("text")
    .attr("transform", "rotate(-360)")
    .attr("y", -3)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .style("font-size", "12px");

  // combine rects with data
  g.selectAll(".bar")
    .data(stateData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d, i) {
      return xScale(i);
    })
    .attr("y", function(d) {
      return yScale(d.population);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) {
      return height - yScale(d.population);
    });

  return node.toReact();
}

export default StatesChart;
