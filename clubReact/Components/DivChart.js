import React from "react";
import * as d3 from "d3";
import { randomDataGenerator } from "../HelperFunctions";

let dataset = [];
randomDataGenerator(dataset);

function DivChart() {
  // Create a bar chart from div elements
  d3.select("charts")
    .selectAll("div")
    .data(dataset)
    .enter()
    .append("div")
    .attr("class", "bar")
    .style("height", d => {
      let barHeight = d * 5;
      return barHeight + "px";
    });

  return (
    <>
      <h2>Bar Chart with Random Data Built from Div Elements</h2>
      <article className="chartA"></article>
    </>
  );
}

export default DivChart;
