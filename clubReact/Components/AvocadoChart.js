import React from "react";
import * as d3 from "d3";
import ReactFauxDom from "react-faux-dom";
import { getMax, getMin } from "../HelperFunctions";

const margin = {
  top: 20,
  right: 30,
  bottom: 120,
  left: 120,
  padding: 40
};
const width = 1000 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

function AvocadoChart(props) {
  let avocados = props.data;

  let node = ReactFauxDom.createElement("svg");
  node.setAttribute("width", width + margin.left + margin.right);
  node.setAttribute("height", height + margin.top + margin.bottom);

  let dates = avocados.map(avocado => {
    return avocado.Date;
  });

  let averagePrices = avocados.map(avocado => {
    return avocado.AveragePrice;
  });

  const maxDate = getMax(dates);
  const min = getMin(dates);
  const maxPrice = getMax(averagePrices);

  let formatTime = d3.timeFormat("%Y-%m");

  const xScale = d3
    .scaleTime()
    .domain([min, maxDate])
    .range([margin.padding, width]);

  const yScale = d3
    .scaleLinear()
    .domain([0.4, maxPrice])
    .range([height - margin.padding, 0]);

  const xAxis = d3
    .axisBottom()
    .scale(xScale)
    .ticks(10)
    .tickFormat(formatTime);

  const yAxis = d3
    .axisLeft()
    .scale(yScale)
    .ticks(10);

  let line = d3
    .line()
    .x(d => {
      return xScale(d.Date);
    })
    .y(d => {
      return yScale(d.AveragePrice);
    });

  let svg = d3.select(node);

  svg
    .attr("width", width)
    .attr("height", height)
    .append("path")
    .datum(avocados)
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", "#5ce266")
    .attr("stroke-width", 1.5)
    .attr("d", line);

  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (height - margin.padding) + ")")
    .call(xAxis);

  svg
    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + margin.padding + ", 0)")
    .call(yAxis);

  //console.table(props.data, ["Date", "AveragePrice"]);
  return node.toReact();
}

export default AvocadoChart;
