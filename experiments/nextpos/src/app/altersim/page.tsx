// "use client"
// import React, { useState } from 'react';
// import { CircuitGrid } from '../../components/ui/CircuitGrid';
// import { GatesPalette } from '../../components/ui/GatesPalette';
// import { JsonOutput } from '../../components/ui/JsonOutput';
// import { Terminal } from 'lucide-react';
// import { Gate } from '../../types/circuit';


// export default function Altersim() {
//     const [circuit, setCircuit] = useState<Gate[]>([]);
//     const [qubits] = useState(3);
//     const [steps] = useState(8);
  
//     const handleGateAdd = (newGate: Gate) => {
//       setCircuit([...circuit, newGate]);
//     };
  
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <header className="bg-white shadow-sm">
//           <div className="max-w-7xl mx-auto px-4 py-4">
//             <div className="flex items-center space-x-2">
//               <Terminal className="w-8 h-8 text-indigo-600" />
//               <h1 className="text-2xl font-bold text-gray-900">Quantum Circuit Composer</h1>
//             </div>
//           </div>
//         </header>
  
//         <main className="max-w-7xl mx-auto px-4 py-8">
//           <div className="grid grid-cols-4 gap-8">
//             <div className="col-span-1">
//               <GatesPalette />
//             </div>
            
//             <div className="col-span-3 space-y-6">
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-lg font-semibold mb-4">Circuit Design</h2>
//                 <CircuitGrid
//                   qubits={qubits}
//                   steps={steps}
//                   circuit={circuit}
//                   onGateAdd={handleGateAdd}
//                 />
//               </div>
  
//               <JsonOutput circuit={circuit} qubits={qubits} />
//             </div>
//           </div>
//         </main>
//       </div>
//     );
//   }
"use client"
import React, { useState } from 'react';
import { CircuitGrid } from '../../components/ui/CircuitGrid';
import { GatesPalette } from '../../components/ui/GatesPalette';
import { JsonOutput } from '../../components/ui/JsonOutput';
import { Terminal } from 'lucide-react';
import { Gate } from '../../types/circuit';
import SimulationResults from '../../components/ui/SimulationResults';

export default function Altersim() {
    const [circuit, setCircuit] = useState<Gate[]>([]);
    const [qubits] = useState(3);
    const [steps] = useState(8);
    const [simResults, setSimResults] = useState(null);
  
    const handleGateAdd = (newGate: Gate) => {
      setCircuit([...circuit, newGate]);
    };

    const handleSimulationResults = (results) => {
      setSimResults(results);
    };
  
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-2">
              <Terminal className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">Quantum Circuit Composer</h1>
            </div>
          </div>
        </header>
  
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-4 gap-8">
            <div className="col-span-1">
              <GatesPalette />
            </div>
            
            <div className="col-span-3 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Circuit Design</h2>
                <CircuitGrid
                  qubits={qubits}
                  steps={steps}
                  circuit={circuit}
                  onGateAdd={handleGateAdd}
                />
              </div>
  
              <JsonOutput 
                circuit={circuit} 
                qubits={qubits}
                onSimulationResults={handleSimulationResults} 
              />

              {simResults && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold mb-4">Simulation Results</h2>
                  <SimulationResults simResults={simResults} />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }