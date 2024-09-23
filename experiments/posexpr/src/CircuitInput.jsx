import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const CircuitInput = ({ onSimulate }) => {
  const [circuitJson, setCircuitJson] = useState(`{
    "circuit": {
      "metadata": {
        "name": "Complex Quantum Circuit Example",
        "description": "A quantum circuit demonstrating various gates including single-qubit, multi-qubit, and rotation gates"
      },
      "layout": {
        "type": "linear",
        "dimensions": [3],
        "qubits": {
          "q0": {"position": [0]},
          "q1": {"position": [1]},
          "q2": {"position": [2]}
        }
      },
      "operations": [
        {
          "type": "H",
          "targets": ["q0"]
        },
        {
          "type": "X",
          "targets": ["q1"]
        },
        {
          "type": "Y",
          "targets": ["q2"]
        },
        {
          "type": "CNOT",
          "control": "q0",
          "targets": ["q1"]
        },
        {
          "type": "SWAP",
          "targets": ["q1", "q2"]
        },
        {
          "type": "RX",
          "targets": ["q0"],
          "angle": 1.5707963267948966
        },
        {
          "type": "RY",
          "targets": ["q1"],
          "angle": 0.7853981633974483
        },
        {
          "type": "RZ",
          "targets": ["q2"],
          "angle": 3.141592653589793
        },
        {
          "type": "Z",
          "targets": ["q0"]
        },
        {
          "type": "CNOT",
          "control": "q2",
          "targets": ["q0"]
        }
      ]
    }
}`);

  const handleSimulate = () => {
    onSimulate(circuitJson);
  };
  

  return (
    <div>
      <h2>Circuit JSON</h2>
      <textarea
        value={circuitJson}
        onChange={(e) => setCircuitJson(e.target.value)}
        placeholder="Enter your quantum circuit JSON here..."
      />
        

      
   
      <button onClick={handleSimulate}>Simulate Circuit</button>
    </div>
  );
};

export default CircuitInput;