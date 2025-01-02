import Plot from 'react-plotly.js';

interface SimulationResultsProps {
  probPlotData: string;
  phasePlotData: string;
}

const SimulationResults: React.FC<SimulationResultsProps> = ({ probPlotData, phasePlotData }) => {
  const probPlot = JSON.parse(probPlotData);
  const phasePlot = JSON.parse(phasePlotData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-black/50 border border-cyan-500/20 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-100">State Probabilities (Histogram)</h2>
        <Plot
          data={probPlot.data}
          layout={probPlot.layout}
          config={{ responsive: true }}
          className="w-full"
        />
      </div>

      <div className="bg-black/50 border border-cyan-500/20 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4 text-gray-100">State Phases (Polar Plot)</h2>
        <Plot
          data={phasePlot.data}
          layout={phasePlot.layout}
          config={{ responsive: true }}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default SimulationResults;
