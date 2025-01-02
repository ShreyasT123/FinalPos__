import { Gate, CircuitData, Operation } from '../types/circuit';

export function transformCircuit(circuit: Gate[], qubits: number): CircuitData {
  // Create qubit layout
  const qubitLayout: { [key: string]: { position: number[] } } = {};
  for (let i = 0; i < qubits; i++) {
    qubitLayout[`q${i}`] = { position: [i] };
  }

  // Transform operations
  const operations = circuit.map((gate): Operation | null => {
    // Skip invalid gates
    if (!gate.targets || !gate.type) return null;

    const operation: Operation = {
      type: gate.type.toUpperCase(),
      targets: gate.targets.map(t => `q${t}`),
    };

    // Handle controlled gates
    if (gate.controls && gate.controls.length > 0) {
      operation.control = gate.controls.map(c => `q${c}`).join(',');
    }

    // Handle rotation gates
    if (gate.params?.angle !== undefined) {
      operation.angle = gate.params.angle;
    }

    return operation;
  }).filter((op): op is Operation => op !== null);

  return {
    circuit: {
      metadata: {
        name: "Quantum Circuit",
        description: "Generated quantum circuit with various quantum gates",
      },
      layout: {
        type: "linear",
        dimensions: [qubits],
        qubits: qubitLayout,
      },
      operations: operations,
    },
  };
}