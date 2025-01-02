import React from 'react';
import { GateDefinition } from '../../types/circuit';

interface GateButtonProps {
  gate: GateDefinition;
  onDragStart: (e: React.DragEvent, gate: GateDefinition) => void;
}

export const GateButton: React.FC<GateButtonProps> = ({ gate, onDragStart }) => {
  const Icon = gate.icon;
  
  const colorMap = {
    blue: 'border-cyan-500/20 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400',
    red: 'border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-400',
    green: 'border-green-500/20 bg-green-500/10 hover:bg-green-500/20 text-green-400',
    purple: 'border-purple-500/20 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400',
    orange: 'border-orange-500/20 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400',
    indigo: 'border-indigo-500/20 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400',
    pink: 'border-pink-500/20 bg-pink-500/10 hover:bg-pink-500/20 text-pink-400',
    teal: 'border-teal-500/20 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400',
    amber: 'border-amber-500/20 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400',
    gray: 'border-gray-500/20 bg-gray-500/10 hover:bg-gray-500/20 text-gray-400',
  };

  const colorClasses = colorMap[gate.color] || colorMap.gray;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, gate)}
      className={`p-3 rounded-lg border transition-colors group relative ${colorClasses}`}
      title={gate.description}
    >
      <div className="flex items-center space-x-2">
        <Icon className="w-5 h-5" />
        <span className="text-sm font-medium">{gate.name}</span>
      </div>
      
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-gray-100 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-cyan-500/20">
        {gate.description}
      </div>
    </div>
  );
};