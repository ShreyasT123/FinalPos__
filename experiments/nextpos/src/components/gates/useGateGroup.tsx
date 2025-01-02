import { useMemo } from 'react';
import { GateDefinition } from '../../types/circuit';
import { gates } from './constants';

export const useGateGroups = () => {
  return useMemo(() => {
    return gates.reduce((acc, gate) => {
      const key = gate.qubits === 1 ? 'single' : 
                 gate.qubits === 2 ? 'two' : 'three';
      if (!acc[key]) acc[key] = [];
      acc[key].push(gate);
      return acc;
    }, {} as Record<string, GateDefinition[]>);
  }, []);
};