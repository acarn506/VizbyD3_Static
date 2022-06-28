import React from "react";

export const projects = [
  {
    identifier: "WallofD3",
    title: "Wall of D3",
    message: `A collection of the first charts I've made using D3.js and Scalable vector graphics. As you work your way down the wall, the charts will include more advanced concepts to visualizing actual datasets. All implemented datasets are stored on the backend and queried from a NeDB management system.`,
    tools: ["React", "D3.js", "SVG", "Node.js", "NeDB"]
  },
  {
    identifier: "HousingDashboard",
    title: "Housing Dashboard",
    message: `Here I created a dashboard using data from a Kaggle Challenge on
    housing prices that were assigned to me during a Machine Learning
    Course. The purpose of this dashboard was to use the given training
    data in order to get a perspective on which house features had the
    most influence on the predicted feature being the house price.`,
    tools: ["React", "D3.js", "Node.js", "SVG", "Mocha", "NeDB"]
  }
 
];


