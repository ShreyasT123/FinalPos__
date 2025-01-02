import React, { useState } from 'react';
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
  const [isDragOver, setIsDragOver] = useState(false);

  const getGateIcon = () => {
    if (!gate) {
      return (
        <div className="flex flex-col items-center text-gray-400">
          <Move className="w-6 h-6" />
          <span className="text-xs">Drag here</span>
        </div>
      );
    }

    const Icon = gateIcons[gate.type as keyof typeof gateIcons];
    if (gate.type === 'cnot') {
      return null; // Connections are handled by CircuitConnections component
    }
    return <Icon className="w-6 h-6 text-blue-600" />;
  };

  return (
    <div
      className={`w-16 h-16 border-r border-b border-gray-200 flex items-center justify-center ${
        isSelected ? 'bg-blue-50' : isDragOver ? 'bg-gray-100' : ''
      }`}
      onDragOver={(e) => {
        onDragOver(e);
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={(e) => {
        onDrop(e);
        setIsDragOver(false);
      }}
    >
      <div className="w-12 h-12 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
        {getGateIcon()}
      </div>
    </div>
  );
};
