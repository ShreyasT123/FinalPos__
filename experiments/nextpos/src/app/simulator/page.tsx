'use client'
import React, { useState } from 'react';
import { CircuitGrid } from '../../components/ui/CircuitGrid';
import { GatesPalette } from '../../components/ui/GatesPalette';
import { JsonOutput } from '../../components/ui/JsonOutput';
import { Terminal } from 'lucide-react';
import { Gate } from '../../types/circuit';
import SimulationResults from '../../components/ui/SimulationResults';
import SimulationTextResults from '../../components/ui/SimulationTextResults';

export default function Altersim() {
  const [circuit, setCircuit] = useState<Gate[]>([]);
  const [qubits, setQubits] = useState(3);
  const [steps, setSteps] = useState(8);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [simResults, setSimResults] = useState<any>(null);

  const handleGateAdd = (newGate: Gate) => {
    setCircuit([...circuit, newGate]);
  };

  const handleStepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(10, Math.max(1, parseInt(e.target.value)));
    setSteps(value);
    setCircuit([]); // Reset circuit when changing steps
  };

  const handleQubitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value));
    setQubits(value);
    setCircuit([]); // Reset circuit when changing qubits
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSimulationResults = (results: any) => {
    setSimResults(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900">
      <header className="bg-black/50 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <Terminal className="w-8 h-8 text-cyan-400" />
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Quantum Circuit Composer
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-1">
            <GatesPalette />
          </div>

          <div className="col-span-3 space-y-6">
            <div className="bg-black/50 border border-cyan-500/20 p-6 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-100">Circuit Design</h2>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <label className="text-gray-300 text-sm">Qubits:</label>
                    <input
                      type="number"
                      min="1"
                      value={qubits}
                      onChange={handleQubitsChange}
                      className="w-16 px-2 py-1 bg-black/30 border border-cyan-500/20 rounded text-gray-100"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-gray-300 text-sm">Steps:</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={steps}
                      onChange={handleStepsChange}
                      className="w-16 px-2 py-1 bg-black/30 border border-cyan-500/20 rounded text-gray-100"
                    />
                  </div>
                </div>
              </div>
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
              <>
                <SimulationResults 
                  probPlotData={simResults.prob_plot} 
                  phasePlotData={simResults.phase_plot} 
                />
                <SimulationTextResults results={simResults} />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
