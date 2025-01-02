// // import React, { useState } from 'react';
// // import { GateDefinition } from '../../types/circuit';
// // import { gates } from '../gates/constants';

// // export const GatesPalette: React.FC = () => {
// //   const [angle, setAngle] = useState<number>(0);

// //   const handleAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setAngle(Number(e.target.value));
// //   };

// //   const handleDragStart = (e: React.DragEvent, gate: GateDefinition) => {
// //     // If the gate is RZ, RX, or RY, include the angle
// //     if (gate.id === 'rz' || gate.id === 'rx' || gate.id === 'ry') {
// //       if (angle === 0) {
// //         alert('Please specify an angle for the gate');
// //         e.preventDefault();
// //         return;
// //       }
// //       gate.defaultParams = { angle };  // Set the angle to the gate's parameters
// //     }
// //     e.dataTransfer.setData('gate', JSON.stringify(gate)); // Dragging the gate
// //   };

// //   // Group gates by number of qubits
// //   const groupedGates = gates.reduce((acc, gate) => {
// //     const key = gate.qubits === 1 ? 'single' : 
// //                gate.qubits === 2 ? 'two' : 'three';
// //     if (!acc[key]) acc[key] = [];
// //     acc[key].push(gate);
// //     return acc;
// //   }, {} as Record<string, GateDefinition[]>);

// //   return (
// //     <div className="p-4 bg-black/50 border border-cyan-500/20 rounded-lg">
// //       <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
// //         Quantum Gates
// //       </h3>
      
// //       {/* Input for specifying angle */}
// //       <div className="mb-6">
// //         <input
// //           type="number"
// //           value={angle}
// //           onChange={handleAngleChange}
// //           placeholder="Angle (in radians)"
// //           className="mb-4 p-2 border border-cyan-500/20 rounded-lg bg-black/50 text-gray-300"
// //         />
// //       </div>

// //       <div className="mb-6">
// //         <h4 className="text-sm font-medium text-gray-300 mb-2">Single-Qubit Gates</h4>
// //         <div className="grid grid-cols-2 gap-3">
// //           {groupedGates.single?.map((gate) => (
// //             <GateButton key={gate.id} gate={gate} onDragStart={handleDragStart} />
// //           ))}
// //         </div>
// //       </div>

// //       <div className="mb-6">
// //         <h4 className="text-sm font-medium text-gray-300 mb-2">Two-Qubit Gates</h4>
// //         <div className="grid grid-cols-2 gap-3">
// //           {groupedGates.two?.map((gate) => (
// //             <GateButton key={gate.id} gate={gate} onDragStart={handleDragStart} />
// //           ))}
// //         </div>
// //       </div>

// //       <div className="mb-6">
// //         <h4 className="text-sm font-medium text-gray-300 mb-2">Three-Qubit Gates</h4>
// //         <div className="grid grid-cols-2 gap-3">
// //           {groupedGates.three?.map((gate) => (
// //             <GateButton key={gate.id} gate={gate} onDragStart={handleDragStart} />
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// import React, { useState } from 'react';
// import { GateDefinition } from '../../types/circuit';
// import { gates } from '../gates/constants';

// export const GatesPalette: React.FC = () => {
//   const [angle, setAngle] = useState<number>(0);

//   const handleAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setAngle(Number(e.target.value));
//   };

//   const handleDragStart = (e: React.DragEvent, gate: GateDefinition) => {
//     // Add CRZ to the list of gates that require angles
//     if (gate.id === 'rz' || gate.id === 'rx' || gate.id === 'ry' || gate.id === 'crz') {
//       if (angle === 0) {
//         alert('Please specify an angle for the gate');
//         e.preventDefault();
//         return;
//       }
//       gate.defaultParams = { angle };
//     }
//     e.dataTransfer.setData('gate', JSON.stringify(gate));
//   };

//   // Group gates by number of qubits
//   const groupedGates = gates.reduce((acc, gate) => {
//     const key = gate.qubits === 1 ? 'single' : 
//                gate.qubits === 2 ? 'two' : 'three';
//     if (!acc[key]) acc[key] = [];
//     acc[key].push(gate);
//     return acc;
//   }, {} as Record<string, GateDefinition[]>);

//   return (
//     <div className="p-4 bg-black/50 border border-cyan-500/20 rounded-lg">
//       <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
//         Quantum Gates
//       </h3>
      
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-300 mb-2">
//           Rotation Angle (radians)
//         </label>
//         <input
//           type="number"
//           value={angle}
//           onChange={handleAngleChange}
//           step="0.1"
//           className="w-full p-2 border border-cyan-500/20 rounded-lg bg-black/50 text-gray-300"
//         />
//       </div>

//       <div className="mb-6">
//         <h4 className="text-sm font-medium text-gray-300 mb-2">Single-Qubit Gates</h4>
//         <div className="grid grid-cols-2 gap-3">
//           {groupedGates.single?.map((gate) => (
//             <GateButton key={gate.id} gate={gate} onDragStart={handleDragStart} />
//           ))}
//         </div>
//       </div>

//       <div className="mb-6">
//         <h4 className="text-sm font-medium text-gray-300 mb-2">Two-Qubit Gates</h4>
//         <div className="grid grid-cols-2 gap-3">
//           {groupedGates.two?.map((gate) => (
//             <GateButton key={gate.id} gate={gate} onDragStart={handleDragStart} />
//           ))}
//         </div>
//       </div>

//       <div className="mb-6">
//         <h4 className="text-sm font-medium text-gray-300 mb-2">Three-Qubit Gates</h4>
//         <div className="grid grid-cols-2 gap-3">
//           {groupedGates.three?.map((gate) => (
//             <GateButton key={gate.id} gate={gate} onDragStart={handleDragStart} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// interface GateButtonProps {
//   gate: GateDefinition;
//   onDragStart: (e: React.DragEvent, gate: GateDefinition) => void;
// }


// const GateButton: React.FC<GateButtonProps> = ({ gate, onDragStart }) => {
//   const Icon = gate.icon;
  
// const colorMap = {
//   blue: 'border-cyan-500/20 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400',
//   red: 'border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-400',
//   green: 'border-green-500/20 bg-green-500/10 hover:bg-green-500/20 text-green-400',
//   purple: 'border-purple-500/20 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400',
//   orange: 'border-orange-500/20 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400',
//   indigo: 'border-indigo-500/20 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400',
//   pink: 'border-pink-500/20 bg-pink-500/10 hover:bg-pink-500/20 text-pink-400',
//   teal: 'border-teal-500/20 bg-teal-500/10 hover:bg-teal-500/20 text-teal-400',
//   amber: 'border-amber-500/20 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400',
//   gray: 'border-gray-500/20 bg-gray-500/10 hover:bg-gray-500/20 text-gray-400',
// };

// const colorClasses = colorMap[gate.color] || colorMap.gray;

// return (
//   <div
//     draggable
//     onDragStart={(e) => onDragStart(e, gate)}
//     className={`p-3 rounded-lg border transition-colors group relative ${colorClasses}`}
//     title={gate.description}
//   >
//     <div className="flex items-center space-x-2">
//       <Icon className="w-5 h-5" />
//       <span className="text-sm font-medium">{gate.name}</span>
//     </div>
    
//     <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-gray-100 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-cyan-500/20">
//       {gate.description}
//     </div>
//   </div>
// );
// }
import React, { useState } from 'react';
import { GateDefinition } from '../../types/circuit';
import { AngleInput } from '../gates/AngleInput';
import { GateGroup } from '../gates/GateGroup';
import { useGateGroups } from '../gates/useGateGroup';

export const GatesPalette: React.FC = () => {
  const [angle, setAngle] = useState<number>(0);
  const groupedGates = useGateGroups();

  const handleAngleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAngle(Number(e.target.value));
  };

  const handleDragStart = (e: React.DragEvent, gate: GateDefinition) => {
    if (gate.id === 'rz' || gate.id === 'rx' || gate.id === 'ry' || gate.id === 'crz') {
      if (angle === 0) {
        alert('Please specify an angle for the gate');
        e.preventDefault();
        return;
      }
      gate.defaultParams = { angle };
    }
    e.dataTransfer.setData('gate', JSON.stringify(gate));
  };

  return (
    <div className="p-4 bg-black/50 border border-cyan-500/20 rounded-lg">
      <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-500">
        Quantum Gates
      </h3>

      {/* Angle Input */}
      <AngleInput angle={angle} onChange={handleAngleChange} />

      {/* Gate Groups */}
      {Object.keys(groupedGates).map((key) => (
        <GateGroup
          key={key}
          title={key.charAt(0).toUpperCase() + key.slice(1)} // Capitalize first letter
          gates={groupedGates[key]}
          onDragStart={handleDragStart}
        />
      ))}
    </div>
  );
};
