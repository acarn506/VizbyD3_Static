import React from "react";
import PropTypes from "prop-types";

import Chart from "../Chart/Chart";
import { useChartDimensions, accessorPropsType } from "../../Util/utils";

const Timeline = ({ data, xAccessor, yAccessor, label }) => {
  const [ref, dimensions] = useChartDimensions();
  return (
    <div className="Timeline" ref={ref}>
      <Chart dimensions={dimensions} />
    </div>
  );
};

Timeline.PropTypes = {
  data: PropTypes.array,
  xAccessor: accessorPropsType,
  yAccessor: accessorPropsType,
  label: PropTypes.string
};

Timeline.defaultProps = {
  xAccessor: d => d.x,
  yAccessor: d => d.y
};

export default Timeline;
