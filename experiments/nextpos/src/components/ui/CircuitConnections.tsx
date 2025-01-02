// import React from 'react';
// import { Gate } from '../../types/circuit';

// interface CircuitConnectionsProps {
//   circuit: Gate[];
// }

// export const CircuitConnections: React.FC<CircuitConnectionsProps> = ({ circuit }) => {
//   const cellSize = 64; // matches the w-16 class
//   const leftOffset = 80; // matches the w-20 class

//   return (
//     <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
//       {circuit.map((gate, idx) => {
//         if (gate.type === 'cnot' && gate.controls && gate.targets) {
//           const control = gate.controls[0];
//           const target = gate.targets[0];
//           const step = gate.step;
          
//           const x = leftOffset + step * cellSize + cellSize / 2;
//           const y1 = control * cellSize + cellSize / 2;
//           const y2 = target * cellSize + cellSize / 2;

//           return (
//             <g key={idx}>
//               <line
//                 x1={x}
//                 y1={y1}
//                 x2={x}
//                 y2={y2}
//                 stroke="#9333ea"
//                 strokeWidth="2"
//               />
//               {/* Control point circle */}
//               <circle
//                 cx={x}
//                 cy={y1}
//                 r="4"
//                 fill="#9333ea"
//               />
//               {/* Target point circle */}
//               <circle
//                 cx={x}
//                 cy={y2}
//                 r="8"
//                 stroke="#9333ea"
//                 strokeWidth="2"
//                 fill="none"
//               />
//             </g>
//           );
//         }
//         return null;
//       })}
//     </svg>
//   );
// }
import React from 'react';
import { Gate } from '../../types/circuit';

interface CircuitConnectionsProps {
  circuit: Gate[];
}

export const CircuitConnections: React.FC<CircuitConnectionsProps> = ({ circuit }) => {
  const cellSize = 64; // matches the w-16 class
  const leftOffset = 80; // matches the w-20 class

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {circuit.map((gate, idx) => {
        if (gate.type === 'cnot' && gate.controls && gate.targets) {
          const control = gate.controls[0];
          const target = gate.targets[0];
          const step = gate.step;
          
          const x = leftOffset + step * cellSize + cellSize / 2;
          const y1 = control * cellSize + cellSize / 2;
          const y2 = target * cellSize + cellSize / 2;

          return (
            <g key={idx}>
              <line
                x1={x}
                y1={y1}
                x2={x}
                y2={y2}
                stroke="#9333ea"
                strokeWidth="2"
              />
              {/* Control point circle */}
              <circle
                cx={x}
                cy={y1}
                r="4"
                fill="#9333ea"
              />
              {/* Target point circle */}
              <circle
                cx={x}
                cy={y2}
                r="8"
                stroke="#9333ea"
                strokeWidth="2"
                fill="none"
              />
            </g>
          );
        }

        // Handle SWAP gates
        if (gate.type === 'swap' && gate.targets && gate.targets.length === 2) {
          const target1 = gate.targets[0];
          const target2 = gate.targets[1];
          const step = gate.step;
          
          const x = leftOffset + step * cellSize + cellSize / 2;
          const y1 = target1 * cellSize + cellSize / 2;
          const y2 = target2 * cellSize + cellSize / 2;

          return (
            <g key={idx}>
              <line
                x1={x}
                y1={y1}
                x2={x}
                y2={y2}
                stroke="#ea9333"
                strokeWidth="2"
                strokeDasharray="4,4" // Dash style to represent SWAP
              />
              <circle
                cx={x}
                cy={y1}
                r="6"
                fill="#ea9333"
              />
              <circle
                cx={x}
                cy={y2}
                r="6"
                fill="#ea9333"
              />
            </g>
          );
        }

        return null;
      })}
    </svg>
  );
};
