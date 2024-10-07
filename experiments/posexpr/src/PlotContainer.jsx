import { useEffect, useRef } from 'react';
import * as Plotly from 'plotly.js-dist';

// eslint-disable-next-line react/prop-types
const PlotContainer = ({ probPlotData, phasePlotData }) => {
  const probPlotRef = useRef(null);
  const phasePlotRef = useRef(null);

  useEffect(() => {
    if (probPlotData) {
      Plotly.newPlot(probPlotRef.current, probPlotData);
    }
  }, [probPlotData]);

  useEffect(() => {
    if (phasePlotData) {
      Plotly.newPlot(phasePlotRef.current, phasePlotData);
    }
  }, [phasePlotData]);

  return (
    <div className="plots-container">
      <h3>You can view your circuit in 3d mode <a href="http://localhost:5000/3dckt" target="_blank">here</a>. Note: make sure to open it in another tab or else your lose your activtiy</h3>
      <div ref={probPlotRef} className="probability-plot" />
      <div ref={phasePlotRef} className="phase-plot" />
    
    </div>
  );
};

export default PlotContainer;