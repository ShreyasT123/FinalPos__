export interface Gate {
  type: string;
  controls?: number[];
  targets: number[];
  step: number;
  params?: {
    angle?: number;
  };
}

export interface GateDefinition {
  id: string;
  name: string;
  icon: any;
  color: string;
  qubits: number;
  controlPoints?: number;
  description: string;
  defaultParams?: {
    angle?: number;
  };
}