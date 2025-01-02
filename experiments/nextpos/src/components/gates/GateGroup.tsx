import React from 'react';
import { GateDefinition } from '../../types/circuit';
import { GateButton } from './GateButton';

interface GateGroupProps {
  title: string;
  gates: GateDefinition[];
  onDragStart: (e: React.DragEvent, gate: GateDefinition) => void;
}

export const GateGroup: React.FC<GateGroupProps> = ({ title, gates, onDragStart }) => (
  <div className="mb-6">
    <h4 className="text-sm font-medium text-gray-300 mb-2">{title}</h4>
    <div className="grid grid-cols-2 gap-3">
      {gates.map((gate) => (
        <GateButton key={gate.id} gate={gate} onDragStart={onDragStart} />
      ))}
    </div>
  </div>
);