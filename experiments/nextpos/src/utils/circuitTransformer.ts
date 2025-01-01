interface CircuitMetadata {
  name: string;
  description: string;
}

interface CircuitLayout {
  type: string;
  dimensions: number[];
  qubits: {
    [key: string]: {
      position: number[];
    };
  };
}

interface Operation {
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

export function transformCircuit(circuit: any[], qubits: number): CircuitData {
  // Create qubit layout
  const qubitLayout: { [key: string]: { position: number[] } } = {};
  for (let i = 0; i < qubits; i++) {
    qubitLayout[`q${i}`] = { position: [i] };
  }

  // Transform operations
  const operations = circuit.map(gate => {
    const operation: Operation = {
      type: gate.type.toUpperCase(),
      targets: gate.targets.map((t: number) => `q${t}`)
    };

    // Handle controlled gates (CNOT, CZ, etc.)
    if (gate.controls && gate.controls.length > 0) {
      // For multi-controlled gates, use the last control as the main control
      operation.control = `q${gate.controls[gate.controls.length - 1]}`;
    }

    // Handle rotation gates (RX, RY, RZ)
    if (gate.type.startsWith('r') && gate.params?.angle !== undefined) {
      operation.angle = gate.params.angle;
    }

    // Handle SWAP gates
    if (gate.type === 'swap') {
      operation.targets = gate.targets.map((t: number) => `q${t}`);
    }

    return operation;
  });

  return {
    circuit: {
      metadata: {
        name: "Quantum Circuit",
        description: "Generated quantum circuit with various quantum gates"
      },
      layout: {
        type: "linear",
        dimensions: [qubits],
        qubits: qubitLayout
      },
      operations: operations
    }
  };
}