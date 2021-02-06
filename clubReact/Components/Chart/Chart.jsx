import React, { createContext, useContext } from "react";
import { dimensionsPropsType } from "../../Util/utils";

import "./Chart.css";

const ChartContext = createContext();

export const useChartDimensions = () => {
  useContext(ChartContext);
};

const Chart = ({ dimensions, children }) => (
  <ChartContext.Provider value={dimensions}>
    <svg className="Chart">{children}</svg>
  </ChartContext.Provider>
);

Chart.propTypes = {
  dimensions: dimensionsPropsType
};

Chart.defaultProps = {
  dimensions: {}
};

export default Chart;
