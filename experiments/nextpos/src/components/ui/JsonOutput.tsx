// import React from 'react';
// import { Code } from 'lucide-react';
// import { transformCircuit } from '../utils/circuitTransformer';
// import axios from 'axios';

// interface JsonOutputProps {
//   circuit: any[];
//   qubits: number;
// }

// export const JsonOutput: React.FC<JsonOutputProps> = ({ circuit, qubits }) => {
//   const circuitData = transformCircuit(circuit, qubits);

//   async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
//     try {
//       const response = await axios.post('http://localhost:5000/simulate', {
//         circuit_data: JSON.stringify(circuitData)
//       });
//       console.log('Success:', response.data);
//     } catch (error) {
//       console.error('Error submitting circuit:', error);
//       // You might want to add error handling UI here
//     }
//   }

//   return (
//     <div className="bg-gray-900 rounded-lg p-4">
//       <div className="flex items-center justify-between mb-3">
//         <h3 className="text-white font-semibold flex items-center gap-2">
//           <Code className="w-5 h-5" />
//           Circuit JSON
//         </h3>
//       </div>
//       <pre className="text-green-400 text-sm overflow-x-auto">
//         {JSON.stringify(circuitData, null, 2)}
//       </pre>
//       <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// }
// import React, { useState } from 'react';
// import { Code } from 'lucide-react';
// import { transformCircuit } from '../../utils/circuitTransformer';
// import axios from 'axios';
// interface JsonOutputProps {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   circuit: any[];
//   qubits: number;
// }

// export const JsonOutput: React.FC<JsonOutputProps> = ({ circuit, qubits }) => {
//   const circuitData = transformCircuit(circuit, qubits);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post('http://localhost:5000/simulate', {
//         circuit_data: JSON.stringify(circuitData), // Send the circuitData object directly
//       });
//       console.log('Success:', response.data);
//     } catch (err) {
//       console.error('Error submitting circuit:', err);
//       if (axios.isAxiosError(err) && err.response) {
//         setError(`Error: ${err.response.status} - ${err.response.data.error || 'Unknown error'}`);
//       } else {
//         setError('Failed to submit the circuit. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="bg-gray-900 rounded-lg p-4">
//       <div className="flex items-center justify-between mb-3">
//         <h3 className="text-white font-semibold flex items-center gap-2">
//           <Code className="w-5 h-5" />
//           Circuit JSON
//         </h3>
//       </div>
//       <pre className="text-green-400 text-sm overflow-x-auto">
//         {JSON.stringify(circuitData, null, 2)}
//       </pre>
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded-md"
//         onClick={handleSubmit}
//         disabled={loading}
//       >
//         {loading ? 'Submitting...' : 'Submit'}
//       </button>
//       {error && <p className="text-red-500 mt-2">{error}</p>}
//     </div>
//   );
// };

import React, { useState } from 'react';
import { Code } from 'lucide-react';
import { transformCircuit } from '../../utils/circuitTransformer';
import axios from 'axios';

interface JsonOutputProps {
  circuit: any[];
  qubits: number;
  onSimulationResults: (results: any) => void;
}

export const JsonOutput: React.FC<JsonOutputProps> = ({ 
  circuit, 
  qubits, 
  onSimulationResults 
}) => {
  const circuitData = transformCircuit(circuit, qubits);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/simulate', {
        circuit_data: JSON.stringify(circuitData),
      });
      console.log('Success:', response.data);
      onSimulationResults(response.data);
    } catch (err) {
      console.error('Error submitting circuit:', err);
      if (axios.isAxiosError(err) && err.response) {
        setError(`Error: ${err.response.status} - ${err.response.data.error || 'Unknown error'}`);
      } else {
        setError('Failed to submit the circuit. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Code className="w-5 h-5" />
          Circuit JSON
        </h3>
      </div>
      <pre className="text-green-400 text-sm overflow-x-auto">
        {JSON.stringify(circuitData, null, 2)}
      </pre>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Simulating...' : 'Run Simulation'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};