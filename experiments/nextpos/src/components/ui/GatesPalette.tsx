import React from 'react';
import { GateDefinition } from '../../types/circuit';
import { gates } from '../gates/constants';

export const GatesPalette: React.FC = () => {
  const handleDragStart = (e: React.DragEvent, gate: GateDefinition) => {
    e.dataTransfer.setData('gate', JSON.stringify(gate));
  };

  // Group gates by number of qubits
  const groupedGates = gates.reduce((acc, gate) => {
    const key = gate.qubits === 1 ? 'single' : 
               gate.qubits === 2 ? 'two' : 'three';
    if (!acc[key]) acc[key] = [];
    acc[key].push(gate);
    return acc;
  }, {} as Record<string, GateDefinition[]>);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Quantum Gates</h3>
      
      {/* Single-qubit gates */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-600 mb-2">Single-Qubit Gates</h4>
        <div className="grid grid-cols-2 gap-3">
          {groupedGates.single?.map((gate) => (
            <GateButton key={gate.id} gate={gate} onDragStart={handleDragStart} />
          ))}
        </div>
      </div>

      {/* Two-qubit gates */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-600 mb-2">Two-Qubit Gates</h4>
        <div className="grid grid-cols-2 gap-3">
          {groupedGates.two?.map((gate) => (
            <GateButton key={gate.id} gate={gate} onDragStart={handleDragStart} />
          ))}
        </div>
      </div>

      {/* Three-qubit gates */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-600 mb-2">Three-Qubit Gates</h4>
        <div className="grid grid-cols-2 gap-3">
          {groupedGates.three?.map((gate) => (
            <GateButton key={gate.id} gate={gate} onDragStart={handleDragStart} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface GateButtonProps {
  gate: GateDefinition;
  onDragStart: (e: React.DragEvent, gate: GateDefinition) => void;
}


const GateButton: React.FC<GateButtonProps> = ({ gate, onDragStart }) => {
  const Icon = gate.icon;
  
  // Create a mapping of color names to their actual Tailwind classes
  const colorMap = {
    blue: 'border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-600',
    red: 'border-red-200 bg-red-50 hover:bg-red-100 text-red-600',
    green: 'border-green-200 bg-green-50 hover:bg-green-100 text-green-600',
    purple: 'border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-600',
    orange: 'border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-600',
    indigo: 'border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-600',
    pink: 'border-pink-200 bg-pink-50 hover:bg-pink-100 text-pink-600',
    teal: 'border-teal-200 bg-teal-50 hover:bg-teal-100 text-teal-600',
    amber: 'border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-600',
    gray: 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-600',
  };

  const colorClasses = colorMap[gate.color] || colorMap.gray;
  
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, gate)}
      className={`p-3 rounded-lg border-2 cursor-move transition-colors group relative ${colorClasses}`}
      title={gate.description}
    >
      <div className="flex items-center space-x-2">
        <Icon className="w-5 h-5" />
        <span className="text-sm font-medium">{gate.name}</span>
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        {gate.description}
      </div>
    </div>
  );
};