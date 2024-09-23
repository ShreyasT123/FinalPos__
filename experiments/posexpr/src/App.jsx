import { useState,  } from 'react';

import CircuitInput from './CircuitInput';
import PlotContainer from './PlotContainer';
import CircuitInfo from './CircuitInfo';

const App = () => {
  const [stateVector, setStateVector] = useState([]);
  const [circuitDiagram, setCircuitDiagram] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [probPlotData, setProbPlotData] = useState(null);
  const [phasePlotData, setPhasePlotData] = useState(null);

  const simulateCircuit = async (circuitJson) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/simulate_circuit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ circuit: circuitJson }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to simulate circuit');
      }

      const data = await response.json();
      setStateVector(data.state_vector);
      setCircuitDiagram(data.circuit);
      setProbPlotData(JSON.parse(data.prob_plot));
      setPhasePlotData(JSON.parse(data.phase_plot));
      setErrorMessage('');
    } catch (error) {
      console.error('Error simulating circuit:', error);
      setErrorMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="app-container">
      <div className="split-horizontal">
        <div className="info-container">
          <h2>Quantum Circuit Visualizer</h2>
          <div className="instructions">
            Enter your quantum circuit JSON in the text area below. Click `Simulate Circuit` to visualize the results on the 3D sphere and in the plots. The circuit diagram and state information will be displayed here.
          </div>
          <CircuitInput onSimulate={simulateCircuit} />
          <CircuitInfo
            circuitDiagram={circuitDiagram}
            stateVector={stateVector}
            errorMessage={errorMessage}
          />
        </div>
        <div className="visualization-container">
          <PlotContainer
            probPlotData={probPlotData}
            phasePlotData={phasePlotData}
          />
        </div>
        
      </div>
    </div>
  );
};



export default App;