import React from 'react';
import { Move } from 'lucide-react';
import { Gate } from '../../types/circuit';
import { gateIcons } from '../gates/constants';

interface CircuitCellProps {
  qubit: number;
  step: number;
  gate: Gate | undefined;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  isSelected: boolean;
}

export const CircuitCell: React.FC<CircuitCellProps> = ({
  gate,
  onDragOver,
  onDrop,
  isSelected,
}) => {
  const getGateIcon = () => {
    if (!gate) return <Move className="w-6 h-6 text-gray-400" />;
    
    const Icon = gateIcons[gate.type as keyof typeof gateIcons];
    if (gate.type === 'cnot') {
      return null; // Connections are handled by CircuitConnections component
    }
    return <Icon className="w-6 h-6 text-blue-600" />;
  };

  return (
    <div
      className={`w-16 h-16 border-r border-b border-gray-200 flex items-center justify-center ${
        isSelected ? 'bg-blue-50' : ''
      }`}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="w-12 h-12 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
        {getGateIcon()}
      </div>
    </div>
  );
}