import React from "react";
import * as d3 from "d3";
import ReactFauxDom from "react-faux-dom";
import { getMax } from "../Util/HelperFunctions";

const margin = { top: 30, right: 10, bottom: 80, left: 50, padding: 1 };

const wrapper = d3.min([window.innerWidth, window.innerHeight]);

const width = wrapper - margin.left - margin.right,
  height = wrapper - margin.top - margin.bottom;

function HouseBar(props) {
  const houseData = props.data;

  let node = ReactFauxDom.createElement("svg");
  node.setAttribute("width", width + margin.left + margin.right);
  node.setAttribute("height", height + margin.top + margin.bottom);

  const xScale = d3
    .scaleBand()
    .domain(
      houseData.map(function(d) {
        return d.group;
      })
    )
    .range([0, width])
    .paddingInner(0.3);

  const yScale = d3
    .scaleLinear()
    .domain([0, 1000])
    .rangeRound([height, 0]);

  let svg = d3.select(node);

  let g = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Add axis
  const xAxis = d3
    .axisBottom()
    .scale(xScale)
    .ticks(8);

  const yAxis = d3
    .axisLeft()
    .scale(yScale)
    .ticks(12);

  g.append("g")
    .attr("transform", "translate(0, " + height + ")")
    .attr("class", "axis")
    .call(xAxis)
    .append("text")
    .attr("class", "xlabel")
    .attr("x", width / 2)
    .attr("y", 45)
    .text("SalePrice ($)");

  g.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + margin.padding + ",0)")
    .call(yAxis)
    .append("text")
    .attr("class", "ylabel")
    .attr("transform", "rotate(-90)")
    .attr("dy", ".71em")
    .attr("y", 6)
    .text("Number of Houses");

  // combine rects with data
  g.selectAll(".bar")
    .data(houseData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d, i) {
      return xScale(d.group);
    })
    .attr("y", function(d) {
      return yScale(d.count);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function(d) {
      return height - yScale(d.count);
    });

  g.selectAll(".text")
    .data(houseData)
    .enter()
    .append("text")
    .attr("class", "text")
    .text(function(d) {
      return Math.round(d.count);
    })
    .attr("x", function(d, i) {
      return (
        i * (width / houseData.length + i * 1.8) +
        (width / houseData.length - margin.padding + i) / 2.5
      );
    })
    .attr("y", function(d, i) {
      return height - d.count + d.count - d.count / 7;
    })
    .style("text-anchor", "middle")
    .style("fill", "white")
    .style("font-size", "16.2px");

  return node.toReact();
}

export default HouseBar;
