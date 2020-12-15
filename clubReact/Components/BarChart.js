import React from "react";
import { getMax } from "../HelperFunctions";
import * as d3 from "d3";

let sizing = { height: 250, width: 800, padding: 1 };

// text styling
let style = {
  fontFamily: "sans-serif",
  fontSize: "11px",
  fill: "white",
  textAnchor: "middle"
};

function BarChart(props) {
  let dataLength = props.data.length;
  let max = getMax(props.data);

  const xbarScale = d3
    .scaleBand()
    .domain(d3.range(dataLength))
    .rangeRound([0, sizing.width])
    .paddingInner(0.05);

  const ybarScale = d3
    .scaleLinear()
    .domain([0, max])
    .range([0, sizing.height]);

  let rects = props.data.map((d, i) => {
    return (
      <rect
        key={`bar${i}`}
        x={xbarScale(i)}
        y={sizing.height - ybarScale(d)}
        height={ybarScale(d)}
        width={xbarScale.bandwidth()}
        fill={"rgb(30," + Math.round(d * 10) + ",100)"}
      />
    );
  });

  let texts = props.data.map((d, i) => {
    return (
      <text
        x={
          i * (sizing.width / dataLength) +
          (sizing.width / dataLength - sizing.padding) / 2
        }
        y={sizing.height - d * 4 + 14}
        style={style}
        key={`text${i}`}
      >
        {Math.round(d)}
      </text>
    );
  });

  return (
    <svg height={sizing.height} width={sizing.width}>
      {rects}
      {texts}
    </svg>
  );
}

export default BarChart;
