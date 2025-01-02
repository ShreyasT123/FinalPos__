/* eslint-disable @typescript-eslint/no-explicit-any */
// Gate Types
export type GateType = 
  | 'h' | 'x' | 'cnot' | 'rz' | 'rx' | 'ry' 
  | 'swap' | 'ccx' | 'cz' | 'cy' | 'crz' | 'measure';

// Gate Parameters
export interface GateParams {
  angle?: number;
}

// Gate Definition (for palette)
export interface GateDefinition {
  id: GateType;
  name: string;
  icon: any;
  color: string;
  qubits: number;
  controlPoints?: number;
  description: string;
  defaultParams?: GateParams;
}

// Gate Instance (in circuit)
export interface Gate {
  type: GateType;
  targets: number[];
  controls?: number[];
  step: number;
  params?: GateParams;
}

// Circuit Data Types
export interface CircuitMetadata {
  name: string;
  description: string;
}

export interface CircuitLayout {
  type: string;
  dimensions: number[];
  qubits: {
    [key: string]: {
      position: number[];
    };
  };
}

export interface Operation {
  type: string;
  targets: string[];
  control?: string;
  angle?: number;
}

export interface CircuitData {
  circuit: {
    metadata: CircuitMetadata;
    layout: CircuitLayout;
    operations: Operation[];
  };
}