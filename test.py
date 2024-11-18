# from qiskit import QuantumCircuit,  transpile
# from qiskit_aer.noise import NoiseModel, depolarizing_error
# from qiskit_aer.backends import aerbackend
# from qiskit_aer.aerprovider import AerSimulator
# # from qiskit import QuantumCircuit, transpile
# from qiskit_aer import AerSimulator
# # Define noise model

# noise_model = NoiseModel()
# noise_model.add_all_qubit_quantum_error(depolarizing_error(0.1, 1), ['x'])

# # Create circuit
# qc = QuantumCircuit(3, 2)

# # Encode logical |0>
# qc.cx(0, 1)
# qc.cx(0, 2)

# # Add bit-flip error
# qc.x(0)

# # Decode
# qc.cx(0, 1)
# qc.cx(0, 2)
# qc.measure([1, 2], [0, 1])

# # Correct error
# qc.x(0).c_if(1, 1)

# # Simulate
# simulator = AerSimulator()
# circ = transpile(qc, simulator)

# # Run and get counts
# result = simulator.run(circ).result()
# print("Counts:", result.get_counts())
import numpy as np
import qiskit
from qiskit import QuantumCircuit, QuantumRegister, ClassicalRegister
from qiskit_aer import AerSimulator
from qiskit.quantum_info import Kraus, Choi, SuperOp
from qiskit_aer.noise import NoiseModel
from qiskit_aer.noise import pauli_error, depolarizing_error
import matplotlib.pyplot as plt

class QECSimulator:
    def __init__(self, code_distance=3, error_rate=0.01):
        """
        Initialize QEC simulator with given parameters
        
        Args:
            code_distance (int): Distance of the surface code
            error_rate (float): Physical error rate per operation
        """
        self.d = code_distance
        self.p = error_rate
        self.n_data_qubits = code_distance ** 2
        self.n_ancilla_qubits = 2 * code_distance ** 2 - 1
        
    def create_surface_code(self):
        """
        Create a surface code lattice with d×d data qubits
        """
        # Create quantum registers for data and ancilla qubits
        data_qubits = QuantumRegister(self.n_data_qubits, 'data')
        x_ancilla = QuantumRegister((self.d ** 2 - 1), 'x_check')
        z_ancilla = QuantumRegister(self.d ** 2, 'z_check')
        classical = ClassicalRegister(self.n_data_qubits, 'c')
        
        # Create quantum circuit
        circuit = QuantumCircuit(data_qubits, x_ancilla, z_ancilla, classical)
        return circuit
    
    def apply_stabilizer_measurements(self, circuit):
        """
        Apply X and Z stabilizer measurements for surface code
        """
        # Implement X-type stabilizers
        for i in range(self.d - 1):
            for j in range(self.d):
                ancilla_idx = i * self.d + j
                data_qubits = self._get_x_stabilizer_qubits(i, j)
                
                # Initialize ancilla in |+⟩ state
                circuit.h(self.n_data_qubits + ancilla_idx)
                
                # Apply CNOT gates
                for qubit in data_qubits:
                    circuit.cx(self.n_data_qubits + ancilla_idx, qubit)
                
                # Measure in X basis
                circuit.h(self.n_data_qubits + ancilla_idx)
        
        # Implement Z-type stabilizers
        z_ancilla_offset = self.n_data_qubits + (self.d ** 2 - 1)
        for i in range(self.d):
            for j in range(self.d - 1):
                ancilla_idx = i * (self.d - 1) + j
                data_qubits = self._get_z_stabilizer_qubits(i, j)
                
                # Apply CNOT gates
                for qubit in data_qubits:
                    circuit.cx(qubit, z_ancilla_offset + ancilla_idx)
        
        return circuit
    
    def _get_x_stabilizer_qubits(self, i, j):
        """Helper function to get data qubits involved in X-type stabilizer"""
        qubits = []
        if i > 0:
            qubits.append((i-1) * self.d + j)
        if i < self.d - 1:
            qubits.append((i+1) * self.d + j)
        if j > 0:
            qubits.append(i * self.d + (j-1))
        if j < self.d - 1:
            qubits.append(i * self.d + (j+1))
        return qubits
    
    def _get_z_stabilizer_qubits(self, i, j):
        """Helper function to get data qubits involved in Z-type stabilizer"""
        qubits = []
        if i > 0:
            qubits.append((i-1) * self.d + j)
        if i < self.d - 1:
            qubits.append((i+1) * self.d + j)
        if j > 0:
            qubits.append(i * self.d + (j-1))
        if j < self.d - 1:
            qubits.append(i * self.d + (j+1))
        return qubits
    
    def create_noise_model(self):
        """
        Create a realistic noise model including:
        - Single-qubit gate errors
        - Two-qubit gate errors
        - Measurement errors
        - Decoherence (T1 and T2)
        """
        noise_model = NoiseModel()
        
        # Single-qubit gate error
        error_1 = depolarizing_error(self.p, 1)
        noise_model.add_all_qubit_quantum_error(error_1, ['u1', 'u2', 'u3'])
        
        # Two-qubit gate error
        error_2 = depolarizing_error(self.p * 2, 2)
        noise_model.add_all_qubit_quantum_error(error_2, ['cx'])
        
        # Measurement error
        meas_error = pauli_error([('X', self.p), ('I', 1 - self.p)])
        noise_model.add_all_qubit_quantum_error(meas_error, ['measure'])
        
        return noise_model
    
    def encode_logical_state(self, circuit, state='0'):
        """
        Encode a logical state into the surface code
        
        Args:
            circuit (QuantumCircuit): Circuit to encode into
            state (str): Logical state to encode ('0' or '1')
        """
        if state == '1':
            # Apply X to all data qubits for logical |1⟩
            for i in range(self.n_data_qubits):
                circuit.x(i)
        
        # Apply stabilizer measurements to project into code space
        self.apply_stabilizer_measurements(circuit)
        return circuit
    
    def run_simulation(self, shots=1000):
        """
        Run the full QEC simulation
        
        Args:
            shots (int): Number of shots for the simulation
            
        Returns:
            dict: Results of the simulation
        """
        # Create circuit with logical state encoding
        circuit = self.create_surface_code()
        circuit = self.encode_logical_state(circuit)
        
        # Add error correction cycles
        for _ in range(5):  # Number of correction cycles
            circuit = self.apply_stabilizer_measurements(circuit)
        
        # Create noise model
        noise_model = self.create_noise_model()
        
        # Run simulation
        simulator = AerSimulator(noise_model=noise_model)
        circuit.measure(range(self.n_data_qubits), range(self.n_data_qubits))
        
        job = simulator.run(circuit, shots=shots)
        result = job.result()
        
        return result.get_counts()
    
    def analyze_results(self, counts):
        """
        Analyze the results of the QEC simulation
        
        Args:
            counts (dict): Counts from the simulation
            
        Returns:
            float: Logical error rate
        """
        total_shots = sum(counts.values())
        logical_errors = 0
        
        # Count logical errors (odd number of total bit flips)
        for outcome, count in counts.items():
            if outcome.count('1') % 2 == 1:
                logical_errors += count
        
        return logical_errors / total_shots
    
    def plot_performance(self, error_rates=None):
        """
        Plot the performance of the QEC code for different physical error rates
        
        Args:
            error_rates (list): List of physical error rates to test
        """
        if error_rates is None:
            error_rates = np.logspace(-3, -1, 10)
        
        logical_errors = []
        
        for p in error_rates:
            self.p = p
            counts = self.run_simulation(shots=1000)
            logical_error_rate = self.analyze_results(counts)
            logical_errors.append(logical_error_rate)
        
        plt.figure(figsize=(10, 6))
        plt.loglog(error_rates, logical_errors, 'bo-', label='Logical error rate')
        plt.loglog(error_rates, error_rates, 'r--', label='Physical error rate')
        plt.xlabel('Physical error rate')
        plt.ylabel('Logical error rate')
        plt.title(f'Surface Code Performance (d={self.d})')
        plt.legend()
        plt.grid(True)
        plt.show()

# Example usage
if __name__ == "__main__":
    # Initialize simulator
    qec_sim = QECSimulator(code_distance=3, error_rate=0.01)
    
    # Run simulation
    counts = qec_sim.run_simulation(shots=1000)
    
    # Analyze results
    logical_error_rate = qec_sim.analyze_results(counts)
    print(f"Logical error rate: {logical_error_rate}")
    
    # Plot performance
    qec_sim.plot_performance()