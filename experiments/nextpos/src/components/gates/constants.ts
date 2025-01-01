import { Hash, Square, Combine, RotateCw, Plus, X as XIcon, Circle, ArrowDown, Sigma, Box } from 'lucide-react';
import { GateDefinition } from '../../types/circuit';

export const gateIcons = {
  h: Hash,
  x: Square,
  cnot: Combine,
  rz: RotateCw,
  swap: Plus,
  ccx: XIcon, // Toffoli
  cz: Circle,
  cy: ArrowDown,
  crz: Sigma,
  measure: Box,
} as const;

export const gates: GateDefinition[] = [
  // Single-qubit gates
  { id: 'h', name: 'H', icon: gateIcons.h, color: 'blue', qubits: 1, description: 'Hadamard' },
  { id: 'x', name: 'X', icon: gateIcons.x, color: 'red', qubits: 1, description: 'Pauli-X' },
  { id: 'rz', name: 'RZ', icon: gateIcons.rz, color: 'green', qubits: 1, description: 'Phase Rotation' },
  
  // Two-qubit gates
  { 
    id: 'cnot', 
    name: 'CNOT', 
    icon: gateIcons.cnot, 
    color: 'purple', 
    qubits: 2, 
    controlPoints: 1,
    description: 'Controlled-NOT'
  },
  { 
    id: 'swap', 
    name: 'SWAP', 
    icon: gateIcons.swap, 
    color: 'orange', 
    qubits: 2,
    description: 'Swap Qubits'
  },
  { 
    id: 'cz', 
    name: 'CZ', 
    icon: gateIcons.cz, 
    color: 'indigo', 
    qubits: 2, 
    controlPoints: 1,
    description: 'Controlled-Z'
  },
  { 
    id: 'cy', 
    name: 'CY', 
    icon: gateIcons.cy, 
    color: 'pink', 
    qubits: 2, 
    controlPoints: 1,
    description: 'Controlled-Y'
  },
  { 
    id: 'crz', 
    name: 'CRZ', 
    icon: gateIcons.crz, 
    color: 'teal', 
    qubits: 2, 
    controlPoints: 1,
    description: 'Controlled-RZ'
  },
  
  // Three-qubit gates
  { 
    id: 'ccx', 
    name: 'CCX', 
    icon: gateIcons.ccx, 
    color: 'amber', 
    qubits: 3, 
    controlPoints: 2,
    description: 'Toffoli'
  },
  
  // Measurement
  { 
    id: 'measure', 
    name: 'Measure', 
    icon: gateIcons.measure, 
    color: 'gray', 
    qubits: 1,
    description: 'Measurement'
  },
];