/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Code, GripVertical } from 'lucide-react';
import { transformCircuit } from '../../utils/circuitTransformer';
import { Button } from "./button";

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
      const response = await fetch('http://localhost:8000/superpos/simulate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          circuit_data: JSON.stringify(circuitData),
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${await response.text()}`);
      }

      const data = await response.json();
      console.log('Success:', data);
      onSimulationResults(data);
    } catch (err) {
      console.error('Error submitting circuit:', err);
      if (err instanceof Error) {
        setError(err.message);
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
        <Button
          onClick={handleSubmit}
          disabled={loading}
          variant="default"
        >
          {loading ? 'Simulating...' : 'Run Simulation'}
        </Button>
      </div>
      <div className="relative">
        <div 
          className="resize-y overflow-auto min-h-[100px] max-h-[500px] border border-gray-700 rounded"
        >
          <pre className="text-green-400 text-sm p-2">
            {JSON.stringify(circuitData, null, 2)}
          </pre>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 cursor-ns-resize text-gray-500 hover:text-gray-400">
          <GripVertical className="w-4 h-4" />
        </div>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};
