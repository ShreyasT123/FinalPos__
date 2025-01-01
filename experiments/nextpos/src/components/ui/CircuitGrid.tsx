import React, { useState } from 'react';
import { Gate, GateDefinition } from '../../types/circuit';
import { CircuitCell } from './CircuitCell';
import { CircuitConnections } from './CircuitConnections';

interface CircuitGridProps {
  qubits: number;
  steps: number;
  circuit: Gate[];
  onGateAdd: (gate: Gate) => void;
}

export const CircuitGrid: React.FC<CircuitGridProps> = ({ qubits, steps, circuit, onGateAdd }) => {
  const [selectedCells, setSelectedCells] = useState<{ qubit: number; step: number }[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (qubit: number, step: number, e: React.DragEvent) => {
    e.preventDefault();
    const gateData = e.dataTransfer.getData('gate');
    const gate: GateDefinition = JSON.parse(gateData);
    
    if (gate.qubits === 1) {
      onGateAdd({
        type: gate.id,
        targets: [qubit],
        step,
        params: gate.defaultParams
      });
      setSelectedCells([]);
    } else if (selectedCells.length === 0) {
      setSelectedCells([{ qubit, step }]);
    } else if (selectedCells.length < gate.qubits - 1) {
      setSelectedCells([...selectedCells, { qubit, step }]);
    } else {
      const allCells = [...selectedCells, { qubit, step }];
      
      if (allCells.every(cell => cell.step === step)) {
        const controls = selectedCells.map(cell => cell.qubit);
        onGateAdd({
          type: gate.id,
          controls: gate.controlPoints ? controls : undefined,
          targets: [qubit],
          step,
          params: gate.defaultParams
        });
      }
      setSelectedCells([]);
    }
  };

  const getGateAtPosition = (qubit: number, step: number) => {
    return circuit.find(gate => 
      (gate.targets.includes(qubit) || gate.controls?.includes(qubit)) && 
      gate.step === step
    );
  };

  return (
    <div className="relative border border-gray-200 rounded-lg overflow-hidden">
      {Array.from({ length: qubits }).map((_, qubit) => (
        <div key={qubit} className="flex">
          <div className="w-20 bg-gray-50 flex items-center justify-center border-r border-b border-gray-200">
            <span className="text-sm font-medium text-gray-600">q[{qubit}]</span>
          </div>
          <div className="flex flex-1">
            {Array.from({ length: steps }).map((_, step) => (
              <CircuitCell
                key={step}
                qubit={qubit}
                step={step}
                gate={getGateAtPosition(qubit, step)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(qubit, step, e)}
                isSelected={selectedCells.some(cell => cell.qubit === qubit && cell.step === step)}
              />
            ))}
          </div>
        </div>
      ))}
      <CircuitConnections circuit={circuit} />
    </div>
  );
}