import React from 'react';

interface SimulationTextResultsProps {
  results: any;
}

const SimulationTextResults: React.FC<SimulationTextResultsProps> = ({ results }) => {
  if (!results) {
    return null;
  }

  const { state_vector, circuit } = results;

  return (
    <div className="bg-black/50 border border-cyan-500/20 p-6 rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-gray-100">Simulation Results</h2>

      <div className="text-gray-100">
        <h3 className="font-semibold">Circuit:</h3>
        <pre className="text-sm">{circuit}</pre>

        <h3 className="font-semibold mt-4">State Vector:</h3>
        <pre className="text-sm">
          {state_vector
            .map(
              (state: any) =>
                `State: ${state.binary}, Magnitude: ${state.magnitude.toFixed(4)}, Phase: ${state.phase.toFixed(
                  4
                )}, Probability: ${state.probability.toFixed(4)}`
            )
            .join('\n')}
        </pre>
      </div>
    </div>
  );
};

export default SimulationTextResults;
