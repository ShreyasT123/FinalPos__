// import { Hash, Square, Combine, RotateCw, Plus, X as XIcon, Circle, ArrowDown, Sigma, Box } from 'lucide-react';
// import { GateDefinition } from '../../types/circuit';

// export const gateIcons = {
//   h: Hash,
//   x: Square,
//   cnot: Combine,
//   rz: RotateCw,
//   swap: Plus,
//   ccx: XIcon, // Toffoli
//   cz: Circle,
//   cy: ArrowDown,
//   crz: Sigma,
//   measure: Box,
// } as const;

// export const gates: GateDefinition[] = [
//   // Single-qubit gates
//   { id: 'h', name: 'H', icon: gateIcons.h, color: 'blue', qubits: 1, description: 'Hadamard' },
//   { id: 'x', name: 'X', icon: gateIcons.x, color: 'red', qubits: 1, description: 'Pauli-X' },
//   { id: 'rz', name: 'RZ', icon: gateIcons.rz, color: 'green', qubits: 1, description: 'Phase Rotation' },
  
//   // Two-qubit gates
//   { 
//     id: 'cnot', 
//     name: 'CNOT', 
//     icon: gateIcons.cnot, 
//     color: 'purple', 
//     qubits: 2, 
//     controlPoints: 1,
//     description: 'Controlled-NOT'
//   },
//   { 
//     id: 'swap', 
//     name: 'SWAP', 
//     icon: gateIcons.swap, 
//     color: 'orange', 
//     qubits: 2,
//     description: 'Swap Qubits'
//   },
//   { 
//     id: 'cz', 
//     name: 'CZ', 
//     icon: gateIcons.cz, 
//     color: 'indigo', 
//     qubits: 2, 
//     controlPoints: 1,
//     description: 'Controlled-Z'
//   },
//   { 
//     id: 'cy', 
//     name: 'CY', 
//     icon: gateIcons.cy, 
//     color: 'pink', 
//     qubits: 2, 
//     controlPoints: 1,
//     description: 'Controlled-Y'
//   },
//   { 
//     id: 'crz', 
//     name: 'CRZ', 
//     icon: gateIcons.crz, 
//     color: 'teal', 
//     qubits: 2, 
//     controlPoints: 1,
//     description: 'Controlled-RZ'
//   },
  
//   // Three-qubit gates
//   { 
//     id: 'ccx', 
//     name: 'CCX', 
//     icon: gateIcons.ccx, 
//     color: 'amber', 
//     qubits: 3, 
//     controlPoints: 2,
//     description: 'Toffoli'
//   },
  
//   // Measurement
//   { 
//     id: 'measure', 
//     name: 'Measure', 
//     icon: gateIcons.measure, 
//     color: 'gray', 
//     qubits: 1,
//     description: 'Measurement'
//   },
// ];
import { Hash, Square, Combine, RotateCw, RotateCcw, Rotate3d, X as XIcon, Circle, ArrowDown, Sigma, Box,Plus } from 'lucide-react';
import { GateDefinition } from '../../types/circuit';

// GateType Enum for strong typing
export enum GateType {
  Hadamard = 'h',
  PauliX = 'x',
  CNOT = 'cnot',
  PhaseRotation = 'rz',
  RotationX = 'rx',
  RotationY = 'ry',
  Swap = 'swap',
  Toffoli = 'ccx',
  ControlledZ = 'cz',
  ControlledY = 'cy',
  ControlledRZ = 'crz',
  Measurement = 'measure',
}

// Centralized color palette
const gateColors = {
  blue: 'blue',
  red: 'red',
  green: 'green',
  cyan: 'cyan',
  magenta: 'magenta',
  purple: 'purple',
  orange: 'orange',
  indigo: 'indigo',
  pink: 'pink',
  teal: 'teal',
  amber: 'amber',
  gray: 'gray',
};

// Gate Icons
export const gateIcons = {
  [GateType.Hadamard]: Hash,
  [GateType.PauliX]: Square,
  [GateType.CNOT]: Combine,
  [GateType.PhaseRotation]: RotateCw,
  [GateType.RotationX]: RotateCcw,
  [GateType.RotationY]: Rotate3d,
  [GateType.Swap]: Plus,
  [GateType.Toffoli]: XIcon,
  [GateType.ControlledZ]: Circle,
  [GateType.ControlledY]: ArrowDown,
  [GateType.ControlledRZ]: Sigma,
  [GateType.Measurement]: Box,
} as const;

// Gate Definitions
export const gates: GateDefinition[] = [
  { id: GateType.Hadamard, name: 'H', icon: gateIcons[GateType.Hadamard], color: gateColors.blue, qubits: 1, description: 'Hadamard Gate: Creates superposition.' },
  { id: GateType.PauliX, name: 'X', icon: gateIcons[GateType.PauliX], color: gateColors.red, qubits: 1, description: 'Pauli-X Gate: Acts like a NOT gate.' },
  { id: GateType.PhaseRotation, name: 'RZ', icon: gateIcons[GateType.PhaseRotation], color: gateColors.green, qubits: 1, description: 'Phase Rotation Gate: Rotates qubit state around Z-axis.' },
  { id: GateType.RotationX, name: 'RX', icon: gateIcons[GateType.RotationX], color: gateColors.cyan, qubits: 1, description: 'RX Gate: Rotates qubit state around X-axis.' },
  { id: GateType.RotationY, name: 'RY', icon: gateIcons[GateType.RotationY], color: gateColors.magenta, qubits: 1, description: 'RY Gate: Rotates qubit state around Y-axis.' },
  { id: GateType.CNOT, name: 'CNOT', icon: gateIcons[GateType.CNOT], color: gateColors.purple, qubits: 2, controlPoints: 1, description: 'Controlled-NOT Gate.' },
  { id: GateType.Swap, name: 'SWAP', icon: gateIcons[GateType.Swap], color: gateColors.orange, qubits: 2, description: 'Swaps states of two qubits.' },
  { id: GateType.ControlledZ, name: 'CZ', icon: gateIcons[GateType.ControlledZ], color: gateColors.indigo, qubits: 2, controlPoints: 1, description: 'Controlled-Z Gate.' },
  { id: GateType.ControlledY, name: 'CY', icon: gateIcons[GateType.ControlledY], color: gateColors.pink, qubits: 2, controlPoints: 1, description: 'Controlled-Y Gate.' },
  { id: GateType.ControlledRZ, name: 'CRZ', icon: gateIcons[GateType.ControlledRZ], color: gateColors.teal, qubits: 2, controlPoints: 1, description: 'Controlled-RZ Gate.' },
  { id: GateType.Toffoli, name: 'CCX', icon: gateIcons[GateType.Toffoli], color: gateColors.amber, qubits: 3, controlPoints: 2, description: 'Toffoli Gate: Controlled-Controlled-NOT.' },
  { id: GateType.Measurement, name: 'Measure', icon: gateIcons[GateType.Measurement], color: gateColors.gray, qubits: 1, description: 'Measures qubit state.' },
];
